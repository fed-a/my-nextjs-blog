import { configureStore } from '@reduxjs/toolkit';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { appReducer } from './app';
import { mobileMenuReducer } from './menu.slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    mobileMenu: mobileMenuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;

export const useAppDispatch: () => AppDispath = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
