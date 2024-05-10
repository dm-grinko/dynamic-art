import { Injectable } from '@nestjs/common';

interface Result {
    userName: string;
    imageCount: number;
    categoryId: string;
    userPhotoUrl: string;
    adminId: string;
}

@Injectable()
export class Helpers {
    countImagesByPerson(data: any): Result[] {
        if(!data.length) {
            return [];
        }

        const counts = {};
    
        data.forEach(item => {
            const { RekognitionID, userPhotoUrl, adminId, userName, categoryId } = item;
    
            if (counts[userName]) {
                counts[userName].imageCount++;
            } else {
                counts[userName] = {
                    imageCount: 1,
                    categoryId,
                    userPhotoUrl,
                    adminId,
                    RekognitionID,
                };
            }
        });
    
        const result: Result[] = Object.entries(counts)
            .map(([userName, details]: any) => ({
                userName,
                imageCount: details.imageCount,
                categoryId: details.categoryId,
                userPhotoUrl: details.userPhotoUrl,
                adminId: details.adminId,
                RekognitionID: details.RekognitionID,
            }));
        return result;
    }
}

