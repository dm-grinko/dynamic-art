// const { SERVER_URL } = process.env;
// const serverUrl = 'https://devopscave.net:3002';
const serverUrl = 'http://localhost:3002';

import io from 'socket.io-client';

import { setConnected, updateCurrentUser, updateCurrentUserImage, updateUserList } from '../redux/slices';
import { user } from '@/redux/initial-states';
const socket = io(serverUrl);

export const connectToSocket = () => (dispatch: any) => {  
    const isConnected = localStorage.getItem('isConnected') === 'on';
    dispatch(setConnected(isConnected));

    socket.on('connect', () => {
        dispatch(setConnected(true));
        localStorage.setItem('isConnected', 'on');
    });

    socket.on('disconnect', async () => {
        const url = `${serverUrl}/health`;
        const { status } = await fetch(url);
        if (status === 200) {
            dispatch(setConnected(true));
            localStorage.setItem('isConnected', 'on');
        }
    });

    socket.on('connect_error', (error: any) => {
        console.error(error.message);
        if (error.message === "xhr poll error") {
            dispatch(setConnected(false));
            localStorage.setItem('isConnected', 'off');
        }
    });

    socket.on('screenshotResult', ({ error, data }) => {
        if (error) {
            console.error(error.message)
        } else {
            dispatch(updateCurrentUser(data));
        }
        
    });

    socket.on('userListResult', ({ message }) => {
        const users = JSON.parse(message);
        dispatch(updateUserList(users));
    });

    socket.on('randomUserImageResult', ({ message }) => {
        dispatch(updateCurrentUserImage(message));
    });
};

export const sendImageToServer = (adminId: string | null, img: string) => (dispatch: any) => {
    if (adminId) {
        socket.emit('screenshot', { adminId, img });
    } else {
        console.error('Attempt to send screenshot w/o adminId');
    }
};

export const deleteUsers = () => (dispatch: any) => {
    socket.emit('deleteAllUsers', { message: `deleteAllUsers` });
};

export const deleteUser = (user: user) => (dispatch: any) => {
    socket.emit('deleteUser', { message: user });
};


export const getUserList = () => (dispatch: any) => {
    socket.emit('userList', { message: `getUserList` });
};

export const getUserRandomImage = (adminId: string, categoryId: string) => (dispatch: any) => {
    socket.emit('randomUserImage', { adminId, categoryId });
};

