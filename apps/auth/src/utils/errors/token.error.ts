import CustomError from './custom.error'

const tokenErrors = {
  invalidTokenFormat: 'Invalid token format',
  invalidTokenSignature: 'Invalid token signature',
  tokenHasExpired: 'Token has expired',
  tokenUsedBeforeIssued: 'Token used before issued'
}

type TokenErrorType = keyof typeof tokenErrors

class TokenError extends CustomError<string, { token: string }> {
  public getLogMessage: () => string = () => {
    return `TokenError - ${this.message}`
  }

  constructor(error: TokenErrorType, token: string) {
    // eslint-disable-next-line security/detect-object-injection
    super(tokenErrors[error], { token })
  }
}

export default TokenError
