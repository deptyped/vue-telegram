<template></template>

<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useBackButton } from '../composables/useBackButton'

const props = defineProps({
  visible: { type: Boolean, default: true },
})

const emit = defineEmits<{
  (eventName: 'click'): void
}>()

const backButton = useBackButton('6.0')

if (backButton.isVersionAtLeast('6.1')) {
  watch(
    () => props.visible,
    (isVisible) => {
      if (isVisible)
        backButton.show()
      else
        backButton.hide()
    },
  )

  backButton.onClick(() => emit('click'))

  onMounted(() => {
    if (props.visible) {
      nextTick(() => {
        backButton.show()
      })
    }
  })

  onUnmounted(() => backButton.hide())
}
</script>
