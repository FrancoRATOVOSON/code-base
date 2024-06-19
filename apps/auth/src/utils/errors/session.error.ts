import { AuthenticationErrorCode, AuthenticationErrorType } from '../types'
import CustomError from './custom.error'

const defaultMessage = 'Authetication required'

class SessionError<
  ErrorType extends AuthenticationErrorType = 'session'
> extends CustomError<
  AuthenticationErrorCode<ErrorType>,
  { log: AuthenticationErrorCode<ErrorType> }
> {
  public getLogMessage: () => string = () => {
    return `SessionError - ${this.payload.log}`
  }

  constructor(log: AuthenticationErrorCode<ErrorType>) {
    super(defaultMessage, {
      log
    })
  }
}

export default SessionError
