import { useSelector } from './store';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '@ui';
import { checkAuth, checkAuthUser, userSliceSelector } from './userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const user = useSelector(userSliceSelector);
  const location = useLocation();
  const isAuthChecked = useSelector(checkAuthUser);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
