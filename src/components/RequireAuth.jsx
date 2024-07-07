import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loader } from './Loader.jsx';
import { useAuth } from './AuthContext.jsx';

export const RequireAuth = ({ children }) => {
  const { isChecked, currentUser } = useAuth();
  const location = useLocation();

  if (!isChecked) {
    return <Loader />;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children || <Outlet />;
};
