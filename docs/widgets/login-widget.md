## Login Widget 

<br />
<img src="https://core.telegram.org/img/Widget_Login.svg?1" />

[Official documentation](https://core.telegram.org/widgets/login)

A widget to authorize users on your website.

```vue
<script lang="ts" setup>
import { LoginWidget } from 'vue-tg'
import type { LoginWidgetUser } from 'vue-tg'

function handleUserAuth(user: LoginWidgetUser) {
  // ...
}
</script>

<template>
  <LoginWidget 
    bot-username="samplebot"
    @auth="handleUserAuth"
  />
</template>
```

#### Props

| Name          | Type    | Description                                                                            |
| ------------- | ------- | -------------------------------------------------------------------------------------- |
| bot-username  | string  | Username of the bot.                                                                   |
| redirect-url  | string  | _Optional._ URL to redirect to after authentication.                                   |
| size          | string  | _Optional._ Size of the widget ("large", "medium", "small"). <br/> Default is "large". |
| corner-radius | number  | _Optional._ Corner radius of the button.                                               |
| user-photo    | boolean | _Optional._ Display the user's profile photo.                                          |
| request-write | boolean | _Optional._ Request access to send messages from the bot.                              |
| tag           | string  | _Optional._ Specify a custom HTML-tag to wrap the widget. <br/> Default is "div".      |
 
#### Events

| Name | Type                              | Description                                                                                                     |
| ---- | --------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| auth | `(user: LoginWidgetUser) => void` | Emits when the user is successfully authorized. <br/> **Note:** does not emit when a redirect URL is specified. |
