import * as yup from "yup";
export const registerSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(6),
});
