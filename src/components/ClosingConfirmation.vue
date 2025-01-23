<template></template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { useMiniApp } from '../composables/useMiniApp'

const miniApp = useMiniApp({ version: '6.0' })

if (miniApp.isVersionAtLeast('6.2')) {
  onMounted(() => {
    miniApp.isClosingConfirmationEnabled.value = true
  })

  onUnmounted(() => {
    miniApp.isClosingConfirmationEnabled.value = false
  })
}
</script>
