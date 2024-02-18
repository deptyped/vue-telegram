<script lang="ts" setup>
import { computed } from "vue"

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: null,
  },
  authorPhoto: {
    type: Boolean,
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
      :data-telegram-post="url"
      :data-width="width"
      :data-userpic="authorPhoto"
      :data-color="color"
      :data-dark-color="darkColor"
      :data-dark="dark"
    >
    </component>
  </component>
</template>
