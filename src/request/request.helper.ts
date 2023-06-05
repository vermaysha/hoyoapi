import { createHash } from 'crypto'

/**
 * Generates a dynamic secret (DS) string for use in the Genshin Impact API.
 *
 * @returns The generated DS string.
 */
export function generateDS(): string {
  const salt = '6s25p5ox5y14umn1p61aqyyvbvvl3lrt'
  const date = new Date()
  const time = Math.floor(date.getTime() / 1000)

  let random = ''
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    const randomChar = characters.charAt(randomIndex)
    random += randomChar
  }

  const hash = createHash('md5')
    .update(`salt=${salt}&t=${time}&r=${random}`)
    .digest('hex')

  return `${time},${random},${hash}`
}

/**
 * Delays the execution of the code for a specified number of seconds.
 * @param second - The number of seconds to delay.
 * @returns A Promise that resolves after the specified number of seconds.
 */
export function delay(second: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, second * 1000)
  })
}
