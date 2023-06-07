/**
 * Interface for redeeming a code in Genshin Impact.
 */
export interface IRedeemCode {
  /**
   * The data returned from redeeming the code. It can be a string or null.
   */
  data: string | null

  /**
   * A message describing the result of redeeming the code.
   */
  message: string

  /**
   * The return code from redeeming the code. A non-zero code indicates an error occurred.
   */
  retcode: number
}
