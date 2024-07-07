import { Navigate, Outlet } from 'react-router-dom';
import { Loader } from './Loader.jsx';
import { useAuth } from './AuthContext.jsx';

export const RequireNonAuth = ({ children }) => {
  const { isChecked, currentUser } = useAuth();

  if (!isChecked) {
    return <Loader />;
  }

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return children || <Outlet />;
};
