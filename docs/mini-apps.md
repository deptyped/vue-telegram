---
next: false
outline: [2, 3]
---

# Mini Apps Integration

[Official Telegram Mini Apps Documentation](https://core.telegram.org/bots/webapps#initializing-mini-apps)

### Field Mapping

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
| BackButton                   | [useWebAppBackButton](#usewebappbackbutton)                   |
| MainButton                   | [useWebAppMainButton](#usewebappmainbutton)                   |
| HapticFeedback               | [useWebAppHapticFeedback](#usewebapphapticfeedback)           |
| BiometricManager             | [useWebAppBiometricManager](#usewebappbiometricmanager)       |
| isVersionAtLeast             | [useWebApp](#usewebapp)                                       |
| setHeaderColor               | [useWebAppTheme](#usewebapptheme)                             |
| setBackgroundColor           | [useWebAppTheme](#usewebapptheme)                             |
| enableClosingConfirmation    | [useWebAppClosingConfirmation](#usewebappclosingconfirmation) |
| disableClosingConfirmation   | [useWebAppClosingConfirmation](#usewebappclosingconfirmation) |
| onEvent                      | [useWebApp](#usewebapp)                                       |
| offEvent                     | [Handled automagically 🪄](#managing-event-subscriptions)      |
| sendData                     | [useWebApp](#usewebapp)                                       |
| switchInlineQuery            | [useWebAppNavigation](#usewebappnavigation)                   |
| openLink                     | [useWebAppNavigation](#usewebappnavigation)                   |
| openTelegramLink             | [useWebAppNavigation](#usewebappnavigation)                   |
| openInvoice                  | [useWebAppNavigation](#usewebappnavigation)                   |
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

### Event Handling

The package provides a set of functions for event handling. By convention, the name of the functions consists of the prefix `on` + the name of the Telegram event in camelCase. So `themeChanged` event turns into `onThemeChanged` and so on. [onEvent](#usewebapp) is also available if you prefer it instead.

```ts
import { useWebAppTheme } from 'vue-tg'

const { onThemeChanged } = useWebAppTheme()

onThemeChanged(() => {
  // handle theme update
})
```

#### Mapping

| Event name              | Handler                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------- |
| themeChanged            | [useWebAppTheme → onThemeChanged](#usewebapptheme)                                  |
| viewportChanged         | [useWebAppViewport → onViewportChanged](#usewebappviewport)                         |
| mainButtonClicked       | [useWebAppMainButton → onMainButtonClicked](#usewebappmainbutton)                   |
| backButtonClicked       | [useWebAppBackButton → onBackButtonClicked](#usewebappbackbutton)                   |
| settingsButtonClicked   | [useWebAppSettingsButton → onSettingsButtonClicked](#usewebappsettingsbutton)       |
| invoiceClosed           | [useWebAppNavigation → onInvoiceClosed](#usewebappnavigation)                       |
| popupClosed             | [useWebAppPopup → onPopupClosed](#usewebapppopup)                                   |
| qrTextReceived          | [useWebAppQrScanner → onQrTextReceived](#usewebappqrscanner)                        |
| clipboardTextReceived   | [useWebAppClipboard → onClipboardTextReceived](#usewebappclipboard)                 |
| writeAccessRequested    | [useWebAppRequests → onWriteAccessRequested](#usewebapprequests)                    |
| contactRequested        | [useWebAppRequests → onContactRequested](#usewebapprequests)                        |
| biometricManagerUpdated | [useWebAppBiometricManager → onBiometricManagerUpdated](#usewebappbiometricmanager) |
| biometricAuthRequested  | [useWebAppBiometricManager → onBiometricAuthRequested](#usewebappbiometricmanager)  |
| biometricTokenUpdated   | [useWebAppBiometricManager → onBiometricTokenUpdated](#usewebappbiometricmanager)   |


#### Managing event subscriptions

By default, event handlers are automatically unsubscribed when the component is unmounted.
But you can unsubscribe before that if you need to:

```ts{9-10}
import { useWebAppTheme } from 'vue-tg'

const { onThemeChanged } = useWebAppTheme()

const handler = onThemeChanged(() => {
  // handle theme update
})

// unsubscribe
handler.off()
```

You can also disable automatic unsubscribing completely:

```ts{9,12-13}
import { useWebAppTheme } from 'vue-tg'

const { onThemeChanged } = useWebAppTheme()

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
Please note that in `manual` mode, you are responsible for managing subscription. 
If subscription is not managed properly, it can lead to memory leaks and other issues.
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

<!--@include: @/mini-apps/composables/use-web-app.md-->

<!--@include: @/mini-apps/composables/use-web-app-back-button.md-->

<!--@include: @/mini-apps/composables/use-web-app-biometric-manager.md-->

<!--@include: @/mini-apps/composables/use-web-app-clipboard.md-->

<!--@include: @/mini-apps/composables/use-web-app-closing-confirmation.md-->

<!--@include: @/mini-apps/composables/use-web-app-cloud-storage.md-->

<!--@include: @/mini-apps/composables/use-web-app-haptic-feedback.md-->

<!--@include: @/mini-apps/composables/use-web-app-main-button.md-->

<!--@include: @/mini-apps/composables/use-web-app-navigation.md-->

<!--@include: @/mini-apps/composables/use-web-app-popup.md-->

<!--@include: @/mini-apps/composables/use-web-app-qr-scanner.md-->

<!--@include: @/mini-apps/composables/use-web-app-requests.md-->

<!--@include: @/mini-apps/composables/use-web-app-send-data.md-->

<!--@include: @/mini-apps/composables/use-web-app-settings-button.md-->

<!--@include: @/mini-apps/composables/use-web-app-theme.md-->

<!--@include: @/mini-apps/composables/use-web-app-viewport.md-->

## Type Aliases

### OnClipboardTextReceivedCallback

Ƭ **OnClipboardTextReceivedCallback**: `(eventData) => void`

##### Parameters

| Name             | Type               |
| :--------------- | :----------------- |
| `eventData`      | `Object`           |
| `eventData.data` | `string` \| `null` |

### OnContactRequestedCallback

Ƭ **OnContactRequestedCallback**: `(eventData) => void`

##### Parameters

| Name               | Type                    |
| :----------------- | :---------------------- |
| `eventData`        | `Object`                |
| `eventData.status` | `"sent" \| "cancelled"` |

### OnInvoiceClosedCallback

Ƭ **OnInvoiceClosedCallback**: `(eventData) => void`

##### Parameters

| Name               | Type                                             |
| :----------------- | :----------------------------------------------- |
| `eventData`        | `Object`                                         |
| `eventData.status` | `"paid" \| "cancelled" \| "failed" \| "pending"` |
| `eventData.url`    | `string`                                         |

### OnPopupClosedCallback

Ƭ **OnPopupClosedCallback**: `(eventData) => void`

##### Parameters

| Name                  | Type              |
| :-------------------- | :---------------- |
| `eventData`           | `Object`          |
| `eventData.button_id` | `string  \| null` |

### OnQrTextReceivedCallback

Ƭ **OnQrTextReceivedCallback**: `(eventData) => void`

##### Parameters

| Name             | Type     |
| :--------------- | :------- |
| `eventData`      | `Object` |
| `eventData.data` | `string` |

### OnViewportChangedCallback

Ƭ **OnViewportChangedCallback**: `(eventData) => void`

##### Parameters

| Name                      | Type      |
| :------------------------ | :-------- |
| `eventData`               | `Object`  |
| `eventData.isStateStable` | `boolean` |

### OnWriteAccessRequestedCallback

Ƭ **OnWriteAccessRequestedCallback**: `(eventData) => void`

##### Parameters

| Name               | Type                       |
| :----------------- | :------------------------- |
| `eventData`        | `Object`                   |
| `eventData.status` | `"allowed" \| "cancelled"` |

### OnBiometricAuthRequested

Ƭ **OnBiometricAuthRequested**: `(eventData) => void`

##### Parameters

| Name              | Type                  |
| :---------------- | :-------------------- |
| `isAuthenticated` | `boolean`             |
| `biometricToken`  | `string \| undefined` |

### OnBiometricTokenUpdated

Ƭ **OnBiometricTokenUpdated**: `(eventData) => void`

##### Parameters

| Name        | Type      |
| :---------- | :-------- |
| `isUpdated` | `boolean` |