import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MainPageFilters, MainPageSortings } from '@/types/app';

import type { RootState } from '..';

const initialState: MainPageFilters = {
  page: 1,
  tags: [],
  difficulty: null,
  sorting: 'publishedAtDesc',
  dirty: false,
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
      state.page = 1;
      state.dirty = true;
    },
    nextPage: (state) => {
      state.page += 1;
      state.dirty = true;
    },
    setSorting: (state, action: PayloadAction<MainPageSortings>) => {
      state.sorting = action.payload;
      state.page = 1;
      state.dirty = true;
    },
    setDifficulty: (state, action: PayloadAction<MainPageFilters['difficulty']>) => {
      state.difficulty = action.payload;
      state.page = 1;
      state.dirty = true;
    },
  },
});

export const SelectMainPageFilter = (state: RootState) => state.app.filter;

export const { nextPage, resetMainPageFilters, toggleTag, setDifficulty, setSorting } =
  mainPageFilterSlice.actions;
export const mainPageFilterReducer = mainPageFilterSlice.reducer;
