## `vue-tg` - Telegram integration for Vue

A package for integration of
[Telegram Mini Apps](https://core.telegram.org/bots/webapps) feature with Vue.

[Documentation »](https://vue-tg.pages.dev)

### Usage Example

```html
<script lang="ts" setup>
  import { MainButton, useWebAppPopup } from 'vue-tg'

  const { showAlert } = useWebAppPopup()
</script>

<template>
  <MainButton text="Open alert" @click="() => showAlert('Hello!')" />
</template>
```

### Installation

To connect your Mini App to the Telegram client, place the script `telegram-web-app.js` in the `<head>` tag before any other scripts, using this code:

```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```

After that, install package:

```bash
npm i vue-tg
```

_(Optional)_ Register on Vue instance:

```ts
import VueTelegram from 'vue-tg'

Vue.use(VueTelegram)
```

After that, you can use global aliases for components

```html
<script lang="ts" setup>
  import { Alert } from 'vue-tg'
</script>

<template>
  <Alert message="Hello!" />
</template>

<!-- Same with using an alias of the component -->

<template>
  <tg-alert message="Hello!" />
</template>
```

## Documentation

- [Official Telegram Mini App Docs ↗](https://core.telegram.org/bots/webapps#initializing-mini-apps)
- [Field Mapping](https://vue-tg.pages.dev/mini-apps.html#field-mapping)
- [Event Handling](https://vue-tg.pages.dev/mini-apps.html#event-handling)

### Components

- [Alert](https://vue-tg.pages.dev/mini-apps.html#alert)
- [BackButton](https://vue-tg.pages.dev/mini-apps.html#backbutton)
- [Confirm](https://vue-tg.pages.dev/mini-apps.html#confirm)
- [MainButton](https://vue-tg.pages.dev/mini-apps.html#mainbutton)
- [Popup](https://vue-tg.pages.dev/mini-apps.html#popup)
- [ScanQr](https://vue-tg.pages.dev/mini-apps.html#scanqr)

### Composables

- [useWebApp](https://vue-tg.pages.dev/mini-apps.html#usewebapp)
- [useWebAppBackButton](https://vue-tg.pages.dev/mini-apps.html#usewebappbackbutton)
- [useWebAppClipboard](https://vue-tg.pages.dev/mini-apps.html#usewebappclipboard)
- [useWebAppClosingConfirmation](https://vue-tg.pages.dev/mini-apps.html#usewebappclosingconfirmation)
- [useWebAppCloudStorage](https://vue-tg.pages.dev/mini-apps.html#usewebappcloudstorage)
- [useWebAppHapticFeedback](https://vue-tg.pages.dev/mini-apps.html#usewebapphapticfeedback)
- [useWebAppMainButton](https://vue-tg.pages.dev/mini-apps.html#usewebappmainbutton)
- [useWebAppNavigation](https://vue-tg.pages.dev/mini-apps.html#usewebappnavigation)
- [useWebAppPopup](https://vue-tg.pages.dev/mini-apps.html#usewebapppopup)
- [useWebAppQrScanner](https://vue-tg.pages.dev/mini-apps.html#usewebappqrscanner)
- [useWebAppRequests](https://vue-tg.pages.dev/mini-apps.html#usewebapprequests)
- [useWebAppSendData](https://vue-tg.pages.dev/mini-apps.html#usewebappsenddata)
- [useWebAppSettingsButton](https://vue-tg.pages.dev/mini-apps.html#usewebappsettingsbutton)
- [useWebAppTheme](https://vue-tg.pages.dev/mini-apps.html#usewebapptheme)
- [useWebAppViewport](https://vue-tg.pages.dev/mini-apps.html#usewebappviewport)
