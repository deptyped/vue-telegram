<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue"
import { useWebAppClosingConfirmation } from ".."

const { enableClosingConfirmation, disableClosingConfirmation } =
  useWebAppClosingConfirmation()

onMounted(() => enableClosingConfirmation())

onUnmounted(() => disableClosingConfirmation())
</script>

<template></template>
