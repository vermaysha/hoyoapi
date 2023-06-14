# Honkai Star Rail

## Usage

There are several methods to instantiate an object from the HonkaiStarRail class.

The following method will instantiate an object with the provided data.

```ts
import { HonkaiStarRail, LanguageEnum } from 'hoyoapi'

const hsr = new HonkaiStarRail({
  cookie: 'YOUR COOKIE HERE', // Required. Cookie can be string or object, see the api refeence below
  lang: LanguageEnum.ENGLISH, // optional
  uid: 837_678_687, // Several modules will require UID, which if not filled in will throw an error.
})
```

Meanwhile, the method below will instantiate an object with some automatically filled data like UID, and will return a Promise.

```ts
import { HonkaiStarRail, LanguageEnum } from 'hoyoapi'

const hsr = HonkaiStarRail.create({
  cookie: 'YOUR COOKIE HERE', // Required. Cookie can be string or object, see the api refeence below
  lang: LanguageEnum.ENGLISH, // optional
})
```

Find out more reference in [Honkai Star Rail API Refence](/docs/api/classes/HonkaiStarRail)
