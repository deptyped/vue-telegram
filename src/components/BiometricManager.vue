<script lang="ts" setup>
import { onMounted } from "vue"
import { useWebAppBiometricManager } from ".."

const emit = defineEmits<{
  (eventName: "init"): void
}>()

const { initBiometric } = useWebAppBiometricManager()

onMounted(() => initBiometric(() => emit("init")))
</script>

<template></template>
