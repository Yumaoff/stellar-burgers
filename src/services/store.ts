import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import constructorSlice from './constructorSlice';
import feedSlice from './feedSlice';
import ingredientSlice from './ingredientSlice';
import userSlice from './userSlice';
import orderSlice from './orderSlice';
import ordersSlice from './ordersSlice';

const rootReducer = combineReducers({
  [ingredientSlice.name]: ingredientSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
