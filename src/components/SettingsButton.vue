<script lang="ts" setup>
import { onMounted, onUnmounted, watch } from "vue"
import { useWebAppSettingsButton } from ".."

const props = defineProps({
  visible: { type: Boolean, default: true },
})

const emit = defineEmits<{
  (eventName: "click"): void
}>()

const { showSettingsButton, onSettingsButtonClicked, hideSettingsButton } =
  useWebAppSettingsButton()

watch(
  () => props.visible,
  isVisible => {
    isVisible ? showSettingsButton() : hideSettingsButton()
  },
)

onSettingsButtonClicked(() => emit("click"))

onMounted(() => props.visible && showSettingsButton())

onUnmounted(() => hideSettingsButton())
</script>

<template></template>
