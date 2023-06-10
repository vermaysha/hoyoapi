# Get Started

## Prerequisites

- [NodeJS](https://nodejs.org/) version 16 or higher.

## Installation

<code-group>

<code-block title="NPM">

```sh [npm]
$ npm install @vermaysha/hoyolab-api
```

</code-block>

<code-block title="YARN">

```sh [yarn]
$ yarn add @vermaysha/hoyolab-api
```

</code-block>

</code-group>

## How to get HoYoLab Cookie

1. To begin, login with your [HoYoLab](https://www.hoyolab.com/home) account or from [Genshin Battlepass](https://act.hoyolab.com/app/community-game-records-sea/index.html?bbs_presentation_style=fullscreen&bbs_auth_required=true&gid=2&user_id=122516750&utm_source=hoyolab&utm_medium=gamecard&bbs_theme=light&bbs_theme_device=1#/ys).
2. Type `java` in the address bar followed by the script down below.
3. ```javascript
   script: check =
     (document.cookie.includes('ltoken') &&
       document.cookie.includes('ltuid')) ||
     alert(
       'Please logout and log back in before trying again, cookie is currently expired/invalid!',
     )
   cookie = document.cookie
   check &&
     document.write(
       `<p>${cookie}</p><br><button onclick="navigator.clipboard.writeText('${cookie}')">Click here to copy!</button><br>`,
     )
   ```
4. Once you've successfully ran the script, click the Click here to copy! button to copy the cookie.
5. Finally, you can copy your cookie
