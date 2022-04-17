import { useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth, useUserAuth } from './useAuth';

export function ProtectedRouteForAdmin({ children }) {
  const auth = useAuth();
  const location = useLocation();
  const { user } = useUserAuth();
  const navigate = useNavigate();

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (auth.user === false) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
    if (user && user.email === 'nikolayeghyan@gmail.com') {
      return navigate('/admin');
    }
  }, []);

  return children;
}
