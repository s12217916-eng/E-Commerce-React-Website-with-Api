import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Container,
  Paper,
  Stack,
  InputAdornment,
} from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
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
      sx={{
        minHeight: '100vh',
        py: { xs: 5, md: 8 },
        display: 'flex',
        alignItems: 'center',
        background:
          'linear-gradient(180deg, rgba(248,250,252,1) 0%, rgba(255,255,255,1) 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: 6,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 18px 50px rgba(0,0,0,0.08)',
            backgroundColor: 'background.paper',
          }}
        >
          <Stack spacing={1} mb={4} textAlign="center">
            <Box
              sx={{
                width: 70,
                height: 70,
                mx: 'auto',
                borderRadius: '20px',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 30px rgba(25,118,210,0.25)',
              }}
            >
              <LoginRoundedIcon sx={{ fontSize: 34 }} />
            </Box>

            <Typography
              component="h1"
              variant="h3"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.6px',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Welcome Back
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: 380,
                mx: 'auto',
                lineHeight: 1.8,
              }}
            >
              Login to your account and continue exploring your shopping experience.
            </Typography>
          </Stack>

          <Box
            component="form"
            onSubmit={handleSubmit(loginForm)}
            display="flex"
            flexDirection="column"
            gap={2.5}
          >
            {serverError?.length > 0 && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: 'error.lighter',
                  border: '1px solid',
                  borderColor: 'error.light',
                  color: 'error.main',
                }}
              >
                {serverError.map((err, index) => (
                  <Typography key={index} variant="body2">
                    {err}
                  </Typography>
                ))}
              </Box>
            )}

            <TextField
              {...register('email')}
              fullWidth
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />

            <TextField
              {...register('password')}
              type="password"
              fullWidth
              label="Password"
              error={!!errors.password}
              helperText={errors.password?.message}
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />

            <Box width="100%" textAlign="right">
              <Link
                to="/forgot-password"
                style={{
                  textDecoration: 'none',
                  color: '#1976d2',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              size="large"
              sx={{
                mt: 1,
                py: 1.5,
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: 'none',
              }}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Login'}
            </Button>

            <Typography
              variant="body2"
              textAlign="center"
              sx={{ color: 'text.secondary', mt: 1 }}
            >
              Don&apos;t have an account?{' '}
              <Link
                to="/register"
                style={{
                  textDecoration: 'none',
                  color: '#1976d2',
                  fontWeight: 600,
                }}
              >
                Create one
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}