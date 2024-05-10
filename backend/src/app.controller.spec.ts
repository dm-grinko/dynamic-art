import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { S3UserService } from './services/s3-user.service';
import { DynamodbUserService } from './services/dynamodb-user.service';
import { RekognitionService } from './services/rekognition.service';
import { Helpers } from './services/helpers.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppGateway } from './app.gateway';
import { S3PictureService } from './services/s3-picture.service';

const services = [
  S3UserService,
  DynamodbUserService,
  RekognitionService,
  S3PictureService,
  Helpers
]

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: `${process.env.NODE_ENV}.env`,
          isGlobal: true,
        }),
      ],
      controllers: [AppController],
      providers: [
        ...services,
        AppGateway
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Health endpoint!!', () => {
    it('should return "OK"', () => {
      expect(appController.health()).toBe('OK');
    });
  });
});


