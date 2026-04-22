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
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../../Validation/RegisterSchema';
import { Link } from 'react-router-dom';

export default function Register() {
  const [serverError, setserverError] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur'
  });

  const registerForm = async (values) => {
    try {
      const response = await axios.post(
        'https://knowledgeshop.runasp.net/api/auth/Account/Register',
        values
      );
      console.log("response", response);
    } catch (error) {
      setserverError(error?.response?.data?.errors || ['Register failed']);
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
              <HowToRegRoundedIcon sx={{ fontSize: 34 }} />
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
              Create Account
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: 420,
                mx: 'auto',
                lineHeight: 1.8,
              }}
            >
              Join us today and create your personal account to start shopping بسهولة وأناقة.
            </Typography>
          </Stack>

          {serverError?.length > 0 && (
            <Box
              sx={{
                p: 2,
                mb: 3,
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

          <Box
            component="form"
            onSubmit={handleSubmit(registerForm)}
            display="flex"
            flexDirection="column"
            gap={2.5}
          >
            <TextField
              {...register('userName')}
              fullWidth
              label="User Name"
              error={!!errors.userName}
              helperText={errors.userName?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon color="action" />
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
              {...register('fullName')}
              fullWidth
              label="Full Name"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeOutlinedIcon color="action" />
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
              {...register('email')}
              fullWidth
              label="Email"
              error={!!errors.email}
              helperText={errors.email?.message}
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

            <TextField
              {...register('phoneNumber')}
              fullWidth
              label="Phone Number"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneOutlinedIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />

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
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Register'}
            </Button>

            <Typography
              variant="body2"
              textAlign="center"
              sx={{ color: 'text.secondary', mt: 1 }}
            >
              Already have an account?{' '}
              <Link
                to="/login"
                style={{
                  textDecoration: 'none',
                  color: '#1976d2',
                  fontWeight: 600,
                }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}