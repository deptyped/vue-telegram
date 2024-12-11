<template></template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import { useWebApp, useWebAppViewport } from '..'

const props = defineProps({
  force: { type: Boolean, default: false },
})

const { isFeatureSupported } = useWebApp()
const { onViewportChanged, expand, isExpanded, isVerticalSwipesEnabled }
  = useWebAppViewport()

if (isFeatureSupported('DisableVerticalSwipes')) {
  watch(
    () => props.force,
    (isForceMode) => {
      isForceMode && !isExpanded.value && expand()
      isVerticalSwipesEnabled.value = !isForceMode
    },
    {
      immediate: true,
    },
  )
}
else {
  onViewportChanged(({ isStateStable }) => {
    props.force && isStateStable && !isExpanded.value && expand()
  })
}

onMounted(() => expand())
</script>
