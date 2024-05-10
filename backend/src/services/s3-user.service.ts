import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3UserService {
  userBucket: string;
  s3: S3Client;
  constructor(private configService: ConfigService) {
    this.userBucket = this.configService.get<string>('S3_USER_BUCKET');

    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      }
    });
  }

  async uploadImage({ userName, categoryId, adminId, userId }, img, index) {
    // console.log('uploadImage', { userName, userInfo, adminId, img: !!img, index });

    try {
      const Key = `index/${adminId}/${userId}/${userName}_${index + 1}.jpeg`.replaceAll(' ', '_');

      console.log('uploadImage', { Key });

      console.log('uploadImage', { bucket: this.userBucket });

      const command = new PutObjectCommand({
        Bucket: this.userBucket,
        Key,
        Body: img,
        Metadata: {
          adminId,
          userId,
          userName,
          categoryId,
          userPhotoUrl: `https://${this.userBucket}.s3.amazonaws.com/${Key}`
        },
      });

      await this.s3.send(command);

      return `File ${Key} is uploaded successfully`;
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteImages() {
    try {
      let continuationToken: string | undefined = undefined;
  
      do {
        const listParams = {
          Bucket: this.userBucket,
          Prefix: 'index/',
          ContinuationToken: continuationToken
        };
  
        const listCommand = new ListObjectsV2Command(listParams);
        const listResult = await this.s3.send(listCommand);
  
        if (listResult.Contents && listResult.Contents.length > 0) {
          const deleteParams = {
            Bucket: this.userBucket,
            Delete: {
              Objects: listResult.Contents.map(item => ({ Key: item.Key })),
              Quiet: true
            }
          };
  
          const deleteCommand = new DeleteObjectsCommand(deleteParams);
          await this.s3.send(deleteCommand);
          // console.log(`Deleted ${listResult.Contents.length} objects from bucket ${this.userBucket} in the "index" folder`);
        }
  
        continuationToken = listResult.NextContinuationToken;
      } while (continuationToken);
  
      // console.log(`All objects in the "index" folder deleted from the ${this.userBucket} bucket`);
    } catch (error) {
      console.error(`Error deleting objects in the "index" folder from the ${this.userBucket} bucket:`, error);
    }
  }
}
