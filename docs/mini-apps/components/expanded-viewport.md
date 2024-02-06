### ExpandedViewport

A component that expands the Mini App to the maximum available height when is rendered.

```vue
<script lang="ts" setup>
import { ExpandedViewport } from 'vue-tg'
</script>

<template>
  <ExpandedViewport />
</template>
```

#### Props

| Name  | Type    | Required | Description                                                                                                                               |
| ----- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| force | boolean | false    | Keep the viewport expanded despite user interaction. Set to false by default. <br/> **Note:** does not prevent the Mini App from closing. |
