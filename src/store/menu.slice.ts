import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '.';

interface MenuSate {
  isOpen: boolean;
}

const initialState: MenuSate = {
  isOpen: false,
};

const mobileMenuSlice = createSlice({
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

export const SelectMobileMenu = (state: RootState) => state.mobileMenu.isOpen;

export const { openMenu, closeMenu } = mobileMenuSlice.actions;
export const mobileMenuReducer = mobileMenuSlice.reducer;
