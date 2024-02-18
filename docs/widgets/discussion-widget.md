## Discussion Widget 

<br />
<img src="https://core.telegram.org/img/Widget_Comments.svg?1" />

[Official documentation](https://core.telegram.org/widgets/discussion)

A widget to embed discussions from any public channel on your website.

```vue
<script lang="ts" setup>
import { DiscussionWidget } from 'vue-tg'
</script>

<template>
  <DiscussionWidget url="contest/198" />
</template>
```

#### Props

| Name           | Type    | Description                                                                       |
| -------------- | ------- | --------------------------------------------------------------------------------- |
| url            | string  | URL of the discussion.                                                            |
| comments-limit | number  | _Optional._ Limit on the number of comments.                                      |
| height         | string  | _Optional._ Height of the widget.                                                 |
| color          | string  | _Optional._ Accent color.                                                         |
| dark-color     | string  | _Optional._ Accent color in dark mode.                                            |
| dark           | boolean | _Optional._ Indicates whether to use dark mode.                                   |
| colorful       | boolean | _Optional._ Indicates whether to use different colors for names.                  |
| tag            | string  | _Optional._ Specify a custom HTML-tag to wrap the widget. <br/> Default is "div". |
