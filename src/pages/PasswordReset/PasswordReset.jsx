import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { useAuth } from '../../hooks/useAuth';

const ErrorMessage = {
  EMAIL_EXISTS: 'This email is already registered',
};

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
});

export default function Signin() {
  const [response, setResponse] = useState(null);

  const navigate = useNavigate();

  const { signin } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await signin(values.email, values.password);

        setResponse({ type: 'success', message: 'registration is done' });
        navigate('/');
      } catch (error) {
        if (error?.customData?._tokenResponse?.error?.message) {
          const identifier = error.customData._tokenResponse.error.message;
          if (ErrorMessage[identifier]) {
            setResponse({ type: 'error', message: ErrorMessage[identifier] });
          }
        } else {
          setResponse({ type: 'error', message: error.message });
        }
      }
    },
  });

  return (
    <div className="signin-wrapper">
      {!response ? null : (
        <Snackbar open autoHideDuration={6000}>
          <MuiAlert severity={response.type} sx={{ width: '100%' }}>
            {response.message}
          </MuiAlert>
        </Snackbar>
      )}
      <form className="signup-form" onSubmit={formik.handleSubmit}>
        <Typography sx={{ color: 'primary.main' }} component="h4" variant="h5">
          Peset Password
        </Typography>
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          sx={{ width: '100%' }}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          sx={{ width: '100%' }}
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
        />
        <Typography sx={{ color: 'primary.main' }} component="h8" variant="h5">
          forgat password
        </Typography>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: '100%', marginTop: '2em' }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
