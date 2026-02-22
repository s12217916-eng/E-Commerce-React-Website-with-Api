import { Box, TextField, Button, colors, Typography, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '../../../Validation/RegisterSchema'
export default function Register() {
  const [serverError, setserverError] = useState([]);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(registerSchema), mode: 'onBlur'
  })

  const registerForm = async (values) => {
    try {
      const response = await axios.post(
        'https://knowledgeshop.runasp.net/api/auth/Account/Register',
        values
      )
      console.log("response", response)

    } catch (error) {
      setserverError(error.response.data.errors);
      console.log("Catch Error", error)
    }
  }

  return (
    <Box component="section" py={2}>
      <Typography component="p" variant="h2">Register</Typography>
      {serverError?.length > 0 && (
        <Box mt={2} color="red">
          {serverError.map((err, index) => (
            <Typography key={index}>{err}</Typography>
          ))}
        </Box>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit(registerForm)}
        display="flex"
        flexDirection="column"
        gap={2}
        mt={3}
        alignItems="center"
        sx={{ mx: "auto" }}
      >

        <TextField
          {...register('userName')}
          fullWidth
          label="User Name"
          error={!!errors.userName}
          helperText={errors.userName?.message}
        />

        <TextField
          {...register('fullName')}
          fullWidth
          label="Full Name"
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />

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

        <TextField
          {...register('phoneNumber')}
          fullWidth
          label="Phone Number"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
        />
        
        <Button variant="contained" type="submit"  disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress /> : 'Register'}
        </Button>

      </Box>
    </Box>
  )
}