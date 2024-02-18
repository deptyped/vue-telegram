<script lang="ts" setup>
import type { PropType } from "vue"
import { onMounted } from "vue"
import { useWebAppPopup } from ".."

const props = defineProps({
  title: { type: String },
  message: { type: String, required: true },
  buttons: { type: Array as PropType<PopupButton[]> },
})
const emit = defineEmits<{
  (eventName: "close", buttonId: string): void
}>()

const { showPopup } = useWebAppPopup()

onMounted(() =>
  showPopup(
    {
      title: props.title,
      message: props.message,
      buttons: props.buttons,
    },
    buttonId => emit("close", buttonId),
  ),
)
</script>

<template></template>
