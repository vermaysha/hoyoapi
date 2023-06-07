/**
 * Represents a set of available languages as an enumerated type.
 */
export enum LanguageEnum {
  /**
   * Simplified Chinese language code.
   */
  SIMPLIFIED_CHINESE = 'zh-cn',

  /**
   * Traditional Chinese language code.
   */
  TRADIIONAL_CHINESE = 'zh-tw',

  /**
   * German language code.
   */
  GERMAN = 'de-de',

  /**
   * English language code.
   */
  ENGLISH = 'en-us',

  /**
   * Spanish language code.
   */
  SPANISH = 'es-es',

  /**
   * French language code.
   */
  FRENCH = 'fr-fr',

  /**
   * Indonesian language code.
   */
  INDONESIAN = 'id-id',

  /**
   * Italian language code.
   */
  ITALIAN = 'it-it',

  /**
   * Japanese language code.
   */
  JAPANESE = 'ja-jp',

  /**
   * Korean language code.
   */
  KOREAN = 'ko-kr',

  /**
   * Portuguese language code.
   */
  PORTUGUESE = 'pt-pt',

  /**
   * Russian language code.
   */
  RUSSIAN = 'ru-ru',

  /**
   * Thai language code.
   */
  THAI = 'th-th',

  /**
   * Turkish language code.
   */
  TURKISH = 'tr-tr',

  /**
   * Vietnamese language code.
   */
  VIETNAMESE = 'vi-vn',
}

export type LangKeyType = keyof typeof LanguageEnum
