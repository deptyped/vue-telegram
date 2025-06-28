<template></template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useMiniApp } from '../composables/useMiniApp'

const miniApp = useMiniApp('6.0')

if (miniApp.isVersionAtLeast('6.2')) {
  onMounted(() => {
    miniApp.isClosingConfirmationEnabled.value = true
  })

  onBeforeUnmount(() => {
    miniApp.isClosingConfirmationEnabled.value = false
  })
}
</script>
