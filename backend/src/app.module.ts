import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { S3UserService } from './services/s3-user.service';
import { S3PictureService } from './services/s3-picture.service';
import { DynamodbUserService } from './services/dynamodb-user.service';
import { DynamodbCategoryService } from './services/dynamodb-category.service';
import { DynamodbPictureService } from './services/dynamodb-picture.service';
import { RekognitionService } from './services/rekognition.service';
import { AppGateway } from './app.gateway';

import { ConfigModule } from '@nestjs/config';
import { Helpers } from './services/helpers.service';
import { ImagesController } from './images.controller';

const services = [
  S3UserService,
  S3PictureService,
  DynamodbUserService,
  DynamodbPictureService,
  DynamodbCategoryService,
  RekognitionService,
  Helpers
]

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
  ],
  controllers: [
    AppController,
    ImagesController,
  ],
  providers: [
    ...services,
    AppGateway
  ],
})
export class AppModule { }