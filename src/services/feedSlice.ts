import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

export const asyncThunkFeed = createAsyncThunk('feed', getFeedsApi);

type feedItems = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  status: RequestStatus;
};

const initialState: feedItems = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle
};

const feedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncThunkFeed.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(asyncThunkFeed.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.totalToday = action.payload.totalToday;
      state.total = action.payload.total;
      state.status = RequestStatus.Success;
    });
    builder.addCase(asyncThunkFeed.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
  },
  selectors: {
    takeOrders: (state) => state.orders,
    takeTotalToday: (state) => state.totalToday,
    takeTotal: (state) => state.total,
    takeState: (state) => state
  }
});

export const { takeOrders, takeTotalToday, takeTotal, takeState } =
  feedSlice.selectors;
export default feedSlice;
