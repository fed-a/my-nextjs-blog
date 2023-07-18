/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, type Draft } from '@reduxjs/toolkit';

type ThunkApiCallType<Params, ReturnType> = (_args: Params, _thunkApi: any) => Promise<ReturnType>;

interface CreateAsyncSliceParams<Params, ReturnType, Name> {
  name: Name;
  thunk: ThunkApiCallType<Params, ReturnType>;
  normalizer: (_: ReturnType) => Draft<ReturnType>;
}

interface AsyncSliceInitialState<NormalizedReturnType> {
  data: NormalizedReturnType | null;
  status: 'loading' | 'success' | 'error' | null;
  error: string;
}

export function createAsyncSlice<Params, ReturnType, Name extends string = string>({
  name,
  thunk: apiCall,
  normalizer,
}: CreateAsyncSliceParams<Params, ReturnType, Name>): any {
  const initialState: AsyncSliceInitialState<ReturnType> = {
    data: null,
    status: null,
    error: '',
  };

  const apiCallThunk = createAsyncThunk(`${name}/apiCall`, apiCall);

  const slice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(apiCallThunk.pending, (state) => {
        state.data = null;
        state.status = 'loading';
        state.error = '';
      });
      builder.addCase(apiCallThunk.fulfilled, (state, action) => {
        state.data = normalizer(action.payload);
        state.status = 'success';
        state.error = '';
      });
      builder.addCase(apiCallThunk.rejected, (state, action) => {
        state.data = null;
        state.status = 'error';
        state.error = action.error.message ?? 'Error while fetching';
      });
    },
  });

  return {
    reducer: slice.reducer,
    apiCall,
  };
}
