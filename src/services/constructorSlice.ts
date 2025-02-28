import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type ConstructorItems = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: ConstructorItems = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  reducers: {
    add: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (item) => {
        const id = nanoid();
        return { payload: { ...item, id } };
      }
    },
    remove: (state, action: PayloadAction<TConstructorIngredient>) => {
      const newState = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );

      state.ingredients = newState;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    reorderConstructor: {
      reducer: (
        state,
        { payload }: PayloadAction<{ from: number; to: number }>
      ) => {
        const { from, to } = payload;
        const ingredients = [...state.ingredients];

        ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
        state.ingredients = ingredients;
      },
      prepare: (item) => {
        const id = nanoid();
        return { payload: { ...item, id } };
      }
    }
  },
  selectors: {
    constructorItem: (state) => state
  }
});

export const { add, remove, reorderConstructor, clearConstructor } =
  constructorSlice.actions;

export const { constructorItem } = constructorSlice.selectors;

export default constructorSlice;
