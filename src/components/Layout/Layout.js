import { Outlet } from 'react-router-dom';
import { ProvideAuth } from '../../hooks/useAuth';
import NavBar from '../NavBar/NavBar';
import Footer from '../StyleComponents/footer';

export default function Layout() {
  return (
    <div>
      <ProvideAuth>
        <NavBar />
        <Outlet />
        <Footer />
      </ProvideAuth>
    </div>
  );
}
