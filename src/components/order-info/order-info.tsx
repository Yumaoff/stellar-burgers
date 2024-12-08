import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { ingredientSelector } from '../../services/ingredientSlice';
import { takeOrders } from '../../services/feedSlice';
import { useParams } from 'react-router-dom';
import {
  getOrderByNumber,
  orderByNumber,
  orderModal
} from '../../services/orderSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState<TOrder>({
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  });

  const orders = useSelector(takeOrders);

  let { number } = useParams();

  useEffect(() => {
    if (number && orders) {
      const orderData = orders.find((item) => item.number === Number(number));
      if (orderData) {
        setOrderData(orderData);
      }
    }
  }, [number, orders]);

  const ingredients = useSelector(ingredientSelector);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
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
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
