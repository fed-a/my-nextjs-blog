import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TagsDocument, TagsQuery, TagsQueryResult, TagsQueryVariables } from '@/gql/graphql';

import { fetchAPI } from '@/lib/api';
import { Locale } from '@/lib/i18n';

import type { RootState } from '..';

type MainPageStore = {
  tags: NonNullable<TagsQuery['tags']>['data'];
  status: 'loading' | 'success' | 'error' | null;
  error: string;
};

const initialState: MainPageStore = {
  tags: [],
  status: null,
  error: '',
};

export const getTags = createAsyncThunk('tags/getTags', async (locale: Locale) => {
  if (!locale) {
    return [];
  }
  const result = await fetchAPI<TagsQueryResult, TagsQueryVariables>(TagsDocument, {
    locale,
  });
  return result.data?.tags?.data ?? [];
});

const mainPageTagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTags.pending, (state) => {
      state.tags = [];
      state.status = 'loading';
    });
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.tags = action.payload ?? [];
      state.status = 'success';
      state.error = '';
    });
    builder.addCase(getTags.rejected, (state, action) => {
      state.tags = [];
      state.status = 'error';
      state.error = action.error.message ?? 'Error while fetching tags';
    });
  },
});

export const SelectMainPageTags = (state: RootState) => state.app.tags;

export const mainPageTagsReducer = mainPageTagsSlice.reducer;
