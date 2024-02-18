<script lang="ts" setup>
import { computed } from "vue"

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  commentsLimit: {
    type: Number,
    default: null,
  },
  height: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
  darkColor: {
    type: String,
    default: null,
  },
  dark: {
    type: Boolean,
    default: null,
  },
  colorful: {
    type: Boolean,
    default: null,
  },
  tag: {
    type: String,
    default: "div",
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
      :data-telegram-discussion="url"
      :data-comments-limit="commentsLimit"
      :data-height="height"
      :data-color="color"
      :data-dark-color="darkColor"
      :data-dark="dark"
      :data-colorful="colorful"
    >
    </component>
  </component>
</template>
