import { Box, TextField, Button } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../../Validation/LoginSchema'
import { useState } from 'react'
import { Typography, CircularProgress } from '@mui/material'
export default function Login() {
  const [serverError, setserverError] = useState([]);
  const { register, handleSubmit, formState: { errors ,isSubmitting} } = useForm({
    resolver: yupResolver(loginSchema),mode:'onBlur'
  })
  const loginForm = async (values) => {
    try {
      const response = await axios.post(
        'https://knowledgeshop.runasp.net/api/auth/Account/Login',
        values
      )
      localStorage.setItem("AccessToken",response.data.accessToken)
      console.log("Login Success", response)
    } catch (error) {
      setserverError(error.response.data.errors);
      console.log("Catch Error", error)
    }
  }
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(loginForm)}
      display="flex"
      flexDirection="column"
      gap={2}
      mt={3}
      alignItems="center"
      sx={{mx: "auto" }}
    >
      <Typography component="p" variant="h2">Login</Typography>
      {serverError?.length > 0 && (
        <Box mt={2} color="red">
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
     <Button variant="contained" type="submit"  disabled={isSubmitting}>
               {isSubmitting ? <CircularProgress /> : 'Login'}
             </Button>
    </Box>
  )
}