import { prisma } from '#/database'
import { CreateSessionDeviceType, DeepReadonly } from '#/utils/types'

export async function createOrUpdateDevice(device: DeepReadonly<CreateSessionDeviceType>) {
  if (!device.id && !device.details) throw new Error('Device informations missing')

  if (device.id) {
    if (device.details)
      return await prisma.devices.upsert({
        where: { id: device.id },
        create: device.details,
        update: device.details
      })
    else {
      const databaseDevice = await prisma.devices.findUnique({ where: { id: device.id } })
      if (databaseDevice) {
        return { id: databaseDevice.id }
      } else {
        throw new Error('Invalid device ID')
      }
    }
  } else {
    if (device.details) return await prisma.devices.create({ data: device.details })
    else throw new Error('Device informations missing')
  }
}
