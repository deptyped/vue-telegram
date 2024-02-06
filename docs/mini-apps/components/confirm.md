### Confirm

A component that shows message in a simple confirmation window with 'OK' and
'Cancel' buttons when is rendered.

```vue
<script lang="ts" setup>
import { Confirm } from 'vue-tg'

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

| Name  | Type                    | Description                            |
| ----- | ----------------------- | -------------------------------------- |
| close | `(ok: boolean) => void` | Emits when the opened popup is closed. |
