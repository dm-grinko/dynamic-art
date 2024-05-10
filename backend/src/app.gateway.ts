import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayInit
} from "@nestjs/websockets";

import { Server, Socket } from 'socket.io';
import { RekognitionService } from "./services/rekognition.service";
import { DynamodbUserService } from "./services/dynamodb-user.service";
import { Helpers } from "./services/helpers.service";
import { S3UserService } from "./services/s3-user.service";
import { S3PictureService } from "./services/s3-picture.service";

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private rekognitionService: RekognitionService,
    private dynamodbUserService: DynamodbUserService,
    private s3UserService: S3UserService,
    private s3PictureService: S3PictureService,
    private helpers: Helpers
  ) { }

  async handleConnection(connection: Socket) {
    // console.log(`New connection received from ${connection.id}`);
  }

  async afterInit() {
    // this.server.emit('serverMessage', { message: 'The server is connected!' });
  }

  @SubscribeMessage('userList')
  async sendUserList(): Promise<void> {
    const result = await this.getAllUsers();
    this.server.emit('userListResult', { message: JSON.stringify(result) });
  }

  async getAllUsers (): Promise<any> {
    const records = await this.dynamodbUserService.getRecords(); // TODO: now we take all users but we need to take by adminId
    return this.helpers.countImagesByPerson(records);
  }

  @SubscribeMessage('deleteAllUsers')
  async deleteAllUsers(@MessageBody() _: string): Promise<void> {
    try {
      await this.dynamodbUserService.deleteRecords(""); // TODO: now we remove all. but we should remove only by adminIdS
      console.log('All records deleted successfully from DynamoDB');
      await this.s3UserService.deleteImages();
      console.log('All images deleted successfully from S3');
      this.server.emit('userListResult', { message: JSON.stringify([]) });
    } catch (error) {
      console.error(error.message);
    }
  }

  @SubscribeMessage('deleteUser')
  async deleteUser(@MessageBody() user: any): Promise<void> {
    console.log('deleteUser', user);
  }

  @SubscribeMessage('screenshot')
  async checkScreenshot(@MessageBody() { adminId, img }: { adminId: string, img: string }): Promise<void> {
    const data = img.replace(/^data:image\/\w+;base64,/, '')
    try {
      const image = Buffer.from(data, 'base64');
      const result = await this.rekognitionService.searchFacesByImage(adminId, image);
      this.server.emit('screenshotResult', { error: null, data: result });
    } catch (error) {
      console.error('Error:', error.message);
      this.server.emit('screenshotResult', { error:  error.message, data: null });
    }
  }


  @SubscribeMessage('randomUserImage')
  async getRandomUserImage(@MessageBody() message: any): Promise<void> {
    console.log('message', message);

    const { adminId, categoryId } = message;

    const url = await this.s3PictureService.getRandomImage(adminId, categoryId)

    this.server.emit('randomUserImageResult', { message: url });
  }
}
