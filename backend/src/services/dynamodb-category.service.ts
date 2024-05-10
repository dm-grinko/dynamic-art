import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDBClient, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { DynamodbPictureService } from './dynamodb-picture.service';

export interface category {
    categoryId: string;
    categoryName: string;
    imageCount: number;
}

@Injectable()
export class DynamodbCategoryService {
    categoryTableName: string;
    doc: DynamoDBDocument;
    constructor(
        private configService: ConfigService,
        @Inject(forwardRef(() => DynamodbPictureService))
        private dynamodbPictureService: DynamodbPictureService
    ){
        this.categoryTableName = this.configService.get<string>('DYNAMODB_CATEGORY_TABLE');

        const client = new DynamoDBClient({ 
            region: this.configService.get<string>('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
            }  
        });
        this.doc = DynamoDBDocument.from(client);
    }

    async createCategory(data: any): Promise<any> {
        const categoryId = uuidv4();
        const command = new PutItemCommand({
            TableName:  this.categoryTableName,
            Item: {
                adminId: { S: data.adminId },
                categoryId: { S: categoryId },
                categoryName: { S: data.categoryName },
                imageCount: { N: "0" },
            },
        });

        await this.doc.send(command);
        return {
            adminId: data.adminId,
            categoryId,
            categoryName: data.categoryName,
            imageCount: "0",
        };
    }

    async getCategoriesByAdminId(adminId: string): Promise<category[]> {
        const params = {
            TableName: this.categoryTableName,
            KeyConditionExpression: "adminId = :adminId",
            ExpressionAttributeValues: {
                ":adminId": adminId,
            },
            ProjectionExpression: "categoryId, categoryName, imageCount",
        };
    
        try {
            const response = await this.doc.query(params);
    
            const categories = response.Items.map(item => ({
                categoryId: item.categoryId,
                categoryName: item.categoryName,
                imageCount: item.imageCount,
            }));
    
            return categories;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async deleteCategory(adminId, categoryId): Promise<string> {
        console.log('adminId:', adminId, 'categoryId:', categoryId);
        try {

            await this.dynamodbPictureService.deleteImagesByCategory(categoryId);



            await this.doc.delete({
                TableName: this.categoryTableName,
                Key: {
                    adminId: adminId,
                    categoryId: categoryId,
                },
            });

            console.log('Category deleted successfully');


            

            return 'Category deleted successfully';
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to delete category');
        }
    }






}
