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

| Name  | Type    | Required | Description                                                                                                    |
| ----- | ------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| force | boolean | false    | Expands the viewport despite user interaction. Disables vertical swipes if supported. Set to false by default. |
