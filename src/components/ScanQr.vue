<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue"
import { useWebAppQrScanner } from "../composables"

const props = defineProps({
  text: { type: String },
})
const emit = defineEmits<{
  (eventName: "result", data: string): void
}>()

const { showScanQrPopup, closeScanQrPopup } = useWebAppQrScanner()

onMounted(() =>
  showScanQrPopup(
    {
      text: props.text,
    },
    data => emit("result", data),
  ),
)

onUnmounted(() => closeScanQrPopup())
</script>

<template></template>
