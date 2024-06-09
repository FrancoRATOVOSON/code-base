/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace PrismaJson {
    type DeviceDetails = {
      os: {
        name: string
        version: string | null
      }
      manufacturer: string | null
      browser: null | {
        name: string
        version: string
      }
    }

    type DeviceLocation = {
      city: string
      region: string
      country: string
    }
  }
}
