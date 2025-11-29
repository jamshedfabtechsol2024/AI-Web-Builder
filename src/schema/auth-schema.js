import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z
      .string()
      .transform((val) => val.replace(/\D/g, ""))
      .refine(
        (val) => val.length >= 10 && val.length <= 15,
        "Phone must be 10–15 digits long"
      ),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    privacy: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Terms of Service and Privacy Policy.",
    }),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP must be 6 digits" })
    .regex(/^\d{6}$/, { message: "OTP must be numeric" }),
});

export const resetSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
