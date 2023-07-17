import { combineReducers } from '@reduxjs/toolkit';

import { mainPageFilterReducer } from './filter.slice';
import { mainPagePostsReducer } from './posts.slice';
import { mainPageTagsReducer } from './tags.slice';

export * from './filter.slice';
export * from './posts.slice';
export * from './tags.slice';

export const appReducer = combineReducers({
  filter: mainPageFilterReducer,
  posts: mainPagePostsReducer,
  tags: mainPageTagsReducer,
});
