import { RequestStatus } from '@utils-types';
import orderSlice, { getOrder, getOrderByNumber } from './orderSlice';

const initialState = {
  orderByNumber: null,
  status: RequestStatus.Idle,
  orderModalData: null,
  orderRequest: false
};

const mock = {
  order: {
    _id: '66d7fd3a119d45001b503fa8',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2024-09-04T06:24:58.547Z',
    updatedAt: '2024-09-04T06:24:59.031Z',
    number: 51931
  }
};

describe('тесты orderSlice', () => {
  it('orderSlice getOrder rejected', async () => {
    const state = orderSlice.reducer(initialState, {
      type: getOrder.rejected.type,
      payload: mock.order
    });

    expect(state).toEqual({
      orderByNumber: null,
      status: RequestStatus.Idle,
      orderModalData: null,
      orderRequest: false
    });
  });

  it('orderSlice  getOrder loading', async () => {
    const state = orderSlice.reducer(initialState, {
      type: getOrder.pending.type,
      payload: mock.order
    });

    expect(state).toEqual({
      orderByNumber: null,
      status: RequestStatus.Idle,
      orderModalData: null,
      orderRequest: true
    });
  });

  it('orderSlice getOrder fulfilled', async () => {
    const state = orderSlice.reducer(initialState, {
      type: getOrder.fulfilled.type,
      payload: mock
    });

    expect(state).toEqual({
      orderByNumber: null,
      status: RequestStatus.Idle,
      orderModalData: mock.order,
      orderRequest: false
    });
  });
});
