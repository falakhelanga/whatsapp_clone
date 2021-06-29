import * as yup from "yup";

export const registration = yup.object().shape({
  name: yup
    .string()
    .required("this feild is required")
    .min(4, "Your name must have atleast 4 charectors"),
  number: yup
    .string()
    .required("this feild is required")
    .min(8, "Your ID must have atleast 8 charectors"),
  password: yup
    .string()
    .required("this feild is required")
    .min(4, "You password must have atleast 4 charectors"),
});

export const loginSchema = yup.object().shape({
  number: yup
    .string()
    .required("this feild is required")
    .min(8, "Your ID must have atleast 8 charectors"),
  password: yup
    .string()
    .required("this feild is required")
    .min(4, "You password must have atleast 4 charectors"),
});
