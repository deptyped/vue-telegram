<script lang="ts" setup>
import { onMounted, onUnmounted, watch } from "vue"
import { useWebAppBackButton } from ".."

const props = defineProps({
  visible: { type: Boolean, default: true },
})

const emit = defineEmits<{
  (eventName: "click"): void
}>()

const { showBackButton, onBackButtonClicked, hideBackButton } =
  useWebAppBackButton()

watch(
  () => props.visible,
  isVisible => {
    isVisible ? showBackButton() : hideBackButton()
  },
)

onBackButtonClicked(() => emit("click"))

onMounted(() => props.visible && showBackButton())

onUnmounted(() => hideBackButton())
</script>

<template></template>
