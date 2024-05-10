import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamodbUserService {
    userTableName: string;
    doc: DynamoDBDocument;
    constructor(private configService: ConfigService){
        this.userTableName = this.configService.get<string>('DYNAMODB_USER_TABLE');

        const client = new DynamoDBClient({ 
            region: this.configService.get<string>('AWS_REGION'),
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
            }  
        });
        this.doc = DynamoDBDocument.from(client);
    }

  async getRecordByAdminId(adminId: string, faceId: string): Promise<any> {
    try {
        const params = {
            TableName: this.userTableName,
            Key: { "RekognitionID": faceId }
        }

        console.log('params', params);

        const data = await this.doc.get(params);

        console.log('data::', data);
    
        // TODO: we should return user data only if his adminId matches

        if (data && data.Item) {

            return {
                RekognitionID: data.Item.RekognitionID,
                userName: data.Item.userName,
                userPhotoUrl: data.Item.userPhotoUrl,
                adminId: data.Item.adminId,
                userId: data.Item.userId,
                categoryId: data.Item.categoryId,
            };
        }
    } catch (err) {
        console.error(err.message);
    }

    return 'Not found';
  }

  async getRecords(): Promise<any> {
    let params: any = { TableName: this.userTableName };

    let scanResults = [];
    let items;

    do {
        items = await this.doc.scan(params);
        items.Items.forEach((item: any) => scanResults.push(item));
        params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey != "undefined");

    return scanResults;
  }

  async saveFaceId({
    RekognitionID,
    adminId,
    userId,
    userName,
    categoryId,
    userPhotoUrl,
  }) {
    const command = new PutItemCommand({
        TableName:  this.userTableName,
        Item: {
            RekognitionID: { S: RekognitionID },
            adminId: { S: adminId },
            userId: { S: userId },
            userName: { S: userName },
            categoryId: { S: categoryId },
            userPhotoUrl: { S: userPhotoUrl },
        },
    });

    const response = await this.doc.send(command);
    return response;
}

// delete by adminId only
  async deleteRecords(adminId: string): Promise<any> {
    let scanParams: any = {
      TableName: this.userTableName,
    };

    // Scan the table and get all records
    let scanResults = [];
    let items: any;
    do {
        items = await this.doc.scan(scanParams);
        scanResults = scanResults.concat(items.Items);
        scanParams.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== "undefined");

    // Delete items in batches
    let deleteRequests = [];
    for (let i = 0; i < scanResults.length; i++) {
        deleteRequests.push({
            DeleteRequest: {
                Key: {
                    RekognitionID: scanResults[i].RekognitionID,
                },
            },
        });

        // If the batch reaches 25 items, execute the batch write
        if (deleteRequests.length === 25) {
            const batchDeleteParams = {
                RequestItems: {
                    [this.userTableName]: deleteRequests,
                },
            };
            await this.doc.batchWrite(batchDeleteParams);
            deleteRequests = [];
        }
    }

    // If there are any remaining delete requests, execute them
    if (deleteRequests.length > 0) {
        const batchDeleteParams = {
            RequestItems: {
                [this.userTableName]: deleteRequests,
            },
        };
        await this.doc.batchWrite(batchDeleteParams);
    }
  }
}
