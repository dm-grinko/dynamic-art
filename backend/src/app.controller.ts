import { Controller, Post, Get, Res, UseInterceptors, Req, HttpCode } from '@nestjs/common';
import { Response } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { S3UserService } from './services/s3-user.service';
import { AppGateway } from './app.gateway';
import { RekognitionService } from './services/rekognition.service';
import { DynamodbUserService } from './services/dynamodb-user.service';
import { ConfigService } from '@nestjs/config';
import { Helpers } from './services/helpers.service';

import { v4 as uuidv4 } from 'uuid';

interface ImageFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: string;
}

@Controller()
export class AppController {
  userBucket: string;

  constructor(
    private readonly s3UserService: S3UserService,
    private readonly rekognitionService: RekognitionService,
    private readonly dynamodbUserService: DynamodbUserService,
    private readonly appGateway: AppGateway,
    private configService: ConfigService,
    private helpers: Helpers
  ) {
    this.userBucket = this.configService.get<string>('S3_USER_BUCKET');
  }

  @Get('health')
  @HttpCode(200)
  health(): string {
    return 'OK';
  }

  @Post('api/user')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'files', maxCount: 5 }
  ]))
  async addUser(@Req() req: any): Promise<any> {

    const { body, files }: any = req;
    const { files: images } = files;
    const { adminId, categoryId, userName } = body;

    console.log({ adminId, userName, imagesCount: images.length, categoryId });

    if (images && images.length) {
      const userId = uuidv4();

      await this.uploadFilesToS3({ adminId, userId, userName, images, categoryId });

      for (let index = 0; index < images.length; index++) {
        const key = `index/${adminId}/${userId}/${userName}_${index + 1}.jpeg`.replaceAll(' ', '_');

        const faceId = await this.rekognitionService.getFaceId(key);

        await this.dynamodbUserService.saveFaceId({
          RekognitionID: faceId,
          adminId: adminId,
          userId: userId,
          userName: userName,
          categoryId: categoryId,
          userPhotoUrl: `https://${this.userBucket}.s3.amazonaws.com/${key}`
        });
      }

      // await this.appGateway.sendUserList();
      // Get all users by adminId

      const records = await this.dynamodbUserService.getRecords(); // TODO: now we take all users but we need to take by adminId
      return this.helpers.countImagesByPerson(records);

    } else {
      console.log('Attempt to create a user w/o images');
    }

    return 'Done';
  }

  async uploadFilesToS3({ adminId, userId, userName, images, categoryId }) {
    // console.log('uploadFilesToS3', { adminId, userId, userName, imagesLength: images.length, categoryId });
    for (let index = 0; index < images.length; index++) {
      const imageFile: ImageFile = images[index];
      await this.s3UserService.uploadImage({
        userName,
        categoryId,
        adminId,
        userId
      }, imageFile.buffer, index);
    }
  }
}
