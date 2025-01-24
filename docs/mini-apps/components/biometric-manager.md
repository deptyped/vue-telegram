### BiometricManager <Badge type="tip" text="Bot API 7.2+" />

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
</template>
```

#### Events

| Name | Type         | Description                               |
| ---- | ------------ | ----------------------------------------- |
| init | `() => void` | Emits when the biometric manager is init. |
