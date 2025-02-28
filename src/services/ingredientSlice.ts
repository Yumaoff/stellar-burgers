import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';

export const asyncThunkIngredient = createAsyncThunk(
  'ingredient',
  getIngredientsApi
);

type IngredientSlice = {
  ingredient: TIngredient[];
  status: RequestStatus;
};

export const initialState: IngredientSlice = {
  ingredient: [],
  status: RequestStatus.Idle
};

const ingredientSlice = createSlice({
  name: 'ingredientSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncThunkIngredient.fulfilled, (state, action) => {
      state.status = RequestStatus.Success;
      state.ingredient = action.payload;
    });
    builder.addCase(asyncThunkIngredient.pending, (state, action) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(asyncThunkIngredient.rejected, (state, action) => {
      state.status = RequestStatus.Failed;
    });
  },
  selectors: {
    ingredientSelector: (state) => state.ingredient,
    ingredientStatus: (state) => state.status
  }
});

export default ingredientSlice;
export const { ingredientSelector, ingredientStatus } =
  ingredientSlice.selectors;
