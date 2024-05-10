import { configureStore } from '@reduxjs/toolkit';
import { albumSliceReducer, socketSliceReducer, userSliceReducer } from './slices';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // TODO: it fixed the issue but I need to investigate it
    }),
  reducer: {
    socket: socketSliceReducer,
    users: userSliceReducer,
    album: albumSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;