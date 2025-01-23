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

| Name           | Type    | Required | Description                                                  |
| -------------- | ------- | -------- | ------------------------------------------------------------ |
| visible        | boolean | false    | Shows whether the button is visible. Set to true by default. |
| disabled       | boolean | false    | Shows whether the button is disable.                         |
| progress       | boolean | false    | Shows whether the button is displaying a loading indicator.  |
| text           | string  | false    | <!--@include: @/generated/MainButton-text.md -->             |
| color          | string  | false    | <!--@include: @/generated/MainButton-color.md -->            |
| textColor      | string  | false    | <!--@include: @/generated/MainButton-textColor.md -->        |
| hasShineEffect | boolean | false    | <!--@include: @/generated/MainButton-hasShineEffect.md -->   |

#### Events

| Name  | Type         | Description                            |
| ----- | ------------ | -------------------------------------- |
| click | `() => void` | Emits when the main button is pressed. |
