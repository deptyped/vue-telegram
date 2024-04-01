### BiometricManager

A component that init the biometric manager when is rendered.

```vue
<script lang="ts" setup>
import { BiometricManager } from 'vue-tg'
  
const handleInit = () => {
  // ...
}
</script>

<template>
  <BiometricManager @onInit="handleInit" />
  
  <!-- OR -->
  
  <BiometricManager @onInit="handleInit">
    <template>
      <!-- ... -->
    </template>
  </BiometricManager>
</template>
```

#### Events

| Name   | Type         | Description                               |
|--------| ------------ |-------------------------------------------|
| onInit | `() => void` | Emits when the biometric manager is init. |
