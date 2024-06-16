import { AuthProvider } from '@prisma/client'
import z from 'zod'

export const passwordSchema = z
  .string()
  .min(6, { message: 'Password must be at least 6 characters long' })
  .max(16, { message: 'Password must be at most 16 characters long' })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter'
  })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter'
  })
  .regex(/\d/, { message: 'Password must contain at least one number' })
  .regex(/[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]/, {
    message: 'Password must contain at least one special character'
  })
  // eslint-disable-next-line no-control-regex
  .refine(password => !/[^\u0000-\u007F]/.test(password), {
    message: 'Password cannot contain non-ASCII characters'
  })

export const sessionUserSchema = z.object({
  id: z.string().uuid(),
  login: z.string(),
  password: passwordSchema.nullable(),
  provider: z.nativeEnum(AuthProvider).nullable()
})
