import * as yup from "yup";

export const sendCodeSchema = yup.object({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is Required"),
});

export const resetPasswordSchema = yup.object({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is Required"),

  code: yup
    .string()
    .required("Code is Required"),

  newPassword: yup
    .string()
    .required("New Password is Required")
    .min(6, "Password must be at least 6 characters"),
});