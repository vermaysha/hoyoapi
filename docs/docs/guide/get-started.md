# Get Started

## Prerequisites

- [NodeJS](https://nodejs.org/) version 16 or higher.

## Installation

<code-group>

<code-block title="NPM">

```sh [npm]
$ npm install hoyoapi
```

</code-block>

<code-block title="YARN">

```sh [yarn]
$ yarn add hoyoapi
```

</code-block>

</code-group>

## How to get HoYoLab Cookie

1. To begin, login with your [HoYoLab](https://www.hoyolab.com/home) account or from [Genshin Battlepass](https://act.hoyolab.com/app/community-game-records-sea/index.html?bbs_presentation_style=fullscreen&bbs_auth_required=true&gid=2&user_id=122516750&utm_source=hoyolab&utm_medium=gamecard&bbs_theme=light&bbs_theme_device=1#/ys).
2. Type `java` in the address bar followed by the script down below.
3. ```javascript
   script: (function() {
     if (document.cookie.includes('ltoken') && document.cookie.includes('ltuid')) {
       const input = document.createElement('input');
       input.value = document.cookie;
       document.body.appendChild(input);
       input.focus();
       input.select();
       var result = document.execCommand('copy');
       document.body.removeChild(input);
       if (result) {
         alert('HoYoLAB cookie copied to clipboard');
       } else {
         prompt('Failed to copy cookie. Manually copy the cookie below:\n\n', input.value);
       }
     } else {
       alert('Please logout and log back in. Cookie is expired/invalid!');
     }
   })();
   ```
4. Once you've successfully ran the script, click the Click here to copy! button to copy the cookie.
5. Finally, you can copy your cookie
