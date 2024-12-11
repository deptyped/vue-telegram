import { createApp } from 'vue'
import { VueTelegramPlugin } from '../src'
import App from './App.vue'

createApp(App).use(VueTelegramPlugin).mount('#app')
