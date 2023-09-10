import { config } from 'dotenv'
import { HonkaiImpact, ICookie, LanguageEnum } from '../../src'
config()

export const cookie: ICookie = {
  accountId: parseInt(process.env.ACCOUNT_ID ?? '0'),
  cookieToken: process.env.COOKIE_TOKEN,
  ltokenV2: process.env.LTOKEN_V2 ?? '',
  ltuidV2: parseInt(process.env.LTUID_V2 ?? '0'),
  cookieTokenV2: process.env.COOKIE_TOKEN_V2 ?? '',
  accountIdV2: parseInt(process.env.ACCOUNT_ID_V2 ?? '0'),
  accountMidV2: process.env.ACCOUNT_MID_V2,
}

export const honkaiImpact = async () => {
  return await HonkaiImpact.create({
    cookie,
    lang: LanguageEnum.ENGLISH,
    uid: parseInt(process.env.HI_UID ?? '0'),
  })
}
