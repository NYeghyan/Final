import { Outlet } from 'react-router-dom';
import { ProvideAuth } from '../../hooks/useAuth';
import NavBarForAdmin from '../NavBar/NavBarForAdmin';

export default function LeyaoutForAdmin() {
  return (
    <div>
      <ProvideAuth>
        <NavBarForAdmin />
        <Outlet />
      </ProvideAuth>
    </div>
  );
}
