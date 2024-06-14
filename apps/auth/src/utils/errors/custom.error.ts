class CustomError<
  T,
  U extends { [key: string]: NonNullable<T> }
> extends Error {
  public getLogMessage: (() => string) | undefined
  public payload: U

  constructor(message: string, payloads: U) {
    super(message)
    this.payload = { ...payloads }
  }
}

export default CustomError
