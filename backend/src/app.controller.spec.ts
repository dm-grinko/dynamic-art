import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { S3Service } from './services/s3-user.service';
import { DynamodbService } from './services/dynamodb-user.service';
import { RekognitionService } from './services/rekognition.service';
import { Helpers } from './services/helpers.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppGateway } from './app.gateway';

const services = [
  S3Service,
  DynamodbService,
  RekognitionService,
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


