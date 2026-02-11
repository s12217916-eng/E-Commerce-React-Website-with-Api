import { Box, TextField, Button } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../../Validation/LoginSchema'

export default function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const loginForm = async (values) => {
    try {
      const response = await axios.post(
        'https://knowledgeshop.runasp.net/api/auth/Account/Login',
        values
      )

      console.log("Login Success", response)

    } catch (error) {
      console.log("Login Error", error)
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

      <Button variant="contained" type="submit" fullWidth>
        Login
      </Button>

    </Box>
  )
}