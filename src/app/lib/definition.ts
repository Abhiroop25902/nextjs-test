import { z } from "zod";

export const SignUpFormNames = {
  username: "username",
  email: "email",
  password: "password",
};

export const SignUpFormSchema = z.object({
  [SignUpFormNames.username]: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  [SignUpFormNames.email]: z
    .string()
    .email({ message: "Please enter a valid email" })
    .trim(),
  [SignUpFormNames.password]: z
    .string()
    .min(8, { message: "Should be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Should contain at least one letter." })
    .regex(/[0-9]/, { message: "Should contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Should contain at least one special character.",
    })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
