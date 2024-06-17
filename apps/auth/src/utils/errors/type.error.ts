import CustomError from './custom.error'

class PayloadTypeError extends CustomError<string, { field: string }> {
  constructor(message: string, payload: { field: string }) {
    super(message, payload)
    this.message = `Type error: ${message} at ${this.payload.field}`
  }
}

export default PayloadTypeError
