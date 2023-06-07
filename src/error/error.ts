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
   * Constructs a new instance of the HoyolabError class with the specified message.
   *
   * @param message The message to associate with this error.
   */
  constructor(message: string) {
    super(message)

    /**
     * The name of this error.
     */
    this.name = this.constructor.name

    /**
     * The message associated with this error.
     */
    this.message = message

    // Capture the stack trace of this error instance.
    Error.captureStackTrace(this, this.constructor)
  }
}
