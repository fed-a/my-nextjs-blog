import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '.';

interface MenuSate {
  isOpen: boolean;
}

const initialState: MenuSate = {
  isOpen: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    openMenu: (state) => {
      state.isOpen = true;
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
  },
});

export const SelectMenu = (state: RootState) => state.menu;

export const { openMenu, closeMenu } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
