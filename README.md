## `vue-tg` - Telegram integration for Vue 

[![docs](https://img.shields.io/badge/Documentation-gray?style=flat)](https://vue-tg.pages.dev/)
[![version](https://img.shields.io/badge/Bot%20API-7.2-478be6?logo=telegram&style=flat)](https://core.telegram.org/bots/webapps#march-31-2024)
[![downloads](https://img.shields.io/npm/dm/vue-tg?label=Downloads&logo=npm&style=flat&color=478be6)](https://www.npmjs.com/package/vue-tg)

A package for seamless integration of [Telegram Mini Apps](https://core.telegram.org/bots/webapps) and [Telegram Widgets](https://core.telegram.org/widgets) features.

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

Install package:

```bash
npm i vue-tg
```

To connect your Mini App to the Telegram client, place the script `telegram-web-app.js` in the `<head>` tag before any other scripts, using this code:

```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```

## Documentation

### Instructions

- [Global Aliases](https://vue-tg.pages.dev/installation.html#global-aliases)
- [Using with Nuxt 3](https://vue-tg.pages.dev/installation.html#using-with-nuxt-3)

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
