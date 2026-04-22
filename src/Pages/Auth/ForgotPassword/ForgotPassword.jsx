import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { sendCodeSchema, resetPasswordSchema } from '../ForgotPasswordSchema';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [serverError, setServerError] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [savedEmail, setSavedEmail] = useState('');

  // Step 1 form
  const {
    register: registerSendCode,
    handleSubmit: handleSubmitSendCode,
    formState: { errors: sendCodeErrors, isSubmitting: isSendingCode },
  } = useForm({
    resolver: yupResolver(sendCodeSchema),
    mode: 'onBlur',
  });

  // Step 2 form
  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: resetErrors, isSubmitting: isResettingPassword },
    setValue,
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onBlur',
  });

  const handleSendCode = async (values) => {
    setServerError([]);
    setSuccessMessage('');

    try {
      await axios.post(
        'https://knowledgeshop.runasp.net/api/auth/Account/SendCode',
        {
          email: values.email,
        }
      );

      setSavedEmail(values.email);
      setValue('email', values.email);
      setSuccessMessage('Code sent successfully to your email.');
      setStep(2);
    } catch (error) {
      setServerError(
        error?.response?.data?.errors ||
        [error?.response?.data?.message || 'Something went wrong']
      );
    }
  };

  const handleResetPassword = async (values) => {
    setServerError([]);
    setSuccessMessage('');

    try {
      await axios.patch(
        'https://knowledgeshop.runasp.net/api/auth/Account/ResetPassword',
        {
          email: values.email,
          code: values.code,
          newPassword: values.newPassword,
        }
      );

      setSuccessMessage('Password reset successfully. You can login now.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      setServerError(
        error?.response?.data?.errors ||
        [error?.response?.data?.message || 'Something went wrong']
      );
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: 'auto',
        mt: 4,
      }}
    >
      <Typography component="h1" variant="h3" mb={3} textAlign="center">
        Forgot Password
      </Typography>

      {serverError?.length > 0 && (
        <Box mt={2} mb={2} color="red">
          {serverError.map((err, index) => (
            <Typography key={index}>{err}</Typography>
          ))}
        </Box>
      )}

      {successMessage && (
        <Box mt={2} mb={2} color="green">
          <Typography>{successMessage}</Typography>
        </Box>
      )}

      {step === 1 && (
        <Box
          component="form"
          onSubmit={handleSubmitSendCode(handleSendCode)}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            {...registerSendCode('email')}
            fullWidth
            label="Email"
            error={!!sendCodeErrors.email}
            helperText={sendCodeErrors.email?.message}
          />

          <Button variant="contained" type="submit" disabled={isSendingCode}>
            {isSendingCode ? <CircularProgress size={24} /> : 'Send Code'}
          </Button>
        </Box>
      )}

      {step === 2 && (
        <Box
          component="form"
          onSubmit={handleSubmitReset(handleResetPassword)}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            {...registerReset('email')}
            fullWidth
            label="Email"
            defaultValue={savedEmail}
            error={!!resetErrors.email}
            helperText={resetErrors.email?.message}
          />

          <TextField
            {...registerReset('code')}
            fullWidth
            label="Code"
            error={!!resetErrors.code}
            helperText={resetErrors.code?.message}
          />

          <TextField
            {...registerReset('newPassword')}
            type="password"
            fullWidth
            label="New Password"
            error={!!resetErrors.newPassword}
            helperText={resetErrors.newPassword?.message}
          />

          <Button
            variant="contained"
            type="submit"
            disabled={isResettingPassword}
          >
            {isResettingPassword ? (
              <CircularProgress size={24} />
            ) : (
              'Reset Password'
            )}
          </Button>
        </Box>
      )}
    </Box>
  );
}