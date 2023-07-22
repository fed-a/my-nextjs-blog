import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MainPageFilters, MainPageSortings } from '@/types/app';

import type { RootState } from '..';

const initialState: MainPageFilters = {
  tags: [],
  difficulty: null,
  sorting: 'publishedAtDesc',
};

const mainPageFilterSlice = createSlice({
  name: 'mainPageFilter',
  initialState,
  reducers: {
    resetMainPageFilters: () => initialState,
    toggleTag: (state, action: PayloadAction<string>) => {
      const indexOfTag = state.tags.indexOf(action.payload);
      if (indexOfTag === -1) {
        state.tags.push(action.payload);
      } else {
        state.tags.splice(indexOfTag, 1);
      }
    },
    setSorting: (state, action: PayloadAction<MainPageSortings>) => {
      state.sorting = action.payload;
    },
    setDifficulty: (state, action: PayloadAction<MainPageFilters['difficulty']>) => {
      state.difficulty = action.payload;
    },
  },
});

export const SelectMainPageFilter = (state: RootState) => state.app.filter;

export const { resetMainPageFilters, toggleTag, setDifficulty, setSorting } =
  mainPageFilterSlice.actions;
export const mainPageFilterReducer = mainPageFilterSlice.reducer;
