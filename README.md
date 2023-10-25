## `vue-tg` - Telegram integration for Vue

A package for integration of
[Telegram Mini Apps](https://core.telegram.org/bots/webapps) feature with Vue.

### Usage Example

```html
<script lang="ts" setup>
import { MainButton, useWebAppPopup } from "vue-tg"

const { showAlert } = useWebAppPopup()
</script>

<template>
  <MainButton 
    text="Open alert"
    @click="() => showAlert('Hello!')" 
  />
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
import { Alert } from "vue-tg"
</script>

<template>
  <Alert message="Hello!" />
</template>

<!-- Same with using an alias of the component -->

<template>
  <tg-alert message="Hello!" />
</template>
```

## Table of contents

- [Official Telegram Mini App Docs ↗](https://core.telegram.org/bots/webapps#initializing-mini-apps)
- [Mapping between Telegram Web App Script and Vue-TG](#mapping-between-telegram-web-app-script-and-vue-tg)
- [Event Handler Aliases](#event-handler-aliases)

### Components

- [Alert](#alert)
- [BackButton](#backbutton)
- [Confirm](#confirm)
- [MainButton](#mainbutton)
- [Popup](#popup)
- [ScanQr](#scanqr)

### Composables

- [useWebApp](#usewebapp)
- [useWebAppBackButton](#usewebappbackbutton)
- [useWebAppClipboard](#usewebappclipboard)
- [useWebAppClosingConfirmation](#usewebappclosingconfirmation)
- [useWebAppCloudStorage](#usewebappcloudstorage)
- [useWebAppHapticFeedback](#usewebapphapticfeedback)
- [useWebAppMainButton](#usewebappmainbutton)
- [useWebAppNavigation](#usewebappnavigation)
- [useWebAppPopup](#usewebapppopup)
- [useWebAppQrScanner](#usewebappqrscanner)
- [useWebAppRequests](#usewebapprequests)
- [useWebAppSendData](#usewebappsenddata)
- [useWebAppSettingsButton](#usewebappsettingsbutton)
- [useWebAppTheme](#usewebapptheme)
- [useWebAppViewport](#usewebappviewport)

---

## Mapping between Telegram Web App Script and Vue-TG

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
| isVersionAtLeast             | [useWebApp](#usewebapp)                                       |
| setHeaderColor               | [useWebAppTheme](#usewebapptheme)                             |
| setBackgroundColor           | [useWebAppTheme](#usewebapptheme)                             |
| enableClosingConfirmation    | [useWebAppClosingConfirmation](#usewebappclosingconfirmation) |
| disableClosingConfirmation   | [useWebAppClosingConfirmation](#usewebappclosingconfirmation) |
| onEvent                      | [useWebApp](#usewebapp)                                       |
| offEvent                     | Handled automagically 🪄                                      |
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

## Event Handler Aliases

### Usage Example

```ts
import { useWebAppTheme } from 'vue-tg'

const { onThemeChanged } = useWebAppTheme()

onThemeChanged(() => {
  // handle theme update
})
```

### Mapping

| Event name            | Handler                                                                     |
| --------------------- | --------------------------------------------------------------------------- |
| themeChanged          | [useWebAppTheme.onThemeChanged](#usewebapptheme)                            |
| viewportChanged       | [useWebAppViewport.onViewportChanged](#usewebappviewport)                   |
| mainButtonClicked     | [useWebAppMainButton.onMainButtonClicked](#usewebappmainbutton)             |
| backButtonClicked     | [useWebAppBackButton.onBackButtonClicked](#usewebappbackbutton)             |
| settingsButtonClicked | [useWebAppSettingsButton.onSettingsButtonClicked](#usewebappsettingsbutton) |
| invoiceClosed         | [useWebAppNavigation.onInvoiceClosed](#usewebappnavigation)                 |
| popupClosed           | [useWebAppPopup.onPopupClosed](#usewebapppopup)                             |
| qrTextReceived        | [useWebAppQrScanner.onQrTextReceived](#usewebappqrscanner)                  |
| clipboardTextReceived | [useWebAppClipboard.onClipboardTextReceived](#usewebappclipboard)           |
| writeAccessRequested  | [useWebAppRequests.onWriteAccessRequested](#usewebapprequests)              |
| contactRequested      | [useWebAppRequests.onContactRequested](#usewebapprequests)                  |

## Components

### Alert

A component that shows message in a simple alert with a 'Close' button when is
rendered.

```html
<script lang="ts" setup>
import { Alert } from "vue-tg"

function handleAlertClose() {
  // ...
}
</script>

<template>
  <Alert message="Hello!" @close="handleAlertClose" />
</template>
```

#### Props

| Name    | Type   | Required | Description                                                 |
| ------- | ------ | -------- | ----------------------------------------------------------- |
| message | string | true     | The message to be displayed in the body of the alert popup. |

#### Events

| Name  | Type       | Description                            |
| ----- | ---------- | -------------------------------------- |
| close | () => void | Emits when the opened popup is closed. |

### BackButton

A component that enables the back button when is rendered.

```html
<script lang="ts" setup>
import { BackButton } from "vue-tg"

function handleBackButton() {
  // ...
}
</script>

<template>
  <BackButton @click="handleBackButton" />
</template>
```

#### Props

| Name    | Type    | Required | Description                                                  |
| ------- | ------- | -------- | ------------------------------------------------------------ |
| visible | boolean | false    | Shows whether the button is visible. Set to true by default. |

#### Events

| Name  | Type       | Description                            |
| ----- | ---------- | -------------------------------------- |
| click | () => void | Emits when the back button is pressed. |

### Confirm

A component that shows message in a simple confirmation window with 'OK' and
'Cancel' buttons when is rendered.

```html
<script lang="ts" setup>
import { Confirm } from "vue-tg"

function handleConfirmClose(ok: boolean) {
  // ...
}
</script>

<template>
  <Confirm message="Hello?" @close="handleConfirmClose" />
</template>
```

#### Props

| Name    | Type   | Required | Description                                                   |
| ------- | ------ | -------- | ------------------------------------------------------------- |
| message | string | true     | The message to be displayed in the body of the confirm popup. |

#### Events

| Name  | Type                  | Description                            |
| ----- | --------------------- | -------------------------------------- |
| close | (ok: boolean) => void | Emits when the opened popup is closed. |

### MainButton

A component that enables the main button when is rendered.

```html
<script lang="ts" setup>
import { MainButton } from "vue-tg"

function handleMainButton() {
  // ...
}
</script>

<template>
  <MainButton @click="handleMainButton" />
</template>
```

#### Props

| Name      | Type    | Required | Description                                                  |
| --------- | ------- | -------- | ------------------------------------------------------------ |
| visible   | boolean | false    | Shows whether the button is visible. Set to true by default. |
| disabled  | boolean | false    | Shows whether the button is disable.                         |
| progress  | boolean | false    | Shows whether the button is displaying a loading indicator.  |
| text      | string  | false    | Current button text.                                         |
| color     | string  | false    | Current button color.                                        |
| textColor | string  | false    | Current button text color.                                   |

#### Events

| Name  | Type       | Description                            |
| ----- | ---------- | -------------------------------------- |
| click | () => void | Emits when the main button is pressed. |

### Popup

A component that shows a native popup when is rendered.

```html
<script lang="ts" setup>
import { Popup } from "vue-tg"

function handlePopupClose(buttonId: string) {
  // ...
}
</script>

<template>
  <Popup message="Hello" @close="handlePopupClose" />
</template>
```

#### Props

| Name    | Type                                                                  | Required | Description                                           |
| ------- | --------------------------------------------------------------------- | -------- | ----------------------------------------------------- |
| message | string                                                                | true     | The message to be displayed in the body of the popup. |
| title   | string                                                                | false    | The text to be displayed in the popup title.          |
| buttons | [PopupButton[] ↗](https://core.telegram.org/bots/webapps#popupbutton) | false    | List of buttons to be displayed in the popup.         |

#### Events

| Name  | Type                       | Description                            |
| ----- | -------------------------- | -------------------------------------- |
| close | (buttonId: string) => void | Emits when the opened popup is closed. |

### ScanQr

A component that shows a native popup for scanning a QR code when is rendered.

```html
<script lang="ts" setup>
import { ScanQr } from "vue-tg"

function handleScanResult(data: string) {
  // ...
}
</script>

<template>
  <ScanQr @result="handleScanResult" />
</template>
```

#### Props

| Name | Type   | Required | Description                                           |
| ---- | ------ | -------- | ----------------------------------------------------- |
| text | string | false    | The text to be displayed under the 'Scan QR' heading. |

#### Events

| Name   | Type                   | Description                                                   |
| ------ | ---------------------- | ------------------------------------------------------------- |
| result | (data: string) => void | Emits when the QR code scanner catches a code with text data. |

## Composables

### useWebApp

```ts
import { useWebApp } from 'vue-tg'
```

▸ **useWebApp**(): `Object`

#### Returns

| Name                   | Type                                                                                                      |
| :--------------------- | :-------------------------------------------------------------------------------------------------------- |
| `close`                | () => `void`                                                                                              |
| `initData`             | `string`                                                                                                  |
| `initDataUnsafe`       | [WebAppInitData ↗](https://core.telegram.org/bots/webapps#webappinitdata)                                 |
| `isVersionAtLeast`     | (`version`: `string`) => `boolean`                                                                        |
| `onEvent`              | [Events Available for Mini Apps ↗](https://core.telegram.org/bots/webapps#events-available-for-mini-apps) |
| `platform`             | `string`                                                                                                  |
| `ready`                | () => `void`                                                                                              |
| `sendData`             | (`data`: `string`) => `void`                                                                              |
| `version`              | `string`                                                                                                  |
| `isReady` 🔋           | `Ref`<`boolean`\>                                                                                         |
| `isPlatform` 🔋        | (`name`: `string`) => `boolean`                                                                           |
| `isPlatformUnknown` 🔋 | `boolean`                                                                                                 |
| `canSendData` 🔋       | `boolean`                                                                                                 |

### useWebAppBackButton

```ts
import { useWebAppBackButton } from 'vue-tg'
```

▸ **useWebAppBackButton**(): `Object`

#### Returns

| Name                  | Type                                     |
| :-------------------- | :--------------------------------------- |
| `hideBackButton`      | () => `void`                             |
| `isBackButtonVisible` | `Ref`<`boolean`\>                        |
| `onBackButtonClicked` | (`eventHandler`: () => `void`) => `void` |
| `showBackButton`      | () => `void`                             |

### useWebAppClipboard

```ts
import { useWebAppClipboard } from 'vue-tg'
```

▸ **useWebAppClipboard**(): `Object`

#### Returns

| Name                      | Type                                                                                              |
| :------------------------ | :------------------------------------------------------------------------------------------------ |
| `onClipboardTextReceived` | (`eventHandler`: [`OnClipboardTextReceivedCallback`](#onclipboardtextreceivedcallback)) => `void` |
| `readTextFromClipboard`   | (`callback?`: (`data`: `null` \| `string`) => `void`) => `void`                                   |

### useWebAppClosingConfirmation

```ts
import { useWebAppClosingConfirmation } from 'vue-tg'
```

▸ **useWebAppClosingConfirmation**(): `Object`

#### Returns

| Name                           | Type              |
| :----------------------------- | :---------------- |
| `disableClosingConfirmation`   | () => `void`      |
| `enableClosingConfirmation`    | () => `void`      |
| `isClosingConfirmationEnabled` | `Ref`<`boolean`\> |

### useWebAppCloudStorage

```ts
import { useWebAppCloudStorage } from 'vue-tg'
```

▸ **useWebAppCloudStorage**(): `Object`

#### Returns

`Object`

| Name                 | Type                                                                 |
| :------------------- | :------------------------------------------------------------------- |
| `getStorageItem`     | (`key`: `string`) => `Promise`<`null` \| `string`\>                  |
| `getStorageItems`    | (`keys`: `string`[]) => `Promise`<`Record`<`string`, `string`\>\>    |
| `getStorageKeys`     | () => `Promise`<`string`[]\>                                         |
| `removeStorageItem`  | (`key`: `string`) => `Promise`<`null` \| `true`\>                    |
| `removeStorageItems` | (`keys`: `string`[]) => `Promise`<`null` \| `true`\>                 |
| `setStorageItem`     | (`key`: `string`, `value`: `string`) => `Promise`<`null` \| `true`\> |

### useWebAppHapticFeedback

```ts
import { useWebAppHapticFeedback } from 'vue-tg'
```

▸ **useWebAppHapticFeedback**(): `Object`

#### Returns

| Name                   | Type                                                                                     |
| :--------------------- | :--------------------------------------------------------------------------------------- |
| `impactOccurred`       | (`style`: `"light"` \| `"medium"` \| `"heavy"` \| `"rigid"` \| `"soft"`) => () => `void` |
| `notificationOccurred` | (`type`: `"error"` \| `"success"` \| `"warning"`) => () => `void`                        |
| `selectionChanged`     | () => `void`                                                                             |

### useWebAppMainButton

```ts
import { useWebAppMainButton } from 'vue-tg'
```

▸ **useWebAppMainButton**(): `Object`

#### Returns

| Name                          | Type                                     |
| :---------------------------- | :--------------------------------------- |
| `disableMainButton`           | () => `void`                             |
| `enableMainButton`            | () => `void`                             |
| `hideMainButton`              | () => `void`                             |
| `hideMainButtonProgress`      | () => `void`                             |
| `isMainButtonActive`          | `Ref`<`boolean`\>                        |
| `isMainButtonProgressVisible` | `Ref`<`boolean`\>                        |
| `isMainButtonVisible`         | `Ref`<`boolean`\>                        |
| `mainButtonColor`             | `Ref`<`string`\>                         |
| `mainButtonText`              | `Ref`<`string`\>                         |
| `mainButtonTextColor`         | `Ref`<`string`\>                         |
| `onMainButtonClicked`         | (`eventHandler`: () => `void`) => `void` |
| `setMainButtonParams`         | (params: MainButtonParams) => `void`     |
| `setMainButtonText`           | (text: string) => `void`                 |
| `showMainButton`              | () => `void`                             |
| `showMainButtonProgress`      | (leaveActive?: boolean) => `void`        |

### useWebAppNavigation

```ts
import { useWebAppNavigation } from 'vue-tg'
```

▸ **useWebAppNavigation**(): `Object`

#### Returns

| Name                | Type                                                                                                                                   |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| `onInvoiceClosed`   | (`eventHandler`: [`OnInvoiceClosedCallback`](#oninvoiceclosedcallback)) => `void`                                                      |
| `openInvoice`       | (`url`: `string`, `callback`: (`url`: `string`, `status`: `"paid"` \| `"cancelled"` \| `"failed"` \| `"pending"`) => `void`) => `void` |
| `openLink`          | (`url`: `string`, `options?`: { `try_instant_view?`: `boolean` }) => `void`                                                            |
| `openTelegramLink`  | (`url`: `string`) => `void`                                                                                                            |
| `switchInlineQuery` | (`query`: `string`, `choose_chat_types?`: (`"users"` \| `"bots"` \| `"groups"` \| `"channels"`)[]) => `void`                           |

### useWebAppPopup

```ts
import { useWebAppPopup } from 'vue-tg'
```

▸ **useWebAppPopup**(): `Object`

#### Returns

| Name            | Type                                                                                |
| :-------------- | :---------------------------------------------------------------------------------- |
| `onPopupClosed` | (`eventHandler`: [`OnPopupClosedCallback`](#onpopupclosedcallback)) => `void`       |
| `showAlert`     | (`message`: `string`, `callback?`: () => `void`) => `void`                          |
| `showConfirm`   | (`message`: `string`, `callback?`: (`ok?`: `boolean`) => `void`) => `void`          |
| `showPopup`     | (`params`: `PopupParams`, `callback?`: (`button_id`: `string`) => `void`) => `void` |

### useWebAppQrScanner

```ts
import { useWebAppQrScanner } from 'vue-tg'
```

▸ **useWebAppQrScanner**(): `Object`

#### Returns

| Name               | Type                                                                                                                                             |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `closeScanQrPopup` | () => `void`                                                                                                                                     |
| `onQrTextReceived` | (`eventHandler`: [`OnQrTextReceivedCallback`](#onqrtextreceivedcallback)) => `void`                                                              |
| `showScanQrPopup`  | (`params`: [ScanQrPopupParams ↗](https://core.telegram.org/bots/webapps#scanqrpopupparams), `callback?`: (`data`: `string`) => `void`) => `void` |

### useWebAppRequests

```ts
import { useWebAppRequests } from 'vue-tg'
```

▸ **useWebAppRequests**(): `Object`

#### Returns

`Object`

| Name                     | Type                                                                                            |
| :----------------------- | :---------------------------------------------------------------------------------------------- |
| `onContactRequested`     | (`eventHandler`: [`OnContactRequestedCallback`](#oncontactrequestedcallback)) => `void`         |
| `onWriteAccessRequested` | (`eventHandler`: [`OnWriteAccessRequestedCallback`](#onwriteaccessrequestedcallback)) => `void` |
| `requestContact`         | (`callback?`: (`success`: `boolean`) => `void`) => `void`                                       |
| `requestWriteAccess`     | (`callback?`: (`success`: `boolean`) => `void`) => `void`                                       |

### useWebAppSendData

Useful composable for universal data sending. `execute` just calls `sendData`
and `executeHttp` sends an HTTP POST request to the specified URL.\
Use `canSendData` from [useWebApp](#usewebapp) to check that sending data in a
service message (using `execute`) is available.

```ts
import { useWebAppSendData } from 'vue-tg'
```

▸ **useWebAppSendData**<`D`\>(`data`, `options`): `Object`

#### Parameters

| Name      | Type                                  |
| :-------- | :------------------------------------ |
| `data`    | `D`                                   |
| `options` | `{ serialize?: (data: D) => string }` |

#### Returns

`Object`

| Name          | Type                                                                              |
| :------------ | :-------------------------------------------------------------------------------- |
| `error`       | `Ref`<`string`\>                                                                  |
| `execute`     | () => `void`                                                                      |
| `executeHttp` | (`callbackUrl`: `string`, { `closeAfter?`: `boolean` }) => `Promise`<`Response`\> |

### useWebAppSettingsButton

```ts
import { useWebAppSettingsButton } from 'vue-tg'
```

▸ **useWebAppSettingsButton**(): `Object`

#### Returns

| Name                      | Type                                     |
| :------------------------ | :--------------------------------------- |
| `onSettingsButtonClicked` | (`eventHandler`: () => `void`) => `void` |

### useWebAppTheme

```ts
import { useWebAppTheme } from 'vue-tg'
```

▸ **useWebAppTheme**(): `Object`

#### Returns

| Name                 | Type                                                                        |
| :------------------- | :-------------------------------------------------------------------------- |
| `backgroundColor`    | `Ref`<`string`\>                                                            |
| `colorScheme`        | `Ref`<`"light"` \| `"dark"`\>                                               |
| `headerColor`        | `Ref`<`string`\>                                                            |
| `onThemeChanged`     | (`eventHandler`: () => `void`) => `void`                                    |
| `setBackgroundColor` | (`color`: `string`) => `void`                                               |
| `setHeaderColor`     | (`color`: `"bg_color"` \| `"secondary_bg_color"`) => `void`                 |
| `themeParams`        | `Ref`<[ThemeParams ↗](https://core.telegram.org/bots/webapps#themeparams)\> |

### useWebAppViewport

```ts
import { useWebAppViewport } from 'vue-tg'
```

▸ **useWebAppViewport**(): `Object`

#### Returns

| Name                   | Type                                                                                  |
| :--------------------- | :------------------------------------------------------------------------------------ |
| `expand`               | () => `void`                                                                          |
| `isExpanded`           | `Ref`<`boolean`\>                                                                     |
| `onViewportChanged`    | (`eventHandler`: [`OnViewportChangedCallback`](#onviewportchangedcallback)) => `void` |
| `viewportHeight`       | `Ref`<`number`\>                                                                      |
| `viewportStableHeight` | `Ref`<`number`\>                                                                      |

## Type Aliases

### OnClipboardTextReceivedCallback

Ƭ **OnClipboardTextReceivedCallback**: (`eventData`: { `data`: `string` \|
`null` }) => `void`

#### Type declaration

▸ (`eventData`): `void`

##### Parameters

| Name             | Type               |
| :--------------- | :----------------- |
| `eventData`      | `Object`           |
| `eventData.data` | `string` \| `null` |

##### Returns

`void`

### OnContactRequestedCallback

Ƭ **OnContactRequestedCallback**: (`eventData`: { `status`: `"sent"` \|
`"cancelled"` }) => `void`

#### Type declaration

▸ (`eventData`): `void`

##### Parameters

| Name               | Type                      |
| :----------------- | :------------------------ |
| `eventData`        | `Object`                  |
| `eventData.status` | `"sent"` \| `"cancelled"` |

##### Returns

`void`

### OnInvoiceClosedCallback

Ƭ **OnInvoiceClosedCallback**: (`eventData`: { `status`: `"paid"` \|
`"cancelled"` \| `"failed"` \| `"pending"` ; `url`: `string` }) => `void`

#### Type declaration

▸ (`eventData`): `void`

##### Parameters

| Name               | Type                                                   |
| :----------------- | :----------------------------------------------------- |
| `eventData`        | `Object`                                               |
| `eventData.status` | `"paid"` \| `"cancelled"` \| `"failed"` \| `"pending"` |
| `eventData.url`    | `string`                                               |

##### Returns

`void`

### OnPopupClosedCallback

Ƭ **OnPopupClosedCallback**: (`eventData`: { `button_id`: `string` \| `null` })
=> `void`

#### Type declaration

▸ (`eventData`): `void`

##### Parameters

| Name                  | Type               |
| :-------------------- | :----------------- |
| `eventData`           | `Object`           |
| `eventData.button_id` | `string` \| `null` |

##### Returns

`void`

### OnQrTextReceivedCallback

Ƭ **OnQrTextReceivedCallback**: (`eventData`: { `data`: `string` }) => `void`

#### Type declaration

▸ (`eventData`): `void`

##### Parameters

| Name             | Type     |
| :--------------- | :------- |
| `eventData`      | `Object` |
| `eventData.data` | `string` |

##### Returns

`void`

### OnViewportChangedCallback

Ƭ **OnViewportChangedCallback**: (`eventData`: { `isStateStable`: `boolean` })
=> `void`

#### Type declaration

▸ (`eventData`): `void`

##### Parameters

| Name                      | Type      |
| :------------------------ | :-------- |
| `eventData`               | `Object`  |
| `eventData.isStateStable` | `boolean` |

##### Returns

`void`

### OnWriteAccessRequestedCallback

Ƭ **OnWriteAccessRequestedCallback**: (`eventData`: { `status`: `"allowed"` \|
`"cancelled"` }) => `void`

#### Type declaration

▸ (`eventData`): `void`

##### Parameters

| Name               | Type                         |
| :----------------- | :--------------------------- |
| `eventData`        | `Object`                     |
| `eventData.status` | `"allowed"` \| `"cancelled"` |

##### Returns

`void`
