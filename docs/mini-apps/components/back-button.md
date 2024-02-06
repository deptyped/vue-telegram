### BackButton

A component that enables the back button when is rendered.

```vue
<script lang="ts" setup>
import { BackButton } from 'vue-tg'

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

| Name  | Type         | Description                            |
| ----- | ------------ | -------------------------------------- |
| click | `() => void` | Emits when the back button is pressed. |
