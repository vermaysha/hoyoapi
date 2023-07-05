import { config } from 'dotenv'
import { GenshinImpact, ICookie, LanguageEnum } from '../../src'
config()

export const cookie: ICookie = {
  accountId: parseInt(process.env.ACCOUNT_ID ?? '0'),
  cookieToken: process.env.COOKIE_TOKEN,
  ltoken: process.env.LTOKEN ?? '',
  ltuid: parseInt(process.env.LTUID ?? '0'),
  cookieTokenV2: process.env.COOKIE_TOKEN_V2 ?? '',
  accountIdV2: parseInt(process.env.ACCOUNT_ID_V2 ?? '0'),
  accountMidV2: process.env.ACCOUNT_MID_V2,
}

export const genshin = async () => {
  return await GenshinImpact.create({
    cookie,
    lang: LanguageEnum.ENGLISH,
    uid: parseInt(process.env.GI_UID ?? '0'),
  })
}
