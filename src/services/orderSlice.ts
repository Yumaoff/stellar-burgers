import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';

interface OrderSlice {
  orderByNumber: TOrder | null;
  status: RequestStatus;
  orderModalData: TOrder | null;
  orderRequest: boolean;
}

const initialState: OrderSlice = {
  orderByNumber: null,
  status: RequestStatus.Idle,
  orderModalData: null,
  orderRequest: false
};

export const getOrder = createAsyncThunk('order/getOrder', orderBurgerApi);
export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  getOrderByNumberApi
);

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    clear: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.orderModalData = action.payload.order;
      state.orderRequest = false;
    });
    builder.addCase(getOrder.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(getOrder.rejected, (state) => {
      state.orderRequest = false;
    });
    builder.addCase(getOrderByNumber.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.orderByNumber = action.payload.orders[0];
      state.orderModalData = action.payload.orders[0];
    });
  },
  selectors: {
    orderSliceSelector: (state) => state,
    orderModal: (state) => state.orderModalData,
    orderByNumber: (state) => state.orderByNumber,
    orderRequest: (state) => state.orderRequest
  }
});

export const { orderSliceSelector, orderModal, orderByNumber, orderRequest } =
  orderSlice.selectors;
export const { clear } = orderSlice.actions;
export default orderSlice;
