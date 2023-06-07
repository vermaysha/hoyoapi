import type { IncomingMessage, RequestOptions } from 'http'
import { request } from 'https'
import { brotliDecompressSync, gunzipSync, inflateSync } from 'zlib'
import type {
  HTTPBody,
  HTTPHeaders,
  HTTPOptions,
  HTTPQueryParams,
  HTTPResponse,
  HTTPServerResponse,
} from './request.inteface'
import { HoyoAPIError } from '../error'
import { delay, generateDS } from './request.helper'

/**
 * Class for handling HTTP requests with customizable headers, body, and parameters.
 *
 * @class
 * @internal
 * @category Internal
 */
export class HTTPRequest {
  /**
   * Query parameters for the request.
   */
  private params: HTTPQueryParams = {}

  /**
   * Body of the request.
   */
  private body: HTTPBody = {}

  /*
   * Headers for the request.
   */
  private headers: HTTPHeaders = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br',
    'sec-ch-ua':
      '"Chromium";v="112", "Microsoft Edge";v="112", "Not:A-Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36 Edg/112.0.1722.46',
    'x-rpc-app_version': '1.5.0',
    'x-rpc-client_type': '5',
    'x-rpc-language': 'en-us',
  }

  /**
   * Flag indicating whether Dynamic Security is used.
   */
  private ds = false

  /**
   * The number of request attempts made.
   */
  private retries = 1

  constructor(options?: HTTPOptions) {
    if (options?.cookie) {
      this.headers.Cookie = options.cookie
    }
  }

  /**
   * Sets search parameters or query parameter.
   *
   * @param params - An object of query parameter to be set.
   * @returns Returns this Request object.
   */
  setQueryParams(params: HTTPQueryParams) {
    this.params = { ...this.params, ...params }
    return this
  }

  /**
   * Set Body Parameter
   *
   * @param body - RequestBodyType as object containing the body parameters.
   * @returns This instance of Request object.
   */
  setBody(data: HTTPBody) {
    this.body = { ...this.body, ...data }
    return this
  }

  /**
   * Set Referer Headers
   *
   * @param url - The URL string of referer
   * @returns The updated Request instance.
   */
  setReferer(url: string | URL) {
    this.headers.Referer = url.toString()
    this.headers.Origin = url.toString()
    return this
  }

  /**
   * Set Language
   *
   * @param lang Language Language that used for return of API (default: Language.ENGLISH).
   * @returns {this}
   */
  setLang(lang: string): this {
    this.headers['x-rpc-language'] = lang

    return this
  }

  /**
   * Set to used Dynamic Security or not
   *
   * @param flag boolean Flag indicating whether to use dynamic security or not (default: true).
   * @returns {this} The current Request instance.
   */
  setDs(flag = true): this {
    this.ds = flag
    return this
  }

  /**
   * Send the HTTP request.
   *
   * @param url - The URL to send the request to.
   * @param method - The HTTP method to use. Defaults to 'GET'.
   * @returns A Promise that resolves with the response data, or rejects with a HoyoAPIError if an error occurs.
   * @throws {HoyoAPIError} if an error occurs rejects with a HoyoAPIError
   */
  async send(
    url: string,
    method: 'GET' | 'POST' = 'GET',
  ): Promise<HTTPResponse> {
    // Internal NodeJS Fetch
    const fetch = (url: string, method: string) => {
      return new Promise<HTTPServerResponse>((resolve, reject) => {
        const hostname = new URL(url)
        const queryParams = new URLSearchParams(hostname.searchParams)

        Object.keys(this.params).forEach((val) => {
          queryParams.append(val, this.params[val]?.toString() ?? '')
        })

        hostname.search = queryParams.toString()

        const options: RequestOptions = {
          method,
          headers: this.headers,
        }

        const client = request(hostname, options, (res: IncomingMessage) => {
          const stream: Buffer[] = []

          res.on('data', (chunk: Buffer) => {
            stream.push(chunk)
          })

          res.on('end', () => {
            let buffer = Buffer.concat(stream)

            // Handling content compression
            const encoding = res.headers['content-encoding']
            if (encoding === 'gzip') {
              buffer = gunzipSync(buffer)
            } else if (encoding === 'deflate') {
              buffer = inflateSync(buffer)
            } else if (encoding === 'br') {
              buffer = brotliDecompressSync(buffer)
            }

            // Parse to UTF-8
            const responseString = buffer.toString('utf8')

            let response: any
            // Parse body to JSON
            if (res.headers['content-type'] === 'application/json') {
              response = JSON.parse(responseString)
            } else {
              return reject({
                error: 'Response Content-Type is not application/json',
              })
            }

            resolve({
              response: {
                data: response?.data ?? null,
                message: response?.message ?? '',
                retcode: response?.retcode ?? -1,
              },
              status: {
                code: res.statusCode ?? -1,
                message: res.statusMessage,
              },
              headers: res.headers,
            })
          })

          res.on('error', (err: Error) => {
            reject(new HoyoAPIError(err.message))
          })
        })

        if (method === 'POST') {
          client.write(JSON.stringify(this.body))
        }

        client.end()

        this.body = {}
        this.params = {}
      })
    }

    if (this.ds) {
      this.headers.DS = generateDS()
    }

    const req = await fetch(url, method)

    const result = req.response

    if ([200, 201].includes(req.status.code) === false) {
      throw new HoyoAPIError(req.status.message ?? result.message)
    }

    if (result.retcode === -2016 && this.retries <= 60) {
      this.retries++
      await delay(1)
      return this.send(url, method)
    }

    this.retries = 1
    this.body = {}
    this.params = {}
    return result
  }
}
