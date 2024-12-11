<template>
  <component :is="tag" :key="key">
    <component
      is="script"
      async
      src="https://telegram.org/js/telegram-widget.js?22"
      :data-telegram-share-url="url"
      :data-size="size"
      :data-comment="comment"
      :data-text="noLabel ? 'notext' : null"
    />
  </component>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    default: null,
  },
  size: {
    type: String as PropType<'large' | 'medium'>,
    default: null,
  },
  noLabel: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: String,
    default: 'div',
  },
})
const key = computed(() => JSON.stringify(props))
</script>
