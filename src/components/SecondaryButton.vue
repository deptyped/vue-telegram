<template></template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useSecondaryButton } from '../composables/useSecondaryButton'

const props = defineProps({
  text: { type: String },
  color: { type: String },
  textColor: { type: String },
  visible: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false },
  progress: { type: Boolean, default: false },
  hasShineEffect: { type: Boolean, default: false },
  position: { type: String as PropType<'left' | 'right' | 'top' | 'bottom'> },
})
const emit = defineEmits<{
  (eventName: 'click'): void
}>()

const secondaryButton = useSecondaryButton('6.0')

if (secondaryButton.isVersionAtLeast('7.10')) {
  watch(
    () => props.text,
    (text) => {
      secondaryButton.setParams({
        text,
      })
    },
  )

  watch(
    () => props.color,
    (color) => {
      secondaryButton.setParams({
        color,
      })
    },
  )

  watch(
    () => props.textColor,
    (textColor) => {
      secondaryButton.setParams({
        text_color: textColor,
      })
    },
  )

  watch(
    () => props.visible,
    (isVisible) => {
      secondaryButton.setParams({
        is_visible: isVisible,
      })
    },
  )

  watch(
    () => props.disabled,
    (isDisabled) => {
      secondaryButton.setParams({
        is_active: !isDisabled,
      })
    },
  )

  watch(
    () => props.progress,
    (inProgress) => {
      if (inProgress)
        secondaryButton.showProgress()
      else
        secondaryButton.hideProgress()
    },
  )

  watch(
    () => props.hasShineEffect,
    (hasShineEffect) => {
      secondaryButton.hasShineEffect.value = hasShineEffect
    },
  )

  watch(
    () => props.position,
    (position) => {
      secondaryButton.position.value = position
    },
  )

  secondaryButton.onClick(() => emit('click'))

  onMounted(() => {
    nextTick(() => {
      if (props.progress)
        secondaryButton.showProgress()
      else
        secondaryButton.hideProgress()

      secondaryButton.setParams({
        text: props.text,
        text_color: props.textColor,
        color: props.color,
        has_shine_effect: props.hasShineEffect,
        position: props.position,
        is_active: !props.disabled,
        is_visible: props.visible,
      })
    })
  })

  onBeforeUnmount(() => {
    secondaryButton.hideProgress()
    secondaryButton.hide()
  })
}
</script>
