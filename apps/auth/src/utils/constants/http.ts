export const httpErrors = {
  badRequest: { code: 400, error: 'Bad Request' } as const,
  unauthorized: { code: 401, error: 'Unauthorized' } as const,
  paymentRequired: { code: 402, error: 'Payment Required' } as const,
  forbidden: { code: 403, error: 'Forbidden' } as const,
  notFound: { code: 404, error: 'Not Found' } as const,
  methodNotAllowed: { code: 405, error: 'Method Not Allowed' } as const,
  notAcceptable: { code: 406, error: 'Not Acceptable' } as const,
  proxyAuthenticationRequired: {
    code: 407,
    error: 'Proxy Authentication Required'
  } as const,
  requestTimeout: { code: 408, error: 'Request Timeout' } as const,
  conflict: { code: 409, error: 'Conflict' } as const,
  gone: { code: 410, error: 'Gone' } as const,
  lengthRequired: { code: 411, error: 'Length Required' } as const,
  preconditionFailed: { code: 412, error: 'Precondition Failed' } as const,
  payloadTooLarge: { code: 413, error: 'Payload Too Large' } as const,
  uriTooLong: { code: 414, error: 'URI Too Long' } as const,
  unsupportedMediaType: { code: 415, error: 'Unsupported Media Type' } as const,
  rangeNotSatisfiable: { code: 416, error: 'Range Not Satisfiable' } as const,
  expectationFailed: { code: 417, error: 'Expectation Failed' } as const,
  imATeapot: { code: 418, error: "I'm a teapot" } as const,
  misdirectedRequest: { code: 421, error: 'Misdirected Request' } as const,
  unprocessableEntity: { code: 422, error: 'Unprocessable Entity' } as const,
  locked: { code: 423, error: 'Locked' } as const,
  failedDependency: { code: 424, error: 'Failed Dependency' } as const,
  tooEarly: { code: 425, error: 'Too Early' } as const,
  upgradeRequired: { code: 426, error: 'Upgrade Required' } as const,
  preconditionRequired: { code: 428, error: 'Precondition Required' } as const,
  tooManyRequests: { code: 429, error: 'Too Many Requests' } as const,
  requestHeaderFieldsTooLarge: {
    code: 431,
    error: 'Request Header Fields Too Large'
  } as const,
  unavailableForLegalReasons: {
    code: 451,
    error: 'Unavailable For Legal Reasons'
  } as const,
  internalServerError: { code: 500, error: 'Internal Server Error' } as const,
  notImplemented: { code: 501, error: 'Not Implemented' } as const,
  badGateway: { code: 502, error: 'Bad Gateway' } as const,
  serviceUnavailable: { code: 503, error: 'Service Unavailable' } as const,
  gatewayTimeout: { code: 504, error: 'Gateway Timeout' } as const,
  httpVersionNotSupported: {
    code: 505,
    error: 'HTTP Version Not Supported'
  } as const,
  variantAlsoNegotiates: {
    code: 506,
    error: 'Variant Also Negotiates'
  } as const,
  insufficientStorage: { code: 507, error: 'Insufficient Storage' } as const,
  loopDetected: { code: 508, error: 'Loop Detected' } as const,
  notExtended: { code: 510, error: 'Not Extended' } as const,
  networkAuthenticationRequired: {
    code: 511,
    error: 'Network Authentication Required'
  } as const
} as const

export const httpSuccess = {
  ok: 200,
  created: 201,
  accepted: 202,
  nonAuthoritativeInformation: 203,
  noContent: 204,
  resetContent: 205,
  partialContent: 206,
  multiStatus: 207,
  alreadyReported: 208,
  imUsed: 226
} as const
