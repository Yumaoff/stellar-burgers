import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { asyncThunkFeed, takeOrders } from '../../services/feedSlice';
import {
  ordersSelector,
  orders as getOrders
} from '../../services/ordersSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const orders = useSelector(ordersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
    dispatch(asyncThunkFeed());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
