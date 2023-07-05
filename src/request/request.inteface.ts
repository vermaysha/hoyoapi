/**
 * Represents the interface for a response from the server.
 */
export interface HTTPServerResponse {
  response: HTTPResponse
  status: {
    code: number
    message?: string
  }
  headers: HTTPHeaders
  body: HTTPBody
  params: HTTPQueryParams
}

export interface HTTPResponse {
  /**
   * The status code of the response.
   */
  retcode: number

  /**
   * A message associated with the response.
   */
  message: string

  /**
   * The data returned by the server.
   */
  data: unknown
}

/**
 * Represents the base type that can be used for properties in a request body,
 * request header, or request parameter.
 */
export interface Dict<T> {
  [key: string]: T | undefined
}

/**
 * Represents the type that can be used for the parameters of a request.
 */
export type HTTPQueryParams = Dict<string | number | string[] | null>

/**
 * Represents the type that can be used for the headers of a request.
 */
export type HTTPHeaders = Dict<number | string | string[]>

/**
 * Represents the type that can be used for the body of a request.
 */
export type HTTPBody = Dict<number | number[] | string | string[] | null>
