import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  title: z.string().min(1, "Job Title is required"),
  experience: z.string().min(1, "Experience is required"),
  bio: z.string().min(1, "Bio is required"),
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine(
      (val) => val.length >= 10 && val.length <= 15,
      "Phone must be 10–15 digits long"
    ),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
});

export const supportSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine(
      (val) => val.length >= 10 && val.length <= 15,
      "Phone must be 10–15 digits long"
    ),
  message: z.string().min(1, "Message is required"),
});
