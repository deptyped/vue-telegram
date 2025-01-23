## `vue-tg` - Telegram integration for Vue

[![docs](https://img.shields.io/badge/Documentation-gray?style=flat)](https://vue-tg.deptyped.com/)
[![version](https://img.shields.io/badge/Bot%20API-8.0-478be6?logo=telegram&style=flat)](https://core.telegram.org/bots/webapps#november-17-2024)
[![downloads](https://img.shields.io/npm/dm/vue-tg?label=Downloads&logo=npm&style=flat&color=478be6)](https://www.npmjs.com/package/vue-tg)
[![size](https://img.shields.io/bundlephobia/minzip/vue-tg?label=Size&style=flat&color=478be6)](https://bundlephobia.com/result?p=vue-tg@latest)

A lightweight package for seamless integration of [Telegram Mini Apps](https://core.telegram.org/bots/webapps) and [Telegram Widgets](https://core.telegram.org/widgets) features.

### Usage Example

```vue
<template>
  <MainButton text="Open alert" @click="() => showAlert('Hello!')" />
</template>

<script lang="ts" setup>
import { MainButton, usePopup } from 'vue-tg/latest'

const { showAlert } = usePopup()
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
| initData                     | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| initDataUnsafe               | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| version                      | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| platform                     | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| colorScheme                  | [useTheme](https://vue-tg.deptyped.com/mini-apps.html#usetheme)                                         |
| themeParams                  | [useTheme](https://vue-tg.deptyped.com/mini-apps.html#usetheme)                                         |
| isActive                     | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| isExpanded                   | [useViewport](https://vue-tg.deptyped.com/mini-apps.html#useviewport)                                   |
| viewportHeight               | [useViewport](https://vue-tg.deptyped.com/mini-apps.html#useviewport)                                   |
| viewportStableHeight         | [useViewport](https://vue-tg.deptyped.com/mini-apps.html#useviewport)                                   |
| headerColor                  | [useTheme](https://vue-tg.deptyped.com/mini-apps.html#usetheme)                                         |
| backgroundColor              | [useTheme](https://vue-tg.deptyped.com/mini-apps.html#usetheme)                                         |
| isClosingConfirmationEnabled | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| isVerticalSwipesEnabled      | [useViewport](https://vue-tg.deptyped.com/mini-apps.html#useviewport)                                   |
| isFullscreen                 | [useViewport](https://vue-tg.deptyped.com/mini-apps.html#useviewport)                                   |
| isOrientationLocked          | [useViewport](https://vue-tg.deptyped.com/mini-apps.html#useviewport)                                   |
| safeAreaInset                | [useViewport](https://vue-tg.deptyped.com/mini-apps.html#useviewport)                                   |
| contentSafeAreaInset         | [useViewport](https://vue-tg.deptyped.com/mini-apps.html#useviewport)                                   |
| BackButton                   | [useBackButton](https://vue-tg.deptyped.com/mini-apps.html#usebackbutton)                               |
| MainButton                   | [useMainButton](https://vue-tg.deptyped.com/mini-apps.html#usemainbutton)                               |
| HapticFeedback               | [useHapticFeedback](https://vue-tg.deptyped.com/mini-apps.html#usehapticfeedback)                       |
| BiometricManager             | [useBiometricManager](https://vue-tg.deptyped.com/mini-apps.html#usebiometricmanager)                   |
| Accelerometer                | [useAccelerometer](https://vue-tg.deptyped.com/mini-apps.html#useaccelerometer)                         |
| DeviceOrientation            | [useDeviceOrientation](https://vue-tg.deptyped.com/mini-apps.html#usedeviceorientation)                 |
| Gyroscope                    | [useGyroscope](https://vue-tg.deptyped.com/mini-apps.html#usegyroscope)                                 |
| LocationManager              | [useLocationManager](https://vue-tg.deptyped.com/mini-apps.html#uselocationmanager)                     |
| isVersionAtLeast             | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| setHeaderColor               | [useTheme](https://vue-tg.deptyped.com/mini-apps.html#usetheme)                                         |
| setBackgroundColor           | [useTheme](https://vue-tg.deptyped.com/mini-apps.html#usetheme)                                         |
| setBottomBarColor            | [useTheme](https://vue-tg.deptyped.com/mini-apps.html#usetheme)                                         |
| enableClosingConfirmation    | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| disableClosingConfirmation   | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| enableVerticalSwipes         | [useViewport](https://vue-tg.deptyped.com/mini-apps.html#useviewport)                                   |
| disableVerticalSwipes        | [useViewport](https://vue-tg.deptyped.com/mini-apps.html#useviewport)                                   |
| requestFullscreen            | [useViewport](https://vue-tg.deptyped.com/mini-apps.html#useviewport)                                   |
| exitFullscreen               | [useViewport](https://vue-tg.deptyped.com/mini-apps.html#useviewport)                                   |
| lockOrientation              | [useViewport](https://vue-tg.deptyped.com/mini-apps.html#useviewport)                                   |
| unlockOrientation            | [useViewport](https://vue-tg.deptyped.com/mini-apps.html#useviewport)                                   |
| addToHomeScreen              | [useHomeScreen](https://vue-tg.deptyped.com/mini-apps.html#usehomescreen)                               |
| checkHomeScreenStatus        | [useHomeScreen](https://vue-tg.deptyped.com/mini-apps.html#usehomescreen)                               |
| onEvent                      | [Event Handling](https://vue-tg.deptyped.com/mini-apps.html#event-handling)                             |
| offEvent                     | [Managing Event Subscriptions](https://vue-tg.deptyped.com/mini-apps.html#managing-event-subscriptions) |
| sendData                     | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| switchInlineQuery            | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| openLink                     | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| openTelegramLink             | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| openInvoice                  | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| shareToStory                 | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| shareMessage                 | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| setEmojiStatus               | [useEmojiStatus](https://vue-tg.deptyped.com/mini-apps.html#useemojistatus)                             |
| requestEmojiStatusAccess     | [useEmojiStatus](https://vue-tg.deptyped.com/mini-apps.html#useemojistatus)                             |
| downloadFile                 | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| showPopup                    | [usePopup](https://vue-tg.deptyped.com/mini-apps.html#usepopup)                                         |
| showAlert                    | [usePopup](https://vue-tg.deptyped.com/mini-apps.html#usepopup)                                         |
| showConfirm                  | [usePopup](https://vue-tg.deptyped.com/mini-apps.html#usepopup)                                         |
| showScanQrPopup              | [useQrScanner](https://vue-tg.deptyped.com/mini-apps.html#useqrscanner)                                 |
| closeScanQrPopup             | [useQrScanner](https://vue-tg.deptyped.com/mini-apps.html#useqrscanner)                                 |
| readTextFromClipboard        | [useClipboard](https://vue-tg.deptyped.com/mini-apps.html#useclipboard)                                 |
| requestWriteAccess           | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| requestContact               | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| ready                        | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
| expand                       | [useViewport](https://vue-tg.deptyped.com/mini-apps.html#useviewport)                                   |
| close                        | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
