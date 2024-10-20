import { z } from "zod";

const emailValidation = z.string().email({ message: "Invalid email address" });

const passwordValidation = z
  .string()
  .min(8, { message: "password must be at least 8 characters" });

const signInSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export { emailValidation, passwordValidation, signInSchema };
