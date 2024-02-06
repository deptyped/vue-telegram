### Alert

A component that shows message in a simple alert with a 'Close' button when is
rendered.

```vue
<script lang="ts" setup>
import { Alert } from 'vue-tg'

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

| Name  | Type         | Description                            |
| ----- | ------------ | -------------------------------------- |
| close | `() => void` | Emits when the opened popup is closed. |
