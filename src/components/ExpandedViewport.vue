<script lang="ts" setup>
import { onMounted } from "vue"
import { useWebAppViewport } from ".."

const props = defineProps({
  force: { type: Boolean, default: false },
})

const { onViewportChanged, expand } = useWebAppViewport()

onViewportChanged(({ isStateStable }) => {
  props.force && isStateStable && expand()
})

onMounted(() => expand())
</script>

<template></template>
