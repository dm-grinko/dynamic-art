import { createCategory, deleteCategoryById, updateCategoryList } from '@/redux/slices';
import axios from 'axios';
const serverUrl = 'http://localhost:3002';

export const onCreateCategory = (category: any) => async (dispatch: any) => {
    try {
        const { data } = await axios.post(
            `${serverUrl}/api/create-category`, 
            category, 
            { headers: { 'Content-Type': 'application/json' } }
        );

        dispatch(createCategory(data));
    } catch (error: any) {
        console.error(error.message);
    }
};

export const onDeleteCategory = (categoryId: string, adminId: string) => async (dispatch: any) => {
    try {
        const url = `${serverUrl}/api/delete-category`;

        const response = await axios.delete(url, {
            data: {
                categoryId: categoryId,
                adminId: adminId,
            },
            headers: {
                'Content-Type': 'application/json',
            },
        });

        dispatch(deleteCategoryById(categoryId));

        return response.data;

    } catch (error: any) {
        console.error('Error deleting category:', error.message);
        throw new Error('Failed to delete category');
    }
};

export const onGetCategoryListByUserID = (adminId: string) => async (dispatch: any) => {
    try {
        const { data } = await axios.get(
            `${serverUrl}/api/category-list?adminId=${adminId}`,
            { headers: { 'Content-Type': 'application/json' } }
        );

        dispatch(updateCategoryList(data));
    } catch (error: any) {
        console.error(error.message);
    }
};

export const sendCategoryImages = (formData: any) => async (dispatch: any) => {
    try {
        const { data } = await axios.post(
            `${serverUrl}/api/add-picture`, 
            formData, 
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        if (data) {
            dispatch(updateCategoryList(data));
        }
        
    } catch (error: any) {
        console.error(error.message);
    }
};

function updateCurrentUserImage(arg0: string): any {
    throw new Error('Function not implemented.');
}
