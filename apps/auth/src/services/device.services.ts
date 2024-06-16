import { prisma } from '#/database'
import { errorMessages } from '#/utils/constants'
import { PayloadError } from '#/utils/errors'
import { CreateSessionDeviceType } from '#/utils/types'

export async function createOrUpdateDevice(device: CreateSessionDeviceType) {
  if (!device.id && !device.details)
    throw new PayloadError(errorMessages.noDeviceDetails, {
      fields: ['device.id', 'device.details']
    })

  if (device.details) {
    if (device.id)
      return prisma.devices.upsert({
        where: { id: device.id },
        create: device.details,
        update: device.details,
        select: { id: true }
      })

    return prisma.devices.create({ data: device.details, select: { id: true } })
  }

  const databaseDevice = await prisma.devices.findUnique({
    where: { id: device.id! },
    select: { id: true }
  })
  if (!databaseDevice) throw new Error(errorMessages.invalidDeviceID)
  return { id: databaseDevice.id }
}
