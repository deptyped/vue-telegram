## Post Widget

<br />
<img src="https://core.telegram.org/img/Widget_Post.svg?1" />

[Official documentation](https://core.telegram.org/widgets/post)

A widget to embed messages from public groups and channels on your website.

```vue
<script lang="ts" setup>
import { PostWidget } from 'vue-tg'
</script>

<template>
  <PostWidget url="durov/68" />
</template>
```

#### Props

| Name         | Type    | Description                                                                       |
| ------------ | ------- | --------------------------------------------------------------------------------- |
| url          | string  | URL of the post.                                                                  |
| width        | string  | _Optional._ Width of the widget.                                                  |
| author-photo | boolean | _Optional._ Display the author's photo.                                           |
| color        | string  | _Optional._ Accent color.                                                         |
| dark-color   | string  | _Optional._ Accent color in dark mode.                                            |
| dark         | boolean | _Optional._ Indicates whether to use dark mode.                                   |
| tag          | string  | _Optional._ Specify a custom HTML-tag to wrap the widget. <br/> Default is "div". |
