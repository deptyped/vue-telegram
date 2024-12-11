## `vue-tg` - Telegram integration for Vue

[![docs](https://img.shields.io/badge/Documentation-gray?style=flat)](https://vue-tg.deptyped.com/)
[![version](https://img.shields.io/badge/Bot%20API-7.8-478be6?logo=telegram&style=flat)](https://core.telegram.org/bots/webapps#july-31-2024)
[![downloads](https://img.shields.io/npm/dm/vue-tg?label=Downloads&logo=npm&style=flat&color=478be6)](https://www.npmjs.com/package/vue-tg)
[![size](https://img.shields.io/bundlephobia/minzip/vue-tg?label=Size&style=flat&color=478be6)](https://bundlephobia.com/result?p=vue-tg@latest)

A lightweight package for seamless integration of [Telegram Mini Apps](https://core.telegram.org/bots/webapps) and [Telegram Widgets](https://core.telegram.org/widgets) features.

### Usage Example

```vue
<template>
  <MainButton text="Open alert" @click="() => showAlert('Hello!')" />
</template>

<script lang="ts" setup>
import { MainButton, useWebAppPopup } from 'vue-tg'

const { showAlert } = useWebAppPopup()
</script>
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

- [Global Aliases](https://vue-tg.deptyped.com/installation.html#global-aliases)
- [Using with Nuxt 3](https://vue-tg.deptyped.com/installation.html#using-with-nuxt-3)

### Widgets

- [Official Telegram Widgets Documentation](https://core.telegram.org/widgets)
- [Widgets Documentation](https://vue-tg.deptyped.com/widgets.html)

#### Components

- [ShareWidget](https://vue-tg.deptyped.com/widgets.html#share-widget)
- [PostWidget](https://vue-tg.deptyped.com/widgets.html#post-widget)
- [LoginWidget](https://vue-tg.deptyped.com/widgets.html#login-widget)
- [DiscussionWidget](https://vue-tg.deptyped.com/widgets.html#discussion-widget)

### Mini Apps

- [Official Telegram Mini Apps Documentation](https://core.telegram.org/bots/webapps#initializing-mini-apps)
- [Mini Apps Documentation](https://vue-tg.deptyped.com/mini-apps.html)
- [Field Mapping](https://vue-tg.deptyped.com/mini-apps.html#field-mapping)
- [Event Handling](https://vue-tg.deptyped.com/mini-apps.html#event-handling)

#### Components

- [Alert](https://vue-tg.deptyped.com/mini-apps.html#alert)
- [BackButton](https://vue-tg.deptyped.com/mini-apps.html#backbutton)
- [BiometricManager](https://vue-tg.deptyped.com/mini-apps.html#biometricmanager)
- [ClosingConfirmation](https://vue-tg.deptyped.com/mini-apps.html#closingconfirmation)
- [Confirm](https://vue-tg.deptyped.com/mini-apps.html#confirm)
- [ExpandedViewport](https://vue-tg.deptyped.com/mini-apps.html#expandedviewport)
- [MainButton](https://vue-tg.deptyped.com/mini-apps.html#mainbutton)
- [Popup](https://vue-tg.deptyped.com/mini-apps.html#popup)
- [ScanQr](https://vue-tg.deptyped.com/mini-apps.html#scanqr)
- [SettingsButton](https://vue-tg.deptyped.com/mini-apps.html#settingsbutton)

#### Mapping

| Field                        | Composable                                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- |
| initData                     | [useWebApp](https://vue-tg.deptyped.com/mini-apps.html#usewebapp)                                       |
| initDataUnsafe               | [useWebApp](https://vue-tg.deptyped.com/mini-apps.html#usewebapp)                                       |
| version                      | [useWebApp](https://vue-tg.deptyped.com/mini-apps.html#usewebapp)                                       |
| platform                     | [useWebApp](https://vue-tg.deptyped.com/mini-apps.html#usewebapp)                                       |
| colorScheme                  | [useWebAppTheme](https://vue-tg.deptyped.com/mini-apps.html#usewebapptheme)                             |
| themeParams                  | [useWebAppTheme](https://vue-tg.deptyped.com/mini-apps.html#usewebapptheme)                             |
| isExpanded                   | [useWebAppViewport](https://vue-tg.deptyped.com/mini-apps.html#usewebappviewport)                       |
| viewportHeight               | [useWebAppViewport](https://vue-tg.deptyped.com/mini-apps.html#usewebappviewport)                       |
| viewportStableHeight         | [useWebAppViewport](https://vue-tg.deptyped.com/mini-apps.html#usewebappviewport)                       |
| headerColor                  | [useWebAppTheme](https://vue-tg.deptyped.com/mini-apps.html#usewebapptheme)                             |
| backgroundColor              | [useWebAppTheme](https://vue-tg.deptyped.com/mini-apps.html#usewebapptheme)                             |
| isClosingConfirmationEnabled | [useWebAppClosingConfirmation](https://vue-tg.deptyped.com/mini-apps.html#usewebappclosingconfirmation) |
| isVerticalSwipesEnabled      | [useWebAppViewport](https://vue-tg.deptyped.com/mini-apps.html#usewebappviewport)                       |
| BackButton                   | [useWebAppBackButton](https://vue-tg.deptyped.com/mini-apps.html#usewebappbackbutton)                   |
| MainButton                   | [useWebAppMainButton](https://vue-tg.deptyped.com/mini-apps.html#usewebappmainbutton)                   |
| HapticFeedback               | [useWebAppHapticFeedback](https://vue-tg.deptyped.com/mini-apps.html#usewebapphapticfeedback)           |
| BiometricManager             | [useWebAppBiometricManager](https://vue-tg.deptyped.com/mini-apps.html#usewebappbiometricmanager)       |
| isVersionAtLeast             | [useWebApp](https://vue-tg.deptyped.com/mini-apps.html#usewebapp)                                       |
| setHeaderColor               | [useWebAppTheme](https://vue-tg.deptyped.com/mini-apps.html#usewebapptheme)                             |
| setBackgroundColor           | [useWebAppTheme](https://vue-tg.deptyped.com/mini-apps.html#usewebapptheme)                             |
| enableClosingConfirmation    | [useWebAppClosingConfirmation](https://vue-tg.deptyped.com/mini-apps.html#usewebappclosingconfirmation) |
| disableClosingConfirmation   | [useWebAppClosingConfirmation](https://vue-tg.deptyped.com/mini-apps.html#usewebappclosingconfirmation) |
| enableVerticalSwipes         | [useWebAppViewport](https://vue-tg.deptyped.com/mini-apps.html#usewebappviewport)                       |
| disableVerticalSwipes        | [useWebAppViewport](https://vue-tg.deptyped.com/mini-apps.html#usewebappviewport)                       |
| onEvent                      | [useWebApp](https://vue-tg.deptyped.com/mini-apps.html#usewebapp)                                       |
| offEvent                     | [Handled automagically 🪄](https://vue-tg.deptyped.com/mini-apps.html#managing-event-subscriptions)      |
| sendData                     | [useWebApp](https://vue-tg.deptyped.com/mini-apps.html#usewebapp)                                       |
| switchInlineQuery            | [useWebAppNavigation](https://vue-tg.deptyped.com/mini-apps.html#usewebappnavigation)                   |
| openLink                     | [useWebAppNavigation](https://vue-tg.deptyped.com/mini-apps.html#usewebappnavigation)                   |
| openTelegramLink             | [useWebAppNavigation](https://vue-tg.deptyped.com/mini-apps.html#usewebappnavigation)                   |
| openInvoice                  | [useWebAppNavigation](https://vue-tg.deptyped.com/mini-apps.html#usewebappnavigation)                   |
| shareToStory                 | [useWebAppShare](https://vue-tg.deptyped.com/mini-apps.html#usewebappshare)                             |
| showPopup                    | [useWebAppPopup](https://vue-tg.deptyped.com/mini-apps.html#usewebapppopup)                             |
| showAlert                    | [useWebAppPopup](https://vue-tg.deptyped.com/mini-apps.html#usewebapppopup)                             |
| showConfirm                  | [useWebAppPopup](https://vue-tg.deptyped.com/mini-apps.html#usewebapppopup)                             |
| showScanQrPopup              | [useWebAppQrScanner](https://vue-tg.deptyped.com/mini-apps.html#usewebappqrscanner)                     |
| closeScanQrPopup             | [useWebAppQrScanner](https://vue-tg.deptyped.com/mini-apps.html#usewebappqrscanner)                     |
| readTextFromClipboard        | [useWebAppClipboard](https://vue-tg.deptyped.com/mini-apps.html#usewebappclipboard)                     |
| requestWriteAccess           | [useWebAppRequests](https://vue-tg.deptyped.com/mini-apps.html#usewebapprequests)                       |
| requestContact               | [useWebAppRequests](https://vue-tg.deptyped.com/mini-apps.html#usewebapprequests)                       |
| ready                        | [useWebApp](https://vue-tg.deptyped.com/mini-apps.html#usewebapp)                                       |
| expand                       | [useWebAppViewport](https://vue-tg.deptyped.com/mini-apps.html#usewebappviewport)                       |
| close                        | [useWebApp](https://vue-tg.deptyped.com/mini-apps.html#usewebapp)                                       |
