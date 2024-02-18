<script lang="ts" setup>
import { onMounted } from "vue"
import { useWebAppPopup } from ".."

const props = defineProps({
  message: { type: String, required: true },
})
const emit = defineEmits<{
  (eventName: "close", ok: boolean): void
}>()

const { showConfirm } = useWebAppPopup()

onMounted(() => showConfirm(props.message, ok => emit("close", ok as boolean)))
</script>

<template></template>
