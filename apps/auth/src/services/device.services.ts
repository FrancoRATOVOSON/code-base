import { PrismaClient } from '@prisma/client'

import { errorMessages } from '#/utils/constants'
import { PayloadError } from '#/utils/errors'
import { CreateSessionDeviceType } from '#/utils/types'

export async function createOrUpdateDevice(
  client: PrismaClient,
  device: CreateSessionDeviceType
) {
  if (!device.id && !device.details)
    throw new PayloadError(errorMessages.noDeviceDetails, {
      fields: ['device.id', 'device.details']
    })

  if (device.details) {
    if (device.id)
      return client.devices.upsert({
        where: { id: device.id },
        create: device.details,
        update: device.details,
        select: { id: true }
      })

    return client.devices.create({ data: device.details, select: { id: true } })
  }

  const databaseDevice = await client.devices.findUnique({
    where: { id: device.id! },
    select: { id: true }
  })
  if (!databaseDevice) throw new Error(errorMessages.invalidDeviceID)
  return { id: databaseDevice.id }
}
