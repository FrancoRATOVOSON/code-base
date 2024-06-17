import CustomError from './custom.error'

class PasswordError extends CustomError<string, { message: string }> {
  constructor(message: string) {
    super(message, { message })
  }
}

export default PasswordError
