## `vue-tg` - Telegram integration for Vue

[![docs](https://img.shields.io/badge/Documentation-gray?style=flat)](https://vue-tg.deptyped.com/)
[![version](https://img.shields.io/badge/Bot%20API-9.1-478be6?logo=telegram&style=flat)](https://core.telegram.org/bots/webapps#july-3-2025)
[![downloads](https://img.shields.io/npm/dm/vue-tg?label=Downloads&logo=npm&style=flat&color=478be6)](https://www.npmjs.com/package/vue-tg)

A lightweight package for seamless integration of [Telegram Mini Apps](https://core.telegram.org/bots/webapps) and [Telegram Widgets](https://core.telegram.org/widgets) features.

### Usage Example

```vue
<template>
  <MainButton text="Open alert" @click="() => popup.showAlert('Hello!')" />
</template>

<script lang="ts" setup>
import { MainButton } from 'vue-tg'
import { usePopup } from 'vue-tg/latest'

const popup = usePopup()
</script>
```

### Installation

Install package:

```bash
npm i vue-tg@beta
```

To connect your Mini App to the Telegram client, place the script `telegram-web-app.js` in the `<head>` tag before any other scripts, using this code:

```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```

- [Documentation](https://vue-tg.deptyped.com/mini-apps.html)
- [Field Mapping](https://vue-tg.deptyped.com/mini-apps.html#field-mapping)
- [Event Handling](https://vue-tg.deptyped.com/mini-apps.html#event-handling)

## Features

### Type Safety

In addition to static typing, the library enforces runtime feature support checks to prevent errors on clients with outdated Bot API support.

```ts
const deviceStorage = useDeviceStorage()

// ❌ Type error:
// 'getItem' may not be available — DeviceStorage was introduced in Bot API 9.0
deviceStorage.getItem('token')

if (deviceStorage.isVersionAtLeast('9.0')) {
  // ✅ Safe to use
  deviceStorage.getItem('token')
}
```

You can opt out of these checks or define a minimum required Bot API version, which disables warnings for features introduced up to that version. For details, see [the versioning section in the documentation](https://vue-tg.deptyped.com/mini-apps.html#version-check).

### Reactivity

You can react to changes using the standard Vue reactivity pattern:

```ts
const miniApp = useMiniApp()

watch(miniApp.isActive, (isActive) => {
  if (isActive)
    startUpdating()
  else
    stopUpdating()
})
```

The `isActive` field is reactive, so it can be used in `watch`, `computed`, or any other reactive context.

In [the documentation](https://vue-tg.deptyped.com/mini-apps.html), all reactive fields are marked with **reactive** tag.

### Async Support

You can use `async`/`await` to work with methods — no need to nest callbacks.

```ts
const miniApp = useMiniApp()
const qrScanner = useQrScanner()
const popup = usePopup()

// Old callback-style flow
qrScanner.show({ text: 'Scan URL' }, (url) => {
  popup.showConfirm(`Open ${url}?`, (ok) => {
    if (ok) {
      miniApp.openLink(url)
    }
  })
})

// The modern way — flat and readable
const url = await qrScanner.show({ text: 'Scan URL' })
const ok = await popup.showConfirm(`Open ${url}?`)
if (ok) {
  miniApp.openLink(url)
}
```

Methods that support async execution are marked with **async** tag in [the documentation](https://vue-tg.deptyped.com/mini-apps.html).
Callback-style usage is still available for compatibility.

### Components

Available components:

- [Alert](https://vue-tg.deptyped.com/mini-apps.html#alert)
- [BackButton](https://vue-tg.deptyped.com/mini-apps.html#backbutton)
- [BiometricManager](https://vue-tg.deptyped.com/mini-apps.html#biometricmanager)
- [ClosingConfirmation](https://vue-tg.deptyped.com/mini-apps.html#closingconfirmation)
- [Confirm](https://vue-tg.deptyped.com/mini-apps.html#confirm)
- [ExpandedViewport](https://vue-tg.deptyped.com/mini-apps.html#expandedviewport)
- [FullscreenViewport](https://vue-tg.deptyped.com/mini-apps.html#fullscreenviewport)
- [MainButton](https://vue-tg.deptyped.com/mini-apps.html#mainbutton)
- [Popup](https://vue-tg.deptyped.com/mini-apps.html#popup)
- [ScanQr](https://vue-tg.deptyped.com/mini-apps.html#scanqr)
- [SecondaryButton](https://vue-tg.deptyped.com/mini-apps.html#secondarybutton)
- [SettingsButton](https://vue-tg.deptyped.com/mini-apps.html#settingsbutton)

### Widgets

- [Share Widget](https://vue-tg.deptyped.com/widgets#share-widget)
- [Post Widget](https://vue-tg.deptyped.com/widgets#post-widget)
- [Login Widget](https://vue-tg.deptyped.com/widgets#login-widget)
- [Discussion Widget](https://vue-tg.deptyped.com/widgets#discussion-widget)

## Documentation

### Instructions

- [Global Registration of Components](https://vue-tg.deptyped.com/installation.html#global-aliases)
- [Using with Nuxt 3](https://vue-tg.deptyped.com/installation.html#using-with-nuxt-3)

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
| SecondaryButton              | [useSecondaryButton](https://vue-tg.deptyped.com/mini-apps.html#usesecondarybutton)                     |
| SettingsButton               | [useSettingsButton](https://vue-tg.deptyped.com/mini-apps.html#usesettingsbutton)                       |
| HapticFeedback               | [useHapticFeedback](https://vue-tg.deptyped.com/mini-apps.html#usehapticfeedback)                       |
| CloudStorage                 | [useCloudStorage](https://vue-tg.deptyped.com/mini-apps.html#usecloudstorage)                           |
| BiometricManager             | [useBiometricManager](https://vue-tg.deptyped.com/mini-apps.html#usebiometricmanager)                   |
| Accelerometer                | [useAccelerometer](https://vue-tg.deptyped.com/mini-apps.html#useaccelerometer)                         |
| DeviceOrientation            | [useDeviceOrientation](https://vue-tg.deptyped.com/mini-apps.html#usedeviceorientation)                 |
| Gyroscope                    | [useGyroscope](https://vue-tg.deptyped.com/mini-apps.html#usegyroscope)                                 |
| LocationManager              | [useLocationManager](https://vue-tg.deptyped.com/mini-apps.html#uselocationmanager)                     |
| DeviceStorage                | [useDeviceStorage](https://vue-tg.deptyped.com/mini-apps.html#usedevicestorage)                         |
| SecureStorage                | [useSecureStorage](https://vue-tg.deptyped.com/mini-apps.html#usesecurestorage)                         |
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
| hideKeyboard                 | [useMiniApp](https://vue-tg.deptyped.com/mini-apps.html#useminiapp)                                     |
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
