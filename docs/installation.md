---
outline: deep
next: 'test'
---

# Installation

To connect your Mini App to the Telegram client, place the script `telegram-web-app.js` in the `<head>` tag before any other scripts, using this code:

```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```

After that, install package:

```bash
npm i vue-tg
```

Done!

[Mini Apps Documentation](/mini-apps)

## Global Aliases _(Optional)_

Register on Vue instance:

```ts
import VueTelegram from 'vue-tg'

Vue.use(VueTelegram)
```

After that, you can use global aliases for components:

```html
<!-- Without alias -->

<script lang="ts" setup>
  import { Alert } from 'vue-tg'
</script>

<template>
  <Alert message="Hello!" />
</template>

<!-- Same using an alias of the component -->

<template>
  <tg-alert message="Hello!" />
</template>
```
