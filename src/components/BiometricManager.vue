<template></template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useBiometricManager } from '../composables/useBiometricManager'

const emit = defineEmits<{
  (eventName: 'init'): void
}>()

const biometricManager = useBiometricManager({ version: '6.0' })

if (biometricManager.isVersionAtLeast('7.2')) {
  onMounted(() => biometricManager.init(() => emit('init')))
}
</script>
