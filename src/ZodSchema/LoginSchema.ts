import { z } from "zod";

export const LoginFormDataSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().min(1, "email is required").email("Invalid email address"),
  username: z.string().min(1, "username is required"),
  password: z.string().min(1, "password is required"),
});
