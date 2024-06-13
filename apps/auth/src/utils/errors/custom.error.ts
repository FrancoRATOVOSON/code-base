import {IPrototype} from '#utils/types'

class CustomError<T, U extends { [key: string]: NonNullable<T> }> extends Error implements IPrototype {
  public payload:U
  public getLogMessage: (() => string) | undefined

  constructor(message:string,payloads:U) {
    super(message)
    this.payload = {...payloads}
  }
  prototype: any
}

export default CustomError