import { prisma } from '#/database'
import { errorMessages } from '#/utils/constants'
import { PayloadError } from '#/utils/errors'
import { CreateSessionDeviceType, DeepReadonly } from '#/utils/types'

export async function createOrUpdateDevice(
  device: DeepReadonly<CreateSessionDeviceType>
) {
  if (!device.id && !device.details)
    throw new PayloadError(errorMessages.noDeviceDetails, {
      fields: ['device.id', 'device.details']
    })

  if (device.id) {
    if (device.details)
      return await prisma.devices.upsert({
        where: { id: device.id },
        create: device.details,
        update: device.details
      })
    else {
      const databaseDevice = await prisma.devices.findUnique({
        where: { id: device.id }
      })
      if (databaseDevice) {
        return { id: databaseDevice.id }
      } else {
        throw new Error('Invalid device ID')
      }
    }
  } else {
    if (device.details)
      return await prisma.devices.create({ data: device.details })
    else throw new Error('Device informations missing')
  }
}
