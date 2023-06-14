# HoYoLab

## Usage

```ts
import { Hoyolab, LanguageEnum } from 'hoyoapi'

const hoyolab = new Hoyolab({
  cookie: 'YOUR COOKIE HERE',
  lang: LanguageEnum.ENGLISH,
})
```

## Retrive Games Accounts

```ts
import { GamesEnum, Hoyolab, LanguageEnum } from 'hoyoapi'

async function main() {
  const hoyolab = new Hoyolab({
    cookie: 'YOUR COOKIE HERE',
    lang: LanguageEnum.ENGLISH,
  })

  // Fetch all user game accounts from all servers
  const games = hoyolab.gamesList()
  console.log(games)

  // Fetch one game account that has the highest level from all servers
  const genshinAccount = hoyolab.gamesList(GamesEnum.GENSHIN_IMPACT)
  console.log(genshinAccount)
}

main()
```

Find out more reference in [Genshin Impact API Refence](/docs/api/classes/GenshinImpact)
