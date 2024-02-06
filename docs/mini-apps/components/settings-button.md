### SettingsButton

A component that enables the settings button when is rendered.

```vue
<script lang="ts" setup>
import { SettingsButton } from 'vue-tg'

function handleSettingsButton() {
  // ...
}
</script>

<template>
  <SettingsButton @click="handleSettingsButton" />
</template>
```

#### Props

| Name    | Type    | Required | Description                                                  |
| ------- | ------- | -------- | ------------------------------------------------------------ |
| visible | boolean | false    | Shows whether the button is visible. Set to true by default. |

#### Events

| Name  | Type         | Description                                |
| ----- | ------------ | ------------------------------------------ |
| click | `() => void` | Emits when the settings button is pressed. |
