<template></template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, watch } from 'vue'
import { onViewportChanged } from '..'
import { useViewport } from '../composables/useViewport'

const props = defineProps({
  force: { type: Boolean, default: false },
})

const viewport = useViewport('6.0')

if (viewport.isVersionAtLeast('7.7')) {
  onMounted(() => {
    viewport.isVerticalSwipesEnabled.value = false
  })
  onBeforeUnmount(() => {
    viewport.isVerticalSwipesEnabled.value = true
  })
}
else {
  watch(
    () => props.force,
    (isForceMode) => {
      isForceMode && !viewport.isExpanded.value && viewport.expand()
    },
    { immediate: true },
  )
  onViewportChanged(({ isStateStable }) => {
    props.force && isStateStable && !viewport.isExpanded.value && viewport.expand()
  })
}

onMounted(() => viewport.expand())
</script>
