<script lang="ts" setup>
import { onMounted } from "vue"
import { useWebAppBiometricManager } from ".."

const emit = defineEmits<{
  (eventName: "onInit"): void
}>()

const { init } = useWebAppBiometricManager()

onMounted(() => init(() => emit("onInit")))
</script>

<template><slot /></template>
