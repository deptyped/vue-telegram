<template></template>

<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useSettingsButton } from '../composables/useSettingsButton'

const props = defineProps({
  visible: { type: Boolean, default: true },
})

const emit = defineEmits<{
  (eventName: 'click'): void
}>()

const settingsButton = useSettingsButton('6.0')

if (settingsButton.isVersionAtLeast('7.0')) {
  watch(
    () => props.visible,
    (isVisible) => {
      if (isVisible)
        settingsButton.show()
      else
        settingsButton.hide()
    },
  )

  settingsButton.onClick(() => emit('click'))

  onMounted(() => {
    if (props.visible) {
      nextTick(() => {
        settingsButton.show()
      })
    }
  })

  onBeforeUnmount(() => {
    settingsButton.hide()
  })
}
</script>
