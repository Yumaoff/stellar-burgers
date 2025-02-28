import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

interface OrdersSlice {
  data: TOrder[];
  status: RequestStatus;
}

const initialState: OrdersSlice = {
  data: [],
  status: RequestStatus.Idle
};

export const orders = createAsyncThunk('orders', getOrdersApi);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(orders.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = RequestStatus.Success;
    });
    builder.addCase(orders.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(orders.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
  },
  selectors: {
    ordersSelector: (state) => state.data,
    status: (state) => state.status
  }
});

export const { ordersSelector, status } = ordersSlice.selectors;

export default ordersSlice;
