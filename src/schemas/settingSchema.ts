import { z } from "zod";
import { userNameValidation } from "./signUpSchema";
import { emailValidation, passwordValidation } from "./signInSchema";

const changeProfileSchema = z.object({
  username: userNameValidation,
  email: emailValidation,
});

const changePasswordSchema = z
  .object({
    newPassword: passwordValidation,
    confirmPassword: passwordValidation,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export { changeProfileSchema, changePasswordSchema };
