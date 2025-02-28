import constructorSlice, { add, remove } from './constructorSlice';

const initialState = {
  bun: null,
  ingredients: []
};

const mockBun = {
  _id: '1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
  id: '1'
};

const mockIngr = {
  _id: '2',
  id: '2',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

describe('тесты для конструктора', () => {
  it('добавление ингр', () => {
    expect(
      constructorSlice.reducer(initialState, add(mockIngr)).ingredients
    ).toHaveLength(1);
  });

  it('удаление инрг', () => {
    const state = {
      bun: null,
      ingredients: [mockIngr]
    };
    expect(
      constructorSlice.reducer(state, remove(mockIngr)).ingredients
    ).toHaveLength(0);
  });

  it('добавление булки', () => {
    expect(constructorSlice.reducer(initialState, add(mockBun)).bun?._id).toBe(
      '1'
    );
  });

  it('удаление булки', () => {
    expect(
      constructorSlice.reducer(initialState, remove(mockBun)).bun
    ).toBeNull();
  });
});
