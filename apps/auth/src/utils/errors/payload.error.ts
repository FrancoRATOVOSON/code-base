import CustomError from './custom.error'

class PayloadError extends CustomError<string[], { fields: string[] }> {
  public getLogMessage: () => string = () => {
    return `PayloadError - Missing fields on: [${this.payload.fields.join(' - ')}]`
  }
}

export default PayloadError
