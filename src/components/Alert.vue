<script lang="ts" setup>
import { onMounted } from "vue"
import { useWebAppPopup } from ".."

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
})
const emit = defineEmits<{
  (eventName: "close"): void
}>()

const { showAlert } = useWebAppPopup()

onMounted(() => showAlert(props.message, () => emit("close")))
</script>

<template></template>
