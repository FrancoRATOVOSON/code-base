import { AuthProvider, Devices } from '@prisma/client'

export type DeviceDetails = PrismaJson.DeviceDetails
export type DeviceLocation = PrismaJson.DeviceLocation

export type CreateSessionParams = {
  user: {
    id: string
    login: string
    password: string | null
    provider: AuthProvider | null
  }
  device: { id: string | null; details: Omit<Devices, 'userId' | 'id'> | null }
}

export type CreateSessionReturnType = {
  sessionId: string
  deviceId: string
  userId: string
  userToken: string
}

export type GeneratedSessionType = {
  id: string
  expirationDate: Date
}
