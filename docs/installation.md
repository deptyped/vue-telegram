---
outline: deep
next: 'test'
---

# Installation

Install package:

```bash
npm i vue-tg
```

To connect your Mini App to the Telegram client, place the script `telegram-web-app.js` in the `<head>` tag before any other scripts, using this code:

```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```

Done!

[Mini Apps Documentation](/mini-apps)

[Widgets Documentation](/widgets)

## Global Aliases

Register on Vue instance:

```ts
import VueTelegram from 'vue-tg'

Vue.use(VueTelegram)
```

After that, you can use global aliases for components:

```vue
<!-- Without alias -->

<script lang="ts" setup>
import { Alert } from 'vue-tg'
</script>

<template>
  <Alert message="Hello!" />
</template>

<!-- Same using an alias of the component -->

<template>
  <tg-alert message="Hello!" />
</template>
```

| Component                                             | Alias                     |
| ----------------------------------------------------- | ------------------------- |
| [Alert](/mini-apps#alert)                             | `tg-alert`                |
| [BackButton](/mini-apps#backbutton)                   | `tg-back-button`          |
| [BiometricManager](/mini-apps#biometricmanager)       | `tg-biometric-manager`    |
| [ClosingConfirmation](/mini-apps#closingconfirmation) | `tg-closing-confirmation` |
| [Confirm](/mini-apps#confirm)                         | `tg-confirm`              |
| [ExpandedViewport](/mini-apps#expandedviewport)       | `tg-expanded-viewport`    |
| [MainButton](/mini-apps#mainbutton)                   | `tg-main-button`          |
| [Popup](/mini-apps#Popup)                             | `tg-popup`                |
| [ScanQr](/mini-apps#scanqr)                           | `tg-scan-qr`              |
| [SettingsButton](/mini-apps#settingsbutton)           | `tg-settings-button`      |
| [ShareWidget](/widgets#share-widget)                  | `tg-share-widget`         |
| [PostWidget](/widgets#post-widget)                    | `tg-post-widget`          |
| [LoginWidget](/widgets#login-widget)                  | `tg-login-widget`         |
| [DiscussionWidget](/widgets#discussion-widget)        | `tg-discussion-widget`    |

## Using with [Nuxt 3](https://nuxt.com/)

Install package:

```bash
npm i vue-tg
```

Include the Telegram web app script in the `<head>` section of your Nuxt application by adding it to the `nuxt.config.ts` file:

::: code-group
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  app: {
    head: {
      script: [{ src: 'https://telegram.org/js/telegram-web-app.js' }],
    },
  },
})
```
:::

Next, create a `MiniApp.vue` component and import the necessary components from `vue-tg` and utilize them in your component:

::: code-group
```vue [MiniApp.vue]
<script lang="ts" setup>
import { MainButton, useWebAppPopup } from 'vue-tg'

const { showAlert } = useWebAppPopup()
</script>

<template>
  <MainButton text="Open alert" @click="() => showAlert('Hello!')" />
</template>
```
:::

Import the `MiniApp.vue` component into your `App.vue` file and wrap it inside a [`<ClientOnly>`](https://nuxt.com/docs/api/components/client-only) component. This ensures that the component is only rendered on the client-side:

::: code-group
```vue [App.vue]
<template>
  <NuxtPage />
  <ClientOnly>
    <MiniApp />
  </ClientOnly>
</template>

<script setup lang="ts">
import MiniApp from '~/components/MiniApp.vue'
</script>
```
:::

You can manage the state within the `MiniApp.vue` component using Nuxt's built-in `useState` or any other state management library like `pinia`.
