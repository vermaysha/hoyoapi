import {
  HTTPBody,
  HTTPHeaders,
  HTTPQueryParams,
  HTTPResponse,
} from '../request'

export interface IHTTPError {
  response?: HTTPResponse | string
  request?: {
    body: HTTPBody
    params: HTTPQueryParams
    headers: HTTPHeaders
  }
}
