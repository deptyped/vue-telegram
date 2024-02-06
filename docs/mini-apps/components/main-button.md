### MainButton

A component that enables the main button when is rendered.

```vue
<script lang="ts" setup>
import { MainButton } from 'vue-tg'

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

| Name  | Type         | Description                            |
| ----- | ------------ | -------------------------------------- |
| click | `() => void` | Emits when the main button is pressed. |
