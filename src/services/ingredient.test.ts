import { RequestStatus } from '@utils-types';
import ingredientSlice, { asyncThunkIngredient } from './ingredientSlice';

export const initialState = {
  ingredient: [],
  status: RequestStatus.Idle
};

const ingr = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  }
];

describe('тесты ingredientSlice', () => {
  it('ingredientSlice rejected', async () => {
    const state = ingredientSlice.reducer(
      initialState,
      asyncThunkIngredient.rejected(null, '')
    );

    expect(state).toEqual({
      ingredient: [],
      status: RequestStatus.Failed
    });
  });

  it('ingredientSlice loading', async () => {
    const state = ingredientSlice.reducer(
      initialState,
      asyncThunkIngredient.pending('')
    );

    expect(state).toEqual({
      ingredient: [],
      status: RequestStatus.Loading
    });
  });

  it('ingredientSlice fulfilled', async () => {
    const state = ingredientSlice.reducer(
      initialState,
      asyncThunkIngredient.fulfilled(ingr, '')
    );

    expect(state).toEqual({
      ingredient: ingr,
      status: RequestStatus.Success
    });
  });
});
