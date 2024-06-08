/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace PrismaJson {
    type SessionDevice = {
      id: string
      type: 'desktop' | 'mobile' | 'tablet'
      manufacturer: string
      client: {
        type: 'web' | 'native'
        version: string
        details: string
      }
    }
  }
}

export {}
