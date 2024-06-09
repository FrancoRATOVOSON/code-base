import { AuthProvider } from '@prisma/client'
import z from 'zod'

export const sessionUserSchema = z.object({
  id: z.string().uuid(),
  login: z.string(),
  password: z.string().nullable(),
  provider: z.nativeEnum(AuthProvider)
})
