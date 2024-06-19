import CustomError from './custom.error'

const sessionErrors = [
  'No cookie header found',
  'No session field in cookies'
] as const

const defaultMessage = 'Authetication required'

class SessionError extends CustomError<1 | 2, { code: 1 | 2 }> {
  public getLogMessage: (() => string) | undefined = () => {
    return `SessionError - ${sessionErrors[this.payload.code - 1]}`
  }

  constructor(code: 1 | 2) {
    super(defaultMessage, { code })
  }
}

export default SessionError
