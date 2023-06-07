/**
 * Converts a string in snake_case format to camelCase format.
 *
 * @param str - The string to be converted.
 * @returns The converted string in camelCase format.
 */
export function toCamelCase(str: string): string {
  const words = str.split('_')

  const camelCaseWords = words.map((word, index) => {
    // If the word is the first in the array, return it as-is.
    // Otherwise, capitalize the first letter of the word and concatenate it with the rest of the word.
    return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
  })
  return camelCaseWords.join('')
}

/**
 * Converts a string in camelCase format to snake_case format.
 *
 * @param text - The string to be converted.
 * @returns The converted string in snake_case format.
 */
export function toSnakeCase(text: string): string {
  return text
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .join('_')
    .toLowerCase()
}
