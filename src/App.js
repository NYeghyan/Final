import { ThemeProvider } from '@mui/material/styles';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout/Layout';
import LeyaoutForAdmin from './components/Layout/LeyaoutForAdmin';
import theme from './components/theme/Theme';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import { ProvideAuth } from './hooks/useAuth';
import { ProtectedRouteForAdmin } from './hooks/ProtectedRout';

const Home = lazy(() => import('./pages/Home/Home'));
const Admin = lazy(() => import('./pages/Admin/Admin'));
const CreateEvent = lazy(() => import('./pages/CreateEvent/CreateEvent'));
const UpdateEvent = lazy(() => import('./pages/UpdateEvent/UpdateEvent'));
const Signin = lazy(() => import('./pages/Signin/Signin'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const SingleEventPage = lazy(
  () => import('./pages/SingleEventPage/SingleEventPage')
);
const Profile = lazy(() => import('./pages/Profile/Profile'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <ProvideAuth>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRouteForAdmin>
                    <LeyaoutForAdmin />
                  </ProtectedRouteForAdmin>
                }
              >
                <Route path="admin" element={<Admin />} />
                <Route path="createevent" element={<CreateEvent />} />
                <Route path="updateEvent" element={<UpdateEvent />} />
              </Route>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="signup" element={<Signup />} />
                <Route path="signin" element={<Signin />} />
                <Route
                  path="/singleEventPage/:eventid"
                  element={<SingleEventPage />}
                />
                <Route
                  path="profile"
                  element={
                    <ProtectedRouteForAdmin>
                      <Profile />
                    </ProtectedRouteForAdmin>
                  }
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </ProvideAuth>
    </BrowserRouter>
  );
}

export default App;
