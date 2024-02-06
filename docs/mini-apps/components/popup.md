### Popup

A component that shows a native popup when is rendered.

```vue
<script lang="ts" setup>
import { Popup } from 'vue-tg'

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

| Name  | Type                         | Description                            |
| ----- | ---------------------------- | -------------------------------------- |
| close | `(buttonId: string) => void` | Emits when the opened popup is closed. |
