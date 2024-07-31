## `vue-tg` - Telegram integration for Vue 

[![docs](https://img.shields.io/badge/Documentation-gray?style=flat)](https://vue-tg.deptyped.com/)
[![version](https://img.shields.io/badge/Bot%20API-7.8-478be6?logo=telegram&style=flat)](https://core.telegram.org/bots/webapps#july-31-2024)
[![downloads](https://img.shields.io/npm/dm/vue-tg?label=Downloads&logo=npm&style=flat&color=478be6)](https://www.npmjs.com/package/vue-tg)
[![size](https://img.shields.io/bundlephobia/minzip/vue-tg?label=Size&style=flat&color=478be6)](https://bundlephobia.com/result?p=vue-tg@latest)

A lightweight package for seamless integration of [Telegram Mini Apps](https://core.telegram.org/bots/webapps) and [Telegram Widgets](https://core.telegram.org/widgets) features.

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

| Field                        | Composable                                                    |
| ---------------------------- | ------------------------------------------------------------- |
| initData                     | [useWebApp](#usewebapp)                                       |
| initDataUnsafe               | [useWebApp](#usewebapp)                                       |
| version                      | [useWebApp](#usewebapp)                                       |
| platform                     | [useWebApp](#usewebapp)                                       |
| colorScheme                  | [useWebAppTheme](#usewebapptheme)                             |
| themeParams                  | [useWebAppTheme](#usewebapptheme)                             |
| isExpanded                   | [useWebAppViewport](#usewebappviewport)                       |
| viewportHeight               | [useWebAppViewport](#usewebappviewport)                       |
| viewportStableHeight         | [useWebAppViewport](#usewebappviewport)                       |
| headerColor                  | [useWebAppTheme](#usewebapptheme)                             |
| backgroundColor              | [useWebAppTheme](#usewebapptheme)                             |
| isClosingConfirmationEnabled | [useWebAppClosingConfirmation](#usewebappclosingconfirmation) |
| isVerticalSwipesEnabled      | [useWebAppViewport](#usewebappviewport)                       |
| BackButton                   | [useWebAppBackButton](#usewebappbackbutton)                   |
| MainButton                   | [useWebAppMainButton](#usewebappmainbutton)                   |
| HapticFeedback               | [useWebAppHapticFeedback](#usewebapphapticfeedback)           |
| BiometricManager             | [useWebAppBiometricManager](#usewebappbiometricmanager)       |
| isVersionAtLeast             | [useWebApp](#usewebapp)                                       |
| setHeaderColor               | [useWebAppTheme](#usewebapptheme)                             |
| setBackgroundColor           | [useWebAppTheme](#usewebapptheme)                             |
| enableClosingConfirmation    | [useWebAppClosingConfirmation](#usewebappclosingconfirmation) |
| disableClosingConfirmation   | [useWebAppClosingConfirmation](#usewebappclosingconfirmation) |
| enableVerticalSwipes         | [useWebAppViewport](#usewebappviewport)                       |
| disableVerticalSwipes        | [useWebAppViewport](#usewebappviewport)                       |
| onEvent                      | [useWebApp](#usewebapp)                                       |
| offEvent                     | [Handled automagically 🪄](#managing-event-subscriptions)      |
| sendData                     | [useWebApp](#usewebapp)                                       |
| switchInlineQuery            | [useWebAppNavigation](#usewebappnavigation)                   |
| openLink                     | [useWebAppNavigation](#usewebappnavigation)                   |
| openTelegramLink             | [useWebAppNavigation](#usewebappnavigation)                   |
| openInvoice                  | [useWebAppNavigation](#usewebappnavigation)                   |
| shareToStory                 | [useWebAppShare](#usewebappshare)                             |
| showPopup                    | [useWebAppPopup](#usewebapppopup)                             |
| showAlert                    | [useWebAppPopup](#usewebapppopup)                             |
| showConfirm                  | [useWebAppPopup](#usewebapppopup)                             |
| showScanQrPopup              | [useWebAppQrScanner](#usewebappqrscanner)                     |
| closeScanQrPopup             | [useWebAppQrScanner](#usewebappqrscanner)                     |
| readTextFromClipboard        | [useWebAppClipboard](#usewebappclipboard)                     |
| requestWriteAccess           | [useWebAppRequests](#usewebapprequests)                       |
| requestContact               | [useWebAppRequests](#usewebapprequests)                       |
| ready                        | [useWebApp](#usewebapp)                                       |
| expand                       | [useWebAppViewport](#usewebappviewport)                       |
| close                        | [useWebApp](#usewebapp)                                       |
