import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { ingredientSelector } from '../../services/ingredientSlice';
import { takeOrders } from '../../services/feedSlice';
import { useParams } from 'react-router-dom';
import { getOrderByNumber } from '../../services/orderSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState<TOrder | null>(null);

  const orders = useSelector(takeOrders);
  const ingredients = useSelector(ingredientSelector);
  const orderByNumber = useSelector(
    (state: RootState) => state.orderSlice.orderByNumber
  );

  let { number } = useParams();

  useEffect(() => {
    if (number) {
      const existingOrder = orders.find(
        (item) => item.number === Number(number)
      );

      if (existingOrder) {
        setOrderData(existingOrder);
      } else if (orderByNumber && orderByNumber.number === Number(number)) {
        setOrderData(orderByNumber);
      } else {
        dispatch(getOrderByNumber(Number(number)));
      }
    }
  }, [number, orders, dispatch, orderByNumber]);

  const orderInfo = useMemo(() => {
    if ((!orderData && !orderByNumber) || !ingredients.length) return null;

    const order = orderData || orderByNumber;

    if (!order) return null;

    const date = new Date(order.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...order,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, orderByNumber, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
