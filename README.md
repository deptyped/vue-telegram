## `vue-tg` - Telegram integration for Vue

A package for seamless integration of [Telegram Mini Apps](https://core.telegram.org/bots/webapps) and [Telegram Widgets](https://core.telegram.org/widgets) features.

[Documentation »](https://vue-tg.pages.dev)

### Usage Example

```vue
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

#### Global Aliases _(Optional)_

Register on Vue instance:

```ts
import VueTelegram from 'vue-tg'

Vue.use(VueTelegram)
```

After that, you can use global aliases for components

```vue
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

### Widgets

- [Official Telegram Widgets Documentation](https://core.telegram.org/widgets)
- [Widgets Documentation](https://vue-tg.pages.dev/widgets.html)

#### Components

- [ShareWidget](https://vue-tg.pages.dev/widgets.html#share-widget)
- [PostWidget](https://vue-tg.pages.dev/widgets.html#post-widget)
- [LoginWidget](https://vue-tg.pages.dev/widgets.html#login-widget)
- [DiscussionWidget](https://vue-tg.pages.dev/widgets.html#discussion-widget)

### Mini Apps

- [Official Telegram Mini Apps Documentation](https://core.telegram.org/bots/webapps#initializing-mini-apps)
- [Mini Apps Documentation](https://vue-tg.pages.dev/mini-apps.html)
- [Field Mapping](https://vue-tg.pages.dev/mini-apps.html#field-mapping)
- [Event Handling](https://vue-tg.pages.dev/mini-apps.html#event-handling)

#### Components

- [Alert](https://vue-tg.pages.dev/mini-apps.html#alert)
- [BackButton](https://vue-tg.pages.dev/mini-apps.html#backbutton)
- [BiometricManager](https://vue-tg.pages.dev/mini-apps.html#biometricmanager)
- [ClosingConfirmation](https://vue-tg.pages.dev/mini-apps.html#closingconfirmation)
- [Confirm](https://vue-tg.pages.dev/mini-apps.html#confirm)
- [ExpandedViewport](https://vue-tg.pages.dev/mini-apps.html#expandedviewport)
- [MainButton](https://vue-tg.pages.dev/mini-apps.html#mainbutton)
- [Popup](https://vue-tg.pages.dev/mini-apps.html#popup)
- [ScanQr](https://vue-tg.pages.dev/mini-apps.html#scanqr)
- [SettingsButton](https://vue-tg.pages.dev/mini-apps.html#settingsbutton)

#### Composables

- [useWebApp](https://vue-tg.pages.dev/mini-apps.html#usewebapp)
- [useWebAppBackButton](https://vue-tg.pages.dev/mini-apps.html#usewebappbackbutton)
- [useWebAppBiometricManager](https://vue-tg.pages.dev/mini-apps.html#usewebappbiometricmanager)
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
