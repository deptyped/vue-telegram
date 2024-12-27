---
next: false
outline: [2, 3]
---

# Mini Apps Integration

[Official Telegram Mini Apps Documentation](https://core.telegram.org/bots/webapps#initializing-mini-apps)

### Field Mapping

| Field                        | Composable                                                    |
| ---------------------------- | ------------------------------------------------------------- |
| initData                     | [useMiniApp](#useminiapp)                                     |
| initDataUnsafe               | [useMiniApp](#useminiapp)                                     |
| version                      | [useMiniApp](#useminiapp)                                     |
| platform                     | [useMiniApp](#useminiapp)                                     |
| colorScheme                  | [useTheme](#usetheme)                                         |
| themeParams                  | [useTheme](#usetheme)                                         |
| isActive                     | [useMiniApp](#useminiapp)                                     |
| isExpanded                   | [useViewport](#useviewport)                                   |
| viewportHeight               | [useViewport](#useviewport)                                   |
| viewportStableHeight         | [useViewport](#useviewport)                                   |
| headerColor                  | [useTheme](#usetheme)                                         |
| backgroundColor              | [useTheme](#usetheme)                                         |
| isClosingConfirmationEnabled | [useMiniApp](#useminiapp)                                     |
| isVerticalSwipesEnabled      | [useViewport](#useviewport)                                   |
| isFullscreen                 | [useViewport](#useviewport)                                   |
| isOrientationLocked          | [useViewport](#useviewport)                                   |
| safeAreaInset                | [useViewport](#useviewport)                                   |
| contentSafeAreaInset         | [useViewport](#useviewport)                                   |
| BackButton                   | [useBackButton](#usebackbutton)                               |
| MainButton                   | [useMainButton](#usemainbutton)                               |
| HapticFeedback               | [useHapticFeedback](#usehapticfeedback)                       |
| BiometricManager             | [useBiometricManager](#usebiometricmanager)                   |
| Accelerometer                | [useAccelerometer](#useaccelerometer)                         |
| DeviceOrientation            | [useDeviceOrientation](#usedeviceorientation)                 |
| Gyroscope                    | [useGyroscope](#usegyroscope)                                 |
| LocationManager              | [useLocationManager](#uselocationmanager)                     |
| isVersionAtLeast             | [useMiniApp](#useminiapp)                                     |
| setHeaderColor               | [useTheme](#usetheme)                                         |
| setBackgroundColor           | [useTheme](#usetheme)                                         |
| setBottomBarColor            | [useTheme](#usetheme)                                         |
| enableClosingConfirmation    | [useMiniApp](#useminiapp)                                     |
| disableClosingConfirmation   | [useMiniApp](#useminiapp)                                     |
| enableVerticalSwipes         | [useViewport](#useviewport)                                   |
| disableVerticalSwipes        | [useViewport](#useviewport)                                   |
| requestFullscreen            | [useViewport](#useviewport)                                   |
| exitFullscreen               | [useViewport](#useviewport)                                   |
| lockOrientation              | [useViewport](#useviewport)                                   |
| unlockOrientation            | [useViewport](#useviewport)                                   |
| addToHomeScreen              | [useHomeScreen](#usehomescreen)                               |
| checkHomeScreenStatus        | [useHomeScreen](#usehomescreen)                               |
| onEvent                      | [Event Handling](#event-handling)                             |
| offEvent                     | [Managing Event Subscriptions](#managing-event-subscriptions) |
| sendData                     | [useMiniApp](#useminiapp)                                     |
| switchInlineQuery            | [useMiniApp](#useminiapp)                                     |
| openLink                     | [useMiniApp](#useminiapp)                                     |
| openTelegramLink             | [useMiniApp](#useminiapp)                                     |
| openInvoice                  | [useMiniApp](#useminiapp)                                     |
| shareToStory                 | [useMiniApp](#useminiapp)                                     |
| shareMessage                 | [useMiniApp](#useminiapp)                                     |
| setEmojiStatus               | [useEmojiStatus](#useemojistatus)                             |
| requestEmojiStatusAccess     | [useEmojiStatus](#useemojistatus)                             |
| downloadFile                 | [useMiniApp](#useminiapp)                                     |
| showPopup                    | [usePopup](#usepopup)                                         |
| showAlert                    | [usePopup](#usepopup)                                         |
| showConfirm                  | [usePopup](#usepopup)                                         |
| showScanQrPopup              | [useQrScanner](#useqrscanner)                                 |
| closeScanQrPopup             | [useQrScanner](#useqrscanner)                                 |
| readTextFromClipboard        | [useClipboard](#useclipboard)                                 |
| requestWriteAccess           | [useMiniApp](#useminiapp)                                     |
| requestContact               | [useMiniApp](#useminiapp)                                     |
| ready                        | [useMiniApp](#useminiapp)                                     |
| expand                       | [useViewport](#useviewport)                                   |
| close                        | [useMiniApp](#useminiapp)                                     |

## Version Check

Features are introduced in specific versions of the Bot API, but users may not always use clients that support the latest version.
Always verify version compatibility to ensure feature support.

For example, `shareToStory` was introduced in version __7.8__:

```ts twoslash
import { useMiniApp } from 'vue-tg'

const miniApp = useMiniApp()

// error because this method was introduced in version 7.8
// @errors: 2722
miniApp.shareToStory("https://url-to-image")

// first, ensure the version is 7.8 or higher
if (miniApp.isVersionAtLeast('7.8')) {
  miniApp.shareToStory("https://url-to-image") // no error
}
```

You can explicitly set the base version:

```ts twoslash
import { useMiniApp } from 'vue-tg/7.8'
//                                 ^^^

const miniApp = useMiniApp()

miniApp.shareToStory("https://url-to-image") // no error

// error because this method was introduced in version 8.0
// @errors: 2722
miniApp.downloadFile({ url: "https://url-to-image", file_name: "kitten.png" })
```

To skip all version checks, use `latest`, which is an alias for the latest version. 
This is useful for prototyping but unreliable for production. 
**Use it only if you know what you are doing.**

```ts twoslash
import { useMiniApp } from 'vue-tg/latest'
//                                 ^^^^^^

const miniApp = useMiniApp()

miniApp.shareToStory("https://url-to-image") // no error
```

Specifying the version every time can be tedious. 
For convenience, create a file `telegram.ts` with following content:

```ts twoslash
import { isVersionAtLeast } from 'vue-tg'
import { usePopup, useMiniApp } from 'vue-tg/latest'

const popup = usePopup()
const miniApp = useMiniApp()

if (!isVersionAtLeast('8.0')) {
  //                   ^^^
  popup.showAlert(
    "Please update Telegram to the latest version!", 
    miniApp.close
  )
}

export * from 'vue-tg/8.0'
//                    ^^^
```

Now, you can import composables from `telegram.ts` and be sure that the client supports the specified version (`8.0` in this case).

## Event Handling

Event-handling functions follow the naming convention `on<EventName>` in camelCase.
For example, the `themeChanged` event becomes `onThemeChanged`, and so on. 
A generic `onEvent` is also available if you prefer to use it instead.

```ts
import { onThemeChanged } from 'vue-tg'

onThemeChanged(() => {
  // handle theme update
})
```

You can also use composables for event handling:

```ts
import { useTheme } from 'vue-tg'

const theme = useTheme()

theme.onChange(() => {
  // handle theme update
})
```

::: details Event Mapping
| Event name                 | Handler                      | Composable Alias                                                   |
| -------------------------- | ---------------------------- | ------------------------------------------------------------------ |
| activated                  | onActivated                  | [useMiniApp → <br/>onActive](#useminiapp)                          |
| deactivated                | onDeactivated                | [useMiniApp → <br/>onDeactive](#useminiapp)                        |
| themeChanged               | onThemeChanged               | [useTheme → <br/>onChange](#usetheme)                              |
| viewportChanged            | onViewportChanged            | [useViewport → <br/>onChange](#useviewport)                        |
| safeAreaChanged            | onSafeAreaChanged            | [useViewport → <br/>onSafeAreaChange](#useviewport)                |
| contentSafeAreaChanged     | onContentSafeAreaChanged     | [useViewport → <br/>onContentSafeAreaChange](#useviewport)         |
| mainButtonClicked          | onMainButtonClicked          | [useMainButton → <br/>onClick](#usemainbutton)                     |
| secondaryButtonClicked     | onSecondaryButtonClicked     | [useSecondaryButton → <br/>onClick](#usesecondarybutton)           |
| backButtonClicked          | onBackButtonClicked          | [useBackButton → <br/>onClick](#usebackbutton)                     |
| settingsButtonClicked      | onSettingsButtonClicked      | [useSettingsButton → <br/>onClick](#usesettingsbutton)             |
| invoiceClosed              | onInvoiceClosed              | [useMiniApp → <br/>onInvoiceClose](#useminiapp)                    |
| popupClosed                | onPopupClosed                | [usePopup → <br/>onClose](#usepopup)                               |
| qrTextReceived             | onQrTextReceived             | [useQrScanner → <br/>onScan](#useqrscanner)                        |
| scanQrPopupClosed          | onScanQrPopupClosed          | [useQrScanner → <br/>onClose](#useqrscanner)                       |
| clipboardTextReceived      | onClipboardTextReceived      | [useClipboard → <br/>onRead](#useclipboard)                        |
| writeAccessRequested       | onWriteAccessRequested       | [useMiniApp → <br/>onWriteAccessRequest](#useminiapp)              |
| contactRequested           | onContactRequested           | [useMiniApp → <br/>onContactRequest](#useminiapp)                  |
| biometricManagerUpdated    | onBiometricManagerUpdated    | [useBiometricManager → <br/>onManagerUpdate](#usebiometricmanager) |
| biometricAuthRequested     | onBiometricAuthRequested     | [useBiometricManager → <br/>onAuthRequest](#usebiometricmanager)   |
| biometricTokenUpdated      | onBiometricTokenUpdated      | [useBiometricManager → <br/>onTokenUpdate](#usebiometricmanager)   |
| fullscreenChanged          | onFullscreenChanged          | [useViewport → <br/>onFullscreenChange](#useviewport)              |
| fullscreenFailed           | onFullscreenFailed           | [useViewport → <br/>onFullscreenFail](#useviewport)                |
| homeScreenAdded            | onHomeScreenAdded            | [useHomeScreen → <br/>onShortcutAdd](#usehomescreen)               |
| homeScreenChecked          | onHomeScreenChecked          | [useHomeScreen → <br/>onShortcutCheck](#usehomescreen)             |
| accelerometerStarted       | onAccelerometerStarted       | [useAccelerometer → <br/>onStart](#useaccelerometer)               |
| accelerometerStopped       | onAccelerometerStopped       | [useAccelerometer → <br/>onStop](#useaccelerometer)                |
| accelerometerChanged       | onAccelerometerChanged       | [useAccelerometer → <br/>onChange](#useaccelerometer)              |
| accelerometerFailed        | onAccelerometerFailed        | [useAccelerometer → <br/>onFail](#useaccelerometer)                |
| deviceOrientationStarted   | onDeviceOrientationStarted   | [useDeviceOrientation → <br/>onStart](#usedeviceorientation)       |
| deviceOrientationStopped   | onDeviceOrientationStopped   | [useDeviceOrientation → <br/>onStop](#usedeviceorientation)        |
| deviceOrientationChanged   | onDeviceOrientationChanged   | [useDeviceOrientation → <br/>onChange](#usedeviceorientation)      |
| deviceOrientationFailed    | onDeviceOrientationFailed    | [useDeviceOrientation → <br/>onFail](#usedeviceorientation)        |
| gyroscopeStarted           | onGyroscopeStarted           | [useGyroscope → <br/>onStart](#usegyroscope)                       |
| gyroscopeStopped           | onGyroscopeStopped           | [useGyroscope → <br/>onStop](#usegyroscope)                        |
| gyroscopeChanged           | onGyroscopeChanged           | [useGyroscope → <br/>onChange](#usegyroscope)                      |
| gyroscopeFailed            | onGyroscopeFailed            | [useGyroscope → <br/>onFail](#usegyroscope)                        |
| locationManagerUpdated     | onLocationManagerUpdated     | [useLocationManager → <br/>onManagerUpdate](#uselocationmanager)   |
| locationRequested          | onLocationRequested          | [useLocationManager → <br/>onRequest](#uselocationmanager)         |
| shareMessageSent           | onShareMessageSent           | [useMiniApp → <br/>onShareMessageSent](#useminiapp)                |
| shareMessageFailed         | onShareMessageFailed         | [useMiniApp → <br/>onShareMessageFail](#useminiapp)                |
| emojiStatusSet             | onEmojiStatusSet             | [useEmojiStatus → <br/>onSet](#useemojistatus)                     |
| emojiStatusAccessRequested | onEmojiStatusAccessRequested | [useEmojiStatus → <br/>onAccessRequest](#useemojistatus)           |
| emojiStatusFailed          | onEmojiStatusFailed          | [useEmojiStatus → <br/>onFail](#useemojistatus)                    |
| fileDownloadRequested      | onFileDownloadRequested      | [useMiniApp → <br/>onFileDownloadRequest](#useminiapp)             |
:::

#### Managing Event Subscriptions

Event handlers automatically unsubscribe when the component unmounts.
However, you can unsubscribe earlier if needed:

```ts{7-8}
import { onThemeChanged } from 'vue-tg'

const handler = onThemeChanged(() => {
  // handle theme update
})

// unsubscribe
handler.off()
```

To disable automatic unsubscribing, set manual mode:

```ts
import { onThemeChanged } from 'vue-tg'

const handler = onThemeChanged(
  () => {
    // handle theme update
  },
  { manual: true },  // [!code ++]
)

// unsubscribe
handler.off()
```

::: warning
In `manual` mode, you are responsible for managing the subscription.
Improper management may lead to memory leaks or other issues.
:::

## Components

<!--@include: @/mini-apps/components/alert.md-->

<!--@include: @/mini-apps/components/back-button.md-->

<!--@include: @/mini-apps/components/biometric-manager.md-->

<!--@include: @/mini-apps/components/closing-confirmation.md-->

<!--@include: @/mini-apps/components/confirm.md-->

<!--@include: @/mini-apps/components/expanded-viewport.md-->

<!--@include: @/mini-apps/components/main-button.md-->

<!--@include: @/mini-apps/components/popup.md-->

<!--@include: @/mini-apps/components/scan-qr.md-->

<!--@include: @/mini-apps/components/settings-button.md-->

## Composables

<!--@include: @/mini-apps/composables/use-mini-app.md-->

<!--@include: @/mini-apps/composables/use-accelerometer.md-->

<!--@include: @/mini-apps/composables/use-back-button.md-->

<!--@include: @/mini-apps/composables/use-biometric-manager.md-->

<!--@include: @/mini-apps/composables/use-clipboard.md-->

<!--@include: @/mini-apps/composables/use-cloud-storage.md-->

<!--@include: @/mini-apps/composables/use-device-orientation.md-->

<!--@include: @/mini-apps/composables/use-emoji-status.md-->

<!--@include: @/mini-apps/composables/use-gyroscope.md-->

<!--@include: @/mini-apps/composables/use-haptic-feedback.md-->

<!--@include: @/mini-apps/composables/use-home-screen.md-->

<!--@include: @/mini-apps/composables/use-location-manager.md-->

<!--@include: @/mini-apps/composables/use-main-button.md-->

<!--@include: @/mini-apps/composables/use-popup.md-->

<!--@include: @/mini-apps/composables/use-qr-scanner.md-->

<!--@include: @/mini-apps/composables/use-secondary-button.md-->

<!--@include: @/mini-apps/composables/use-settings-button.md-->

<!--@include: @/mini-apps/composables/use-theme.md-->

<!--@include: @/mini-apps/composables/use-viewport.md-->

## Composables (Legacy)

<!--@include: @/mini-apps/composables-legacy/use-web-app.md-->

<!--@include: @/mini-apps/composables-legacy/use-web-app-back-button.md-->

<!--@include: @/mini-apps/composables-legacy/use-web-app-biometric-manager.md-->

<!--@include: @/mini-apps/composables-legacy/use-web-app-clipboard.md-->

<!--@include: @/mini-apps/composables-legacy/use-web-app-closing-confirmation.md-->

<!--@include: @/mini-apps/composables-legacy/use-web-app-cloud-storage.md-->

<!--@include: @/mini-apps/composables-legacy/use-web-app-haptic-feedback.md-->

<!--@include: @/mini-apps/composables-legacy/use-web-app-main-button.md-->

<!--@include: @/mini-apps/composables-legacy/use-web-app-navigation.md-->

<!--@include: @/mini-apps/composables-legacy/use-web-app-popup.md-->

<!--@include: @/mini-apps/composables-legacy/use-web-app-qr-scanner.md-->

<!--@include: @/mini-apps/composables-legacy/use-web-app-requests.md-->

<!--@include: @/mini-apps/composables-legacy/use-web-app-settings-button.md-->

<!--@include: @/mini-apps/composables-legacy/use-web-app-share.md-->

<!--@include: @/mini-apps/composables-legacy/use-web-app-theme.md-->

<!--@include: @/mini-apps/composables-legacy/use-web-app-viewport.md-->
