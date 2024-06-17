import { addDays } from 'date-fns'
import crypto from 'node:crypto'

import { GeneratedSessionType } from '../types'

export function generateSession(): GeneratedSessionType {
  const id = crypto.randomBytes(128).toString('base64')
  const expirationDate = addDays(Date.now(), 7)

  return { id, expirationDate }
}
