export const errorMessages = {
  noDeviceDetails: 'Device informations missing',
  invalidDeviceID: 'Invalid device ID',
  unrecognizedSession: 'Unrecognized session',
  invalidTokenPayload: 'Missing field in token',
  noLoginProviderFound: 'Login provider missing',
  cannotLoginWithPasswordAndProvider: 'Cannot login with password and provider',
  invalidPayload: 'Payloads type error found'
}

export const authenticationErrors = {
  session: {
    noCookieHeaderFound: 'No cookie header found',
    noSessionFieldInCookies: 'No session field in cookies'
  } as const,
  token: {
    noRequestAuthorizationFound: 'No request authorization found',
    wrongAuthorizationFormat: 'Wrong authorization format',
    noTokenFound: 'No token found'
  } as const
} as const
