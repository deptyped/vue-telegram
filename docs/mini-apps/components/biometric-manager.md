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
  <BiometricManager @init="handleInit" />
  
  <!-- OR -->
  
  <BiometricManager @init="handleInit">
    <template>
      <!-- ... -->
    </template>
  </BiometricManager>
</template>
```

#### Events

| Name | Type         | Description                               |
| ---- | ------------ | ----------------------------------------- |
| init | `() => void` | Emits when the biometric manager is init. |
