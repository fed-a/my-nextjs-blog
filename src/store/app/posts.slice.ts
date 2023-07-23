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
  hasMore: boolean;
}

const initialState: MainPageStore = {
  posts: [],
  status: null,
  error: '',
  hasMore: true,
};

const getPostsFx = async (locale: Locale, { getState }: any) => {
  const {
    app: {
      filter: { page, tags, difficulty, sorting },
    },
  } = getState() as RootState;

  const params: Localed<Partial<MainPageFilters>> = {
    page,
    tags,
    difficulty,
    sorting,
    locale,
  };

  return getPostsApi(params);
};

export const getPosts = createAsyncThunk('posts/getPosts', getPostsFx);
export const getNextPosts = createAsyncThunk('posts/getNextPosts', getPostsFx);

const mainPagePostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPosts: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getNextPosts.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.posts = [];
      state.hasMore = false;
      state.status = 'error';
      state.error = action.error.message ?? 'Error while fetching posts';
    });
    builder.addCase(getNextPosts.rejected, (state, action) => {
      state.posts = [];
      state.hasMore = false;
      state.status = 'error';
      state.error = action.error.message ?? 'Error while fetching posts';
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      const curTotal = action.payload?.data?.length ?? 0;
      const total = action.payload?.meta.pagination.total ?? 0;
      state.posts = action.payload?.data ?? [];
      state.hasMore = curTotal < total;
      state.status = 'success';
      state.error = '';
    });
    builder.addCase(getNextPosts.fulfilled, (state, action) => {
      const curTotal = state.posts.length + (action.payload?.data?.length ?? 0);
      const total = action.payload?.meta.pagination.total ?? 0;
      state.posts = [...state.posts, ...(action.payload?.data ?? [])];
      state.hasMore = curTotal < total;
      state.status = 'success';
      state.error = '';
    });
  },
});

export const SelectMainPagePosts = (state: RootState) => state.app.posts;

export const { resetPosts } = mainPagePostsSlice.actions;
export const mainPagePostsReducer = mainPagePostsSlice.reducer;
