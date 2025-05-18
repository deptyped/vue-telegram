<template></template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { PopupButton } from '../sdk'
import { onMounted } from 'vue'
import { usePopup } from '../composables/usePopup'

const props = defineProps({
  title: { type: String },
  message: { type: String, required: true },
  buttons: { type: Array as PropType<PopupButton[]> },
})
const emit = defineEmits<{
  (eventName: 'close', buttonId: string): void
}>()

const popup = usePopup('6.0')

if (popup.isVersionAtLeast('6.2')) {
  onMounted(() =>
    popup.showPopup(
      {
        title: props.title,
        message: props.message,
        buttons: props.buttons,
      },
      buttonId => emit('close', buttonId),
    ),
  )
}
</script>
