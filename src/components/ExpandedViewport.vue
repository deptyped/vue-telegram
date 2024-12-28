<template></template>

<script lang="ts" setup>
import { onMounted, watch } from 'vue'
import { onViewportChanged } from '..'
import { useViewport } from '../composables/useViewport'

const props = defineProps({
  force: { type: Boolean, default: false },
})

const viewport = useViewport({ version: '6.0' })

if (viewport.isVersionAtLeast('7.7')) {
  watch(
    () => props.force,
    (isForceMode) => {
      isForceMode && !viewport.isExpanded.value && viewport.expand()
      viewport.isVerticalSwipesEnabled.value = !isForceMode
    },
    {
      immediate: true,
    },
  )
}
else {
  onViewportChanged(({ isStateStable }) => {
    props.force && isStateStable && !viewport.isExpanded.value && viewport.expand()
  })
}

onMounted(() => viewport.expand())
</script>
