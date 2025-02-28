import { RequestStatus } from '@utils-types';
import feedSlice, { asyncThunkFeed } from './feedSlice';

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle
};

const orders = [
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

const total = 2;
const totalToday = 1;

describe('тесты feedSlice', () => {
  it('feedSlice rejected', async () => {
    const state = feedSlice.reducer(
      initialState,
      asyncThunkFeed.rejected(null, '')
    );

    expect(state).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      status: RequestStatus.Failed
    });
  });

  it('feedSlice loading', async () => {
    const state = feedSlice.reducer(initialState, asyncThunkFeed.pending(''));

    expect(state).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      status: RequestStatus.Loading
    });
  });

  it('feedSlice fulfilled', async () => {
    const state = feedSlice.reducer(
      initialState,
      asyncThunkFeed.fulfilled(
        {
          orders: orders,
          total: total,
          totalToday: totalToday,
          success: true
        },
        ''
      )
    );

    expect(state).toEqual({
      orders: orders,
      total: total,
      totalToday: totalToday,
      status: RequestStatus.Success
    });
  });
});
