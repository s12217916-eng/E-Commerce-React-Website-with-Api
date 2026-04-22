import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../../Validation/LoginSchema';
import useAuthStore from '../../../store/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const setToken = useAuthStore((state) => state.setToken);
  const navigate = useNavigate();
  const [serverError, setserverError] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur'
  });

  const loginForm = async (values) => {
    try {
      const response = await axios.post(
        'https://knowledgeshop.runasp.net/api/auth/Account/Login',
        values
      );

      if (response.status === 200) {
        setToken(response.data.accessToken);
        navigate('/');
      }
    } catch (error) {
      setserverError(
        error?.response?.data?.errors ||
        [error?.response?.data?.message || 'Login failed']
      );
      console.log("Catch Error", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(loginForm)}
      display="flex"
      flexDirection="column"
      gap={2}
      mt={3}
      alignItems="center"
      sx={{ mx: "auto", maxWidth: 500 }}
    >
      <Typography component="p" variant="h2">
        Login
      </Typography>

      {serverError?.length > 0 && (
        <Box mt={2} color="red" width="100%">
          {serverError.map((err, index) => (
            <Typography key={index}>{err}</Typography>
          ))}
        </Box>
      )}

      <TextField
        {...register('email')}
        fullWidth
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        {...register('password')}
        type="password"
        fullWidth
        label="Password"
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Box width="100%" textAlign="right">
        <Link
          to="/forgot-password"
          style={{
            textDecoration: 'none',
            color: '#1976d2',
            fontSize: '14px',
          }}
        >
          Forgot Password?
        </Link>
      </Box>

      <Button variant="contained" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
      </Button>
    </Box>
  );
}