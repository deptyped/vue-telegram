import type { App } from 'vue'

import Alert from './components/Alert.vue'
import BackButton from './components/BackButton.vue'
import Confirm from './components/Confirm.vue'
import MainButton from './components/MainButton.vue'
import Popup from './components/Popup.vue'
import ScanQr from './components/ScanQr.vue'

export {
  Alert,
  BackButton,
  Confirm,
  MainButton,
  Popup,
  ScanQr,
}

export * from './composables'

const plugin = {
  install(Vue: App) {
    Vue.component('TgAlert', Alert)
    Vue.component('TgBackButton', BackButton)
    Vue.component('TgConfirm', Confirm)
    Vue.component('TgMainButton', MainButton)
    Vue.component('TgPopup', Popup)
    Vue.component('TgScanQr', ScanQr)
  },
}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    TgAlert: typeof Alert
    TgBackButton: typeof BackButton
    TgConfirm: typeof Confirm
    TgMainButton: typeof MainButton
    TgPopup: typeof Popup
    TgScanQr: typeof ScanQr
  }
}

export default plugin
