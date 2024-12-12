import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  constructorItem
} from '../../services/constructorSlice';
import {
  orderModal,
  orderRequest as request,
  getOrder,
  clear
} from '../../services/orderSlice';
import { useNavigate } from 'react-router-dom';
import { userSliceSelector } from '../../services/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(userSliceSelector);

  const constructorItems = useSelector(constructorItem);

  const orderRequest = useSelector(request);

  console.log(orderRequest);

  const orderModalData = useSelector(orderModal);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
    }
    const dataBun = constructorItems.bun?._id;
    const dataIngredients = constructorItems.ingredients.map(
      (item) => item._id
    );

    const data = [dataBun, ...dataIngredients];
    dispatch(getOrder(data));
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clear());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
