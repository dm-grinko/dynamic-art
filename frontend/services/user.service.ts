import { updateUserList } from '@/redux/slices';
import axios from 'axios';
const serverUrl = 'http://localhost:3002';

export const addNewUser = (data: any) => async (dispatch: any) => {
    try {
        const response = await axios.post(
            `${serverUrl}/api/user`, 
            data, 
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        const { data: users} = response;
        dispatch(updateUserList(users));

    } catch (error: any) {
        console.error(error.message);
    }
};