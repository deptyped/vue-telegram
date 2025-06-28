<template></template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useQrScanner } from '../composables/useQrScanner'

const props = defineProps({
  text: { type: String },
})
const emit = defineEmits<{
  (eventName: 'result', data: string): void
}>()

const qrScanner = useQrScanner('6.0')

if (qrScanner.isVersionAtLeast('6.4')) {
  onMounted(() => {
    qrScanner.show(
      {
        text: props.text,
      },
      data => emit('result', data),
    )
  })

  onBeforeUnmount(() => {
    qrScanner.close()
  })
}
</script>
