<template>
  <component :is="tag" :key="key">
    <component
      is="script"
      async
      src="https://telegram.org/js/telegram-widget.js?22"
      :data-telegram-login="botUsername"
      :data-size="size"
      :data-radius="cornerRadius"
      :data-userpic="userPhoto"
      :data-request-access="requestWrite ? 'write' : null"
      :data-onauth="redirectUrl ? null : 'onTelegramAuth(user)'"
      :data-auth-url="redirectUrl"
    />
  </component>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { LoginWidgetUser } from '../types'
import { computed, onMounted } from 'vue'

const props = defineProps({
  botUsername: {
    type: String,
    required: true,
  },
  redirectUrl: {
    type: String,
    default: null,
  },
  size: {
    type: String as PropType<'large' | 'medium' | 'small'>,
    default: null,
  },
  cornerRadius: {
    type: String,
    default: null,
  },
  userPhoto: {
    type: Boolean,
    default: null,
  },
  requestWrite: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: 'div',
  },
})
const emit = defineEmits<{
  (eventName: 'auth', user: LoginWidgetUser): void
}>()
const key = computed(() => JSON.stringify(props))
onMounted(() => {
  // @ts-expect-error interop
  window.onTelegramAuth = user => emit('auth', user)
})
</script>
