import { IHTTPError } from './error.inteface'

/**
 * Represents an error that can be thrown during interactions with the Hoyolab API.
 *
 * @class
 * @category Main
 */
export class HoyoAPIError extends Error {
  /**
   * The name of this error.
   */
  public readonly name: string

  /**
   * The message associated with this error.
   */
  public readonly message: string

  /**
   * The HTTP object
   */
  public readonly http?: IHTTPError

  /**
   * The error code
   */
  public readonly code?: number

  /**
   * Constructs a new instance of the HoyolabError class with the specified message.
   *
   * @param message The message to associate with this error.
   */
  constructor(message: string, code?: number, http?: IHTTPError) {
    super(message)

    /**
     * The name of this error.
     */
    this.name = this.constructor.name

    /**
     * The message associated with this error.
     */
    this.message = message

    this.code = code

    this.http = http

    // Capture the stack trace of this error instance.
    Error.captureStackTrace(this, this.constructor)
  }
}
