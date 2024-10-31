import { z } from 'zod';

// Zod schema for Tuser
export const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'Name is required')
      .max(50, 'Name must be 50 characters or less'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    mobile: z.string(),
    status: z.string(),
    image: z.string().url('Invalid URL format').optional(),
    role: z
      .string()
      .refine(
        (role) => ['user', 'admin'].includes(role),
        "Role must be either 'user' or 'admin'",
      ),
  }),
});
