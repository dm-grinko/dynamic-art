import { Controller, Post, Get, Res, UseInterceptors, Req, HttpCode, Delete, Put, Body, Query } from '@nestjs/common';
import { S3PictureService } from './services/s3-picture.service';
import { DynamodbCategoryService, category } from './services/dynamodb-category.service';
import { DynamodbPictureService } from './services/dynamodb-picture.service';
import { ConfigService } from '@nestjs/config';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

interface ImageFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: string;
}

@Controller()
export class ImagesController {
    pictureBucket: string;

    constructor(
        private readonly dynamodbCategoryService: DynamodbCategoryService,
        private readonly dynamodbPictureService: DynamodbPictureService,
        private configService: ConfigService
    ) {
        this.pictureBucket = this.configService.get<string>('S3_PICTURE_BUCKET');
    }

    // ******** CATEGORIES ********
    @Get('api/category-list')
    async getCategoriesByAdminId(@Query('adminId') adminId: string): Promise<category[]> {
        const result = await this.dynamodbCategoryService.getCategoriesByAdminId(adminId);
        return result;
    }
    @Post('api/create-category')
    async createCategory(@Body() data: any): Promise<string> {
        const result = await this.dynamodbCategoryService.createCategory(data);
        return result;
    }

    @Delete('api/delete-category')
    async deleteCategory(@Body() data: any): Promise<string> {
        const { adminId, categoryId } = data;
        const result = await this.dynamodbCategoryService.deleteCategory(adminId, categoryId);
        return result;
    }

    // ******** PICTURES ********
    @Post('api/add-picture')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'files', maxCount: 10 }
      ]))
    async addPicture(@Req() req: any) {
        const { adminId, categoryId } = req.body;
        const files = req.files;
        
        const result = await this.dynamodbPictureService.addPicture({
            adminId,
            categoryId,
            files
        });
        return result;
    }
}
