<template></template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import { useViewport } from '../composables/useViewport'

const viewport = useViewport('6.0')

if (viewport.isVersionAtLeast('8.0')) {
  onMounted(() => {
    viewport.isFullscreen.value = true
  })

  onUnmounted(() => {
    viewport.isFullscreen.value = false
  })
}
</script>
