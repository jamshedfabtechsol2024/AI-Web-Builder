import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine(
      (val) => val.length >= 10 && val.length <= 15,
      "Phone must be 10–15 digits long"
    ),

  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export const resetPasswordSchema = (isAuthZero) =>
  z
    .object({
      currentPassword: isAuthZero
        ? z.string().optional()
        : z.string().min(1, "Current password is required"),

      newPassword: z
        .string()
        .min(8, "New password must be at least 8 characters long"),

      confirmPassword: z.string().min(1, "Please confirm your new password"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
