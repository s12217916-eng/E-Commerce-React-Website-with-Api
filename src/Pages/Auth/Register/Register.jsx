import { Box, TextField, Button } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerSchema } from '../../../Validation/RegisterSchema'
export default function Register() {

 

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema)
  })

  const registerForm = async (values) => {
    try {
      const response = await axios.post(
        'https://knowledgeshop.runasp.net/api/auth/Account/Register',
        values
      )
      console.log("response", response)

    } catch (error) {
      console.log("Catch Error", error)
    }
  }

  return (
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

      <Button variant="contained" type="submit" >
        Register
      </Button>

    </Box>
  )
}