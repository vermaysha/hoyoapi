# Genshin Impact

## Usage

There are several methods to instantiate an object from the GenshinImpact class.

The following method will instantiate an object with the provided data.

```ts
import { GenshinImpact, LanguageEnum } from 'hoyoapi'

const genshin = new GenshinImpact({
  cookie: 'YOUR COOKIE HERE', // Required. Cookie can be string or object, see the api refeence below
  lang: LanguageEnum.ENGLISH, // optional
  uid: 837_678_687, // Several modules will require UID, which if not filled in will throw an error.
})
```

Meanwhile, the method below will instantiate an object with some automatically filled data like UID, and will return a Promise.

```ts
import { GenshinImpact, LanguageEnum } from 'hoyoapi'

const genshin = GenshinImpact.create({
  cookie: 'YOUR COOKIE HERE', // Required. Cookie can be string or object, see the api refeence below
  lang: LanguageEnum.ENGLISH, // optional
})
```

## Game Records

```ts
import { GenshinImpact, LanguageEnum } from 'hoyoapi'

async function main() {
  const genshin = new GenshinImpact({
    cookie: 'YOUR COOKIE HERE',
    lang: LanguageEnum.ENGLISH,
  })

  // Retrieves information about the player's performance in the Spiral Abyss.
  const spiralAbyss = await genshin.record.spiralAbyss()
  console.log(spiralAbyss)

  // Retrieves the Genshin characters of the user.
  const characters = await genshin.record.characters()
  console.log(characters)

  // Get user's Genshin Impact game record
  const gameRecord = await genshin.record.records()
  console.log(gameRecord)

  const dailyNote = await genshin.record.dailyNote()
  console.log(dailyNote)
}

main()
```

## Daily Checkin

```ts
import { GenshinImpact, LanguageEnum } from 'hoyoapi'

async function main() {
  const genshin = new GenshinImpact({
    cookie: 'YOUR COOKIE HERE',
    lang: LanguageEnum.ENGLISH,
  })

  // Claim the daily rewards.
  const claim = await genshin.daily.claim()
  console.log(claim)

  // Retrieves daily information.
  const dailyInfo = await genshin.daily.info()
  console.log(dailyInfo)

  // Retrieve daily rewards information.
  const rewards = await genshin.daily.rewards()
  console.log(rewards)

  // Get the daily reward for a specific day or the current day
  const reward = await genshin.daily.reward()
  console.log(reward)
}

main()
```

## Redeem Code

```ts
import { GenshinImpact, LanguageEnum } from 'hoyoapi'

async function main() {
  const genshin = new GenshinImpact({
    cookie: 'YOUR COOKIE HERE',
    lang: LanguageEnum.ENGLISH,
  })

  const redeem = genshin.redeem.claim('GENSHINGIFT')
  console.log(redeem)
}

main()
```

Read the [Genshin Impact API Reference](/docs/api/classes/GenshinImpact)
