## Share Widget 

<br />
<img src="https://core.telegram.org/img/Widget_Share.svg?1" />

[Official documentation](https://core.telegram.org/widgets/share)

A widget to let users forward content from your website or app to their friends, channels or Saved Messages on Telegram.

```vue
<script lang="ts" setup>
import { ShareWidget } from 'vue-tg'
</script>

<template>
  <ShareWidget 
    url="https://vue-tg.pages.dev" 
    comment="Telegram integration for Vue" 
  />
</template>
```

#### Props

| Name     | Type    | Description                                                                       |
| -------- | ------- | --------------------------------------------------------------------------------- |
| url      | string  | URL to share.                                                                     |
| comment  | string  | _Optional._ Additional comment to be included with the shared URL.                |
| size     | string  | _Optional._ Size of the widget ("large", "medium"). <br/> Default is "medium".    |
| no-label | boolean | _Optional._ If set to true, hides the label text on the widget button.            |
| tag      | string  | _Optional._ Specify a custom HTML-tag to wrap the widget. <br/> Default is "div". |
