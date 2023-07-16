import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { mainPageFilterReducer, mainPagePostsReducer, mainPageTagsReducer } from './app';

export const store = configureStore({
  reducer: {
    mainPageTags: mainPageTagsReducer,
    mainPageFilter: mainPageFilterReducer,
    mainPagePosts: mainPagePostsReducer,
  },
});

export const useAppDispatch: () => AppDispath = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
