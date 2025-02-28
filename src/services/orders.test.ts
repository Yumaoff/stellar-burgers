import { RequestStatus } from '@utils-types';
import ingredientSlice, { asyncThunkIngredient } from './ingredientSlice';
import ordersSlice, { orders } from './ordersSlice';

const initialState = {
  data: [],
  status: RequestStatus.Idle
};

const mock = [
  {
    _id: '66d7fc9d119d45001b503fa1',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2024-09-04T06:22:21.104Z',
    updatedAt: '2024-09-04T06:22:21.577Z',
    number: 51930
  },
  {
    _id: '66d7fc76119d45001b503f9b',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093c'],
    status: 'done',
    name: 'Краторный бургер',
    createdAt: '2024-09-04T06:21:42.115Z',
    updatedAt: '2024-09-04T06:21:42.584Z',
    number: 51929
  }
];

describe('тесты ordersSlice', () => {
  it('ordersSlice rejected', async () => {
    const state = ordersSlice.reducer(initialState, orders.rejected(null, ''));

    expect(state).toEqual({
      data: [],
      status: RequestStatus.Failed
    });
  });

  it('ordersSlice loading', async () => {
    const state = ordersSlice.reducer(initialState, orders.pending(''));

    expect(state).toEqual({
      data: [],
      status: RequestStatus.Loading
    });
  });

  it('ordersSlice fulfilled', async () => {
    const state = ordersSlice.reducer(initialState, orders.fulfilled(mock, ''));

    expect(state).toEqual({
      data: mock,
      status: RequestStatus.Success
    });
  });
});
