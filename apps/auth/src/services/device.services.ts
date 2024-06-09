import { prisma } from '#/database'
import { CreateSessionDeviceType } from '#/utils/types'

export async function createOrUpdateDevice(device: CreateSessionDeviceType) {
  let sessionDevice: { id: string }

  if (device.id) {
    if (device.details)
      sessionDevice = await prisma.devices.upsert({
        where: { id: device.id },
        create: device.details,
        update: device.details
      })
    else {
      const dbDevice = await prisma.devices.findUnique({ where: { id: device.id } })
      if (!dbDevice) throw new Error('Invalid device ID')
      else sessionDevice = { id: dbDevice.id }
    }
  } else {
    if (device.details) sessionDevice = await prisma.devices.create({ data: device.details })
    else throw new Error('Device informations missing')
  }

  return sessionDevice
}
