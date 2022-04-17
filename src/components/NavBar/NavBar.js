/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../../hooks/useAuth';
import styles from './NavBar.module.css';

export default function NavBar() {
  const [color, setColor] = useState(false);
  const navigate = useNavigate();
  const { user, signout } = useAuth();
  const { pathname } = useLocation();

  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };
  const handleSigninClick = () => {
    navigate('/signin');
  };

  const handleProfilePage = () => {
    navigate('/profile');
  };

  const handleHomePage = () => {
    navigate('/');
  };

  const handleLogOut = () => {
    signout();
    navigate('/');
  };

  window.addEventListener('scroll', changeColor);

  return (
    <nav
      style={{
        display: pathname === '/' ? ' ' : 'contents',
      }}
    >
      <div
        className={color ? styles.color : styles.black}
        style={{
          backgroundColor: pathname === '/' ? '#100f0f0a' : 'black',
        }}
      >
        <div className={styles.logo}>
          <Button onClick={handleHomePage} />
        </div>
        <ul className={styles.menu_list}>
          {user ? (
            <>
              <li>
                <Button onClick={handleLogOut} style={{ marginRight: '15px' }}>
                  Log Out
                </Button>
              </li>
              <li>
                <Button onClick={handleProfilePage}>My Profile</Button>
              </li>
              <li>
                {pathname === '/profile' ? (
                  // Need To ask
                  // eslint-disable-next-line no-undef
                  <Button onClick={() => handleEventDisplay()}>My fav</Button>
                ) : (
                  ' '
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <Button onClick={handleSigninClick}>Sign In</Button>
              </li>
              <li>
                <Button onClick={handleSignupClick}>Sing Up</Button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
