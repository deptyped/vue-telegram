<template></template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { usePopup } from '../composables/usePopup'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
})
const emit = defineEmits<{
  (eventName: 'close'): void
}>()

const popup = usePopup({ version: '6.0' })

if (popup.isVersionAtLeast('6.2')) {
  onMounted(() => {
    popup.showAlert(props.message, () => emit('close'))
  })
}
</script>
