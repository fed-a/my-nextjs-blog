import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getPostsApi } from '@/api/posts';
import { PostsQuery } from '@/gql/graphql';
import { Localed } from '@/types';
import { MainPageFilters } from '@/types/app';

import { Locale } from '@/lib/i18n';

import type { RootState } from '..';

interface MainPageStore {
  posts: NonNullable<PostsQuery['posts']>['data'];
  status: 'loading' | 'success' | 'error' | null;
  error: string;
}

const initialState: MainPageStore = {
  posts: [],
  status: null,
  error: '',
};

export const getPosts = createAsyncThunk('posts/getPosts', async (locale: Locale, { getState }) => {
  const {
    app: {
      filter: { tags, difficulty, sorting },
    },
  } = getState() as RootState;

  if (!locale) {
    return [];
  }

  const params: Localed<MainPageFilters> = {
    tags,
    difficulty,
    sorting,
    locale,
  };

  return getPostsApi(params);
});

const mainPagePostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.posts = [];
      state.status = 'loading';
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload ?? [];
      state.status = 'success';
      state.error = '';
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.posts = [];
      state.status = 'error';
      state.error = action.error.message ?? 'Error while fetching posts';
    });
  },
});

export const SelectMainPagePosts = (state: RootState) => state.app.posts;

export const mainPagePostsReducer = mainPagePostsSlice.reducer;
