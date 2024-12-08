import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { asyncThunkFeed, takeOrders } from '../../services/feedSlice';

export const Feed: FC = () => {
  const orders = useSelector(takeOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncThunkFeed());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(asyncThunkFeed());
      }}
    />
  );
};
