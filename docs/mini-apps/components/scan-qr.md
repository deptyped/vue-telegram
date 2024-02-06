### ScanQr

A component that shows a native popup for scanning a QR code when is rendered.

```vue
<script lang="ts" setup>
import { ScanQr } from 'vue-tg'

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

| Name   | Type                     | Description                                                   |
| ------ | ------------------------ | ------------------------------------------------------------- |
| result | `(data: string) => void` | Emits when the QR code scanner catches a code with text data. |
