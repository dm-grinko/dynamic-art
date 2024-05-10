import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamodbUserService } from './dynamodb-user.service';
import { IndexFacesCommand, RekognitionClient } from "@aws-sdk/client-rekognition";
import { SearchFacesByImageCommand } from "@aws-sdk/client-rekognition";

@Injectable()
export class RekognitionService {
    collectionId: string;
    userBucket: string;
    rekognitionClient: RekognitionClient;

    constructor(private dynamodbService: DynamodbUserService, private configService: ConfigService) {
        this.collectionId = this.configService.get<string>('COLLECTION_ID');
        this.userBucket = this.configService.get<string>('S3_USER_BUCKET');

        this.rekognitionClient = new RekognitionClient({ 
            region: this.configService.get<string>('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
            }  
        });
    }

    async searchFacesByImage(adminId: string, image: Buffer): Promise<string> {
        // TODO: research: is it posible to split a rekognition collection by adminId
        // because currently we are doing detection using all images. it is not good.
        const command = new SearchFacesByImageCommand({
            CollectionId: this.collectionId,
            MaxFaces: 1,
            FaceMatchThreshold: 70,
            Image: { Bytes: image },
        });

        const response = await this.rekognitionClient.send(command);

        if (response.FaceMatches && response.FaceMatches.length > 0) {
            const faceId = response.FaceMatches[0].Face.FaceId;
            const data = await this.dynamodbService.getRecordByAdminId(adminId, faceId);
            return data || "User not found";
        }
        return "This user is unknown!";
    }

    async getFaceId(key: string) {
        const command = new IndexFacesCommand({
            Image: { 
                S3Object: { 
                    Bucket: this.userBucket,
                    Name: key 
                } 
            },
            CollectionId: this.collectionId,
        });

        const response = await this.rekognitionClient.send(command);

        const faceId = response.FaceRecords?.[0]?.Face?.FaceId;

        if (!faceId) {
            throw new Error('No faceId found in the image');
        }

        return faceId;
    }
}
