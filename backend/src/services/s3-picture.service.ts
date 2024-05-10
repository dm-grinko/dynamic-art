import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';

@Injectable()
export class S3PictureService {
  pictureBucket: string;
  s3: S3Client;
  constructor(private configService: ConfigService) {
    this.pictureBucket = this.configService.get<string>('S3_PICTURE_BUCKET');

    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      }
    });
  }


  async getRandomImage(adminId: string, categoryId: string) {
    const prefix = `index/${adminId}/${categoryId}/`;

    try {
        const command = new ListObjectsV2Command({
            Bucket: this.pictureBucket,
            Prefix: prefix,
        });
        const response = await this.s3.send(command);

        if (response.Contents && response.Contents.length > 0) {
            const randomIndex = Math.floor(Math.random() * response.Contents.length);
            const selectedObject = response.Contents[randomIndex];

            return `https://${this.pictureBucket}.s3.amazonaws.com/${selectedObject.Key}`;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching objects from S3:', error);
        throw error;
    }
  }
}
