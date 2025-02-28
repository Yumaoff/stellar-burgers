import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { ingredientSelector } from '../../services/ingredientSlice';
import { useParams } from 'react-router-dom';

interface Params {
  id: string;
}

export const IngredientDetails: FC = () => {
  const { id } = useParams();

  const ingredientData = useSelector(ingredientSelector).find(
    (item) => item._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
