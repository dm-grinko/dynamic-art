import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BatchWriteItemCommand, DynamoDBClient, GetItemCommand, PutItemCommand, QueryCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

import { v4 as uuidv4 } from 'uuid';
import { DynamodbCategoryService } from './dynamodb-category.service';

@Injectable()
export class DynamodbPictureService {
    pictureTableName: string;
    categoryTableName: string;
    doc: DynamoDBDocument;
    pictureBucket: string;
    s3: S3Client;

    constructor(
        private configService: ConfigService,
        @Inject(forwardRef(() => DynamodbCategoryService))
        private dynamodbCategoryService: DynamodbCategoryService
    ){
        this.pictureTableName = this.configService.get<string>('DYNAMODB_PICTURES_TABLE');
        this.categoryTableName = this.configService.get<string>('DYNAMODB_CATEGORY_TABLE'); 
        this.pictureBucket = this.configService.get<string>('S3_PICTURE_BUCKET');
        const client = new DynamoDBClient({ 
            region: this.configService.get<string>('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
            }  
        });
        this.doc = DynamoDBDocument.from(client);

        this.s3 = new S3Client({
            region: this.configService.get<string>('AWS_REGION'),
            credentials: {
              accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
              secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
            }
          });
    }

    async addPicture({ adminId, categoryId, files }) {
        const { files: images }  = files;
        let count = 0;

        const imageCount = await this.getImageCount(adminId, categoryId);

        if (images && images.length) {
            for (const file of images) {
                const imageUrl = await this.uploadImageToS3(adminId, categoryId, file);
                await this.saveURLtoDynamoDBimageTable(adminId, categoryId, imageUrl);
                count++;
                console.log(`${count}/${images.length} uploaded`);
            }
        } else {
            return;
        }
        
        const newImageCount = `${+imageCount + count}`;
        
        await this.updateImageCountInDynamodbCategoryTable(adminId, categoryId, newImageCount);

        console.log(`${images.length}/${images.length} uploaded`);

        const categories = await this.dynamodbCategoryService.getCategoriesByAdminId(adminId);

        return categories;
    }

    // TODO: move to S3 service
    async uploadImageToS3(adminId, categoryId, file) {
        try {
            const Key = `index/${adminId}/${categoryId}/${file.originalname}`.replaceAll(' ', '_');
            const command = new PutObjectCommand({
              Bucket: this.pictureBucket,
              Key,
              Body: file.buffer
            });
      
            await this.s3.send(command);
            const imageUrl =`https://${this.pictureBucket}.s3.amazonaws.com/${Key}`;
            console.log('Image', imageUrl);

            return imageUrl;
          } catch (error) {
            console.error(error.message);
          }
    }

    async saveURLtoDynamoDBimageTable(adminId, categoryId, imageUrl) {
        try {
            const pictureId = uuidv4();
            const command = new PutItemCommand({
                TableName:  this.pictureTableName,
                Item: {
                    adminId: { S: adminId },
                    categoryId: { S: categoryId },
                    pictureId: { S:  pictureId },
                    imageUrl: { S:  imageUrl }
                },
            });

            return this.doc.send(command);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    // TODO: move to DynamodbCategoryService
    async getImageCount(adminId, categoryId) {
        try {
            const command = new GetItemCommand({
                TableName: this.categoryTableName,
                Key: {
                    adminId: { S: adminId },
                    categoryId: { S: categoryId },
                },
            });
        
            const data = await this.doc.send(command);

            return data.Item.imageCount.N;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    // TODO: move to DynamodbCategoryService
    async updateImageCountInDynamodbCategoryTable(adminId: string, categoryId: string, imageCount: string) {
        try {
            const command = new UpdateItemCommand({
                TableName: this.categoryTableName,
                Key: {
                    adminId: { S: adminId },
                    categoryId: { S: categoryId }
                },
                UpdateExpression: 'SET imageCount = :imageCount',
                ExpressionAttributeValues: {
                    ':imageCount': { N: imageCount }
                }
            });

            return this.doc.send(command);
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    }

// ----

    async deleteURLsFromDynamoDBimageTable(images, categoryId) {
        try {
            const deleteRequests = images.map((img, index) => ({
                DeleteRequest: {
                    Key: {
                        categoryId: { S: categoryId },
                        pictureId: { S: img.pictureId },
                    },
                },
            }));
    
            const params = {
                RequestItems: {
                    [this.pictureTableName]: deleteRequests,
                },
            };

            const command = new BatchWriteItemCommand(params);
            await this.doc.send(command);
    
            console.log(`Successfully deleted picture URLs from DynamoDB for category ${categoryId}`);
        } catch (error) {
            console.error(`Failed to delete picture URLs from DynamoDB: ${error.message}`);
            throw error;
        }
    }

    async deleteImageFromS3(imageUrl) {
        try {
            // Parse the S3 URL to extract the key
            const urlObj = new URL(imageUrl);
            const key = urlObj.pathname.slice(1); // Extract key from URL (remove leading '/')
    
            // Create a DeleteObjectCommand
            const deleteParams = {
                Bucket: this.pictureBucket,
                Key: key,
            };
            const deleteCommand = new DeleteObjectCommand(deleteParams);
    
            // Execute the delete operation
            await this.s3.send(deleteCommand);
    
            console.log(`Successfully deleted object ${key} from bucket ${this.pictureBucket}`);
        } catch (error) {
            console.error(`Failed to delete object from S3: ${error.message}`);
            throw new Error(`Failed to delete object from S3: ${error.message}`);
        }
    }

    async getImagesByCategory(categoryId: string) {
        const params = {
            TableName: this.pictureTableName,
            KeyConditionExpression: 'categoryId = :categoryId',
            ExpressionAttributeValues: {
                ':categoryId': { S: categoryId },
            },
            ProjectionExpression: 'imageUrl, pictureId',
        };
    
        const command = new QueryCommand(params);
        const data = await this.doc.send(command);
    
        const arr = data.Items.map(item => {
            return {
                imageUrl: item.imageUrl.S,  // we need imageUrl to remove from s3 and pictureId to remove from db
                pictureId: item.pictureId.S,
            }
        });
        console.log('array of imageUrls and pictureId', arr)
        return arr;
    }


    async deleteImagesByCategory(categoryId: string) {
        try {
            const images = await this.getImagesByCategory(categoryId);
            
            if (images && images.length) {
                for (const image of images) {
                    await this.deleteImageFromS3(image.imageUrl);
                }

                
                await this.deleteURLsFromDynamoDBimageTable(images, categoryId);
            } else {
                console.log(`There are no images in ${this.pictureTableName} dynamodb table`);
                console.log('No need to remove images from s3');
                console.log(`No need to remove image urls from the ${this.pictureTableName} dynamodb table`);
            }
    
            console.log(`Successfully deleted all pictures in category ${categoryId}`);
        } catch (error) {
            console.error(`Failed to delete pictures in category ${categoryId}: ${error.message}`);
            throw error;
        }
    }

}
