import constructorSlice from './constructorSlice';
import feedSlice from './feedSlice';
import ingredientSlice from './ingredientSlice';
import orderSlice from './orderSlice';
import ordersSlice from './ordersSlice';
import { rootReducer } from './store';
import userSlice from './userSlice';

describe('тестирование rootReducer', () => {
  it('rootReducer', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredientSlice: ingredientSlice.reducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      constructorSlice: constructorSlice.reducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      feedSlice: feedSlice.reducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      userSlice: userSlice.reducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      orderSlice: orderSlice.reducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      orders: ordersSlice.reducer(undefined, {
        type: 'UNKNOWN_ACTION'
      })
    });
  });
});
