<template></template>

<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useMainButton } from '../composables/useMainButton'

const props = defineProps({
  text: { type: String },
  color: { type: String },
  textColor: { type: String },
  visible: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  progress: { type: Boolean, default: false },
  hasShineEffect: { type: Boolean, default: false },
})
const emit = defineEmits<{
  (eventName: 'click'): void
}>()

const mainButton = useMainButton('6.0')

watch(
  () => props.text,
  (text) => {
    mainButton.setParams({
      text,
    })
  },
)

watch(
  () => props.color,
  (color) => {
    mainButton.setParams({
      color,
    })
  },
)

watch(
  () => props.textColor,
  (textColor) => {
    mainButton.setParams({
      text_color: textColor,
    })
  },
)

watch(
  () => props.visible,
  (isVisible) => {
    mainButton.setParams({
      is_visible: isVisible,
    })
  },
)

watch(
  () => props.disabled,
  (isDisabled) => {
    mainButton.setParams({
      is_active: !isDisabled,
    })
  },
)

watch(
  () => props.progress,
  (inProgress) => {
    if (inProgress)
      mainButton.showProgress()
    else
      mainButton.hideProgress()
  },
)

if (mainButton.isVersionAtLeast('7.10')) {
  watch(
    () => props.hasShineEffect,
    (hasShineEffect) => {
      mainButton.hasShineEffect.value = hasShineEffect
    },
  )
}

mainButton.onClick(() => emit('click'))

onMounted(() => {
  nextTick(() => {
    if (props.progress)
      mainButton.showProgress()
    else
      mainButton.hideProgress()

    mainButton.setParams({
      text: props.text,
      text_color: props.textColor,
      color: props.color,
      has_shine_effect: props.hasShineEffect,
      is_active: !props.disabled,
      is_visible: props.visible,
    })
  })
})

onUnmounted(() => {
  mainButton.hideProgress()
  mainButton.hide()
})
</script>
