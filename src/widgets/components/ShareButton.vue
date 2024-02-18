<script lang="ts" setup>
import { computed } from "vue"

const props = defineProps({
  tag: {
    type: String,
    default: "div",
  },
  url: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "medium",
    validator(value) {
      return ["medium", "large"].includes(value as string)
    },
  },
  noText: {
    type: Boolean,
    default: false,
  },
})
const key = computed(() => JSON.stringify(props))
</script>

<template>
  <component :is="tag" :key="key">
    <component
      is="script"
      async
      src="https://telegram.org/js/telegram-widget.js?22"
      :data-telegram-share-url="url"
      :data-size="size"
      :data-comment="comment.length ? comment : null"
      :data-text="noText ? 'notext' : null"
    >
    </component>
  </component>
</template>
