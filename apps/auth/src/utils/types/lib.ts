import z from 'zod'

import { responseErrorSchema } from '#/schema'

export type ResponseErrorType = z.infer<typeof responseErrorSchema>
