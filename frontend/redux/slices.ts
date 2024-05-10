import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { 
    initialSocketState,
    initialUserState,
    initialAlbumState,
    user,
    category,
} from './initial-states';

// ******** SOCKET ********
const socketSlice = createSlice({
    name: 'socket',
    initialState: initialSocketState,
    reducers: {
        setConnected: (state, action: PayloadAction<boolean>) => {
            state.isConnected = action.payload;
        },
    },
});

export const { setConnected } = socketSlice.actions;
export const socketSliceReducer = socketSlice.reducer;


// ******** USER ********
const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setAdmin: (state, action: PayloadAction<string | null>) => {
            state.admin.adminId = action.payload;
        },
        updateUserList: (state, action: PayloadAction<user[]>) => {
            state.users = action.payload
        },
        updateCurrentUser: (state, action: PayloadAction<any>) => {
            state.currentUser.RekognitionID = action.payload.RekognitionID
            state.currentUser.userName = action.payload.userName
            state.currentUser.userPhotoUrl = action.payload.userPhotoUrl
            state.currentUser.adminId = action.payload.adminId
            state.currentUser.userId = action.payload.userId
            state.currentUser.categoryId = action.payload.categoryId
        },
        updateCurrentUserImage: (state, action: PayloadAction<any>) => {
            console.log('lll', action.payload);
            state.currentUser.userImage = action.payload
        },
    },
});

export const { setAdmin, updateUserList, updateCurrentUser, updateCurrentUserImage } = userSlice.actions;
export const userSliceReducer = userSlice.reducer;

// ******** ALBUM ********
const albumSlice = createSlice({
    name: 'album',
    initialState: initialAlbumState,
    reducers: {
        createCategory: (state, action: PayloadAction<any>) => {
            state.categories = [...state.categories, action.payload];
        },
        updateCategoryList: (state, action: PayloadAction<any>) => {
            state.categories = action.payload;
        },
        updateCategoryListCount: (state, action: PayloadAction<any>) => {
            state.categories = action.payload;
        },
        deleteCategoryById: (state, action: PayloadAction<any>) => {
            state.categories = state.categories.filter(c => c.categoryId != action.payload);
        },
    },
});

export const { createCategory, updateCategoryList, deleteCategoryById } = albumSlice.actions;
export const albumSliceReducer = albumSlice.reducer;
