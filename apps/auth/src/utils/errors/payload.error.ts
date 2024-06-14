import CustomError from "./custom.error";


class PayloadError extends CustomError<string[], {fields: string[]}> {
  constructor(responseMessage:string, payload: {fields: string[]} ) {
    super(responseMessage,payload)
  }

  public getLogMessage: () => string = () => {
    return `PayloadError - Missing fields on: [${this.payload.fields.join(' - ')}]`
  }
}

export default PayloadError