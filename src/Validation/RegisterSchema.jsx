 import * as yup from 'yup'
 import { yupResolver } from '@hookform/resolvers/yup'

 export const registerSchema = yup.object({
    userName: yup
      .string()
      .required("UserName is Required")
      .min(3, "User Name must be at least 3 characters")
      .matches(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, _ and - allowed"),

    fullName: yup
      .string()
      .required("Full Name is Required"),

    email: yup
      .string()
      .email("Email must be valid")
      .required("Email is Required"),

    password: yup
      .string()
      .required("Password is Required")
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/\d/, "Must contain at least one number")
      .matches(/[@$!%*?&]/, "Must contain at least one special character"),

    phoneNumber: yup
      .string()
      .required("Phone Number is Required")
      .min(10, "Phone Number must be at least 10 digits"),
  })
