import { z } from 'zod'
import { deviceDetailsSchema, deviceLocationSchema } from '../../schema'

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace PrismaJson {
    type DeviceDetails = z.infer<typeof deviceDetailsSchema>

    type DeviceLocation = z.infer<typeof deviceLocationSchema>
  }
}

export {}
