// ******** SOCKET ********
interface SocketState {
    isConnected: boolean;
}

export const initialSocketState: SocketState = {
    isConnected: false,
};

// ******** USER ********
interface admin {
    adminId: string | null;
}

export interface user {
    userName: string | null;
    imageCount: string | null;
    categoryId: string | null;
    userPhotoUrl: string | null;
    adminId: string | null;
    userId: string | null;
    RekognitionID: string | null;
    userImage: string | null;
}

interface initialUserState {
    admin: admin;
    users: user[];
    currentUser: user;
}

export const initialUserState: initialUserState = {
    admin: {
        adminId: null
    },
    users: [],
    currentUser: {
        userName: null,
        imageCount: null,
        categoryId: null,
        userPhotoUrl: null,
        adminId: null,
        userId: null,
        RekognitionID: null,
        userImage: null,
    }
};

// ******** ALBUM ********
export interface picture {
    pictureId: string;
    url: string;
}

export interface category {
    categoryName: string;
    categoryId: string;
    imageCount: picture[];
}

interface initialAlbumState {
    adminId: string | null;
    categories: category[];
}

export const initialAlbumState: initialAlbumState = {
    adminId: null,
    categories: []
};
