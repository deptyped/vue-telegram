<template></template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePopup } from '../composables/usePopup'

const props = defineProps({
  message: { type: String, required: true },
})
const emit = defineEmits<{
  (eventName: 'close', ok: boolean): void
}>()

const popup = usePopup({ version: '6.0' })

if (popup.isVersionAtLeast('6.2')) {
  onMounted(() => popup.showConfirm(props.message, ok => emit('close', ok as boolean)))
}
</script>
