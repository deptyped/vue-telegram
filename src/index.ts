import type { App } from 'vue'

import Alert from './components/Alert.vue'
import BackButton from './components/BackButton.vue'
import BiometricManager from './components/BiometricManager.vue'
import ClosingConfirmation from './components/ClosingConfirmation.vue'
import Confirm from './components/Confirm.vue'
import ExpandedViewport from './components/ExpandedViewport.vue'
import MainButton from './components/MainButton.vue'
import Popup from './components/Popup.vue'
import ScanQr from './components/ScanQr.vue'
import SettingsButton from './components/SettingsButton.vue'
import DiscussionWidget from './widgets/DiscussionWidget.vue'
import LoginWidget from './widgets/LoginWidget.vue'
import PostWidget from './widgets/PostWidget.vue'
import ShareWidget from './widgets/ShareWidget.vue'

export {
  Alert,
  BackButton,
  BiometricManager,
  ClosingConfirmation,
  Confirm,
  DiscussionWidget,
  ExpandedViewport,
  LoginWidget,
  MainButton,
  Popup,
  PostWidget,
  ScanQr,
  SettingsButton,
  ShareWidget,
}

export { useWebApp } from './composables/useWebApp'
export { useWebAppBackButton } from './composables/useWebAppBackButton'
export { useWebAppBiometricManager } from './composables/useWebAppBiometricManager'
export { useWebAppClipboard } from './composables/useWebAppClipboard'
export { useWebAppClosingConfirmation } from './composables/useWebAppClosingConfirmation'
export { useWebAppCloudStorage } from './composables/useWebAppCloudStorage'
export { useWebAppHapticFeedback } from './composables/useWebAppHapticFeedback'
export { useWebAppMainButton } from './composables/useWebAppMainButton'
export { useWebAppNavigation } from './composables/useWebAppNavigation'
export { useWebAppPopup } from './composables/useWebAppPopup'
export { useWebAppQrScanner } from './composables/useWebAppQrScanner'
export { useWebAppRequests } from './composables/useWebAppRequests'
export { useWebAppSendData } from './composables/useWebAppSendData'
export { useWebAppSettingsButton } from './composables/useWebAppSettingsButton'
export { useWebAppShare } from './composables/useWebAppShare'
export { useWebAppTheme } from './composables/useWebAppTheme'
export { useWebAppViewport } from './composables/useWebAppViewport'
export * from './events'
export type { LoginWidgetUser } from './types'

const plugin = {
  install(Vue: App) {
    Vue.component('TgAlert', Alert)
    Vue.component('TgBackButton', BackButton)
    Vue.component('TgBiometricManager', BiometricManager)
    Vue.component('TgClosingConfirmation', ClosingConfirmation)
    Vue.component('TgConfirm', Confirm)
    Vue.component('TgExpandedViewport', ExpandedViewport)
    Vue.component('TgMainButton', MainButton)
    Vue.component('TgPopup', Popup)
    Vue.component('TgScanQr', ScanQr)
    Vue.component('TgSettingsButton', SettingsButton)
    Vue.component('TgShareWidget', ShareWidget)
    Vue.component('TgPostWidget', PostWidget)
    Vue.component('TgLoginWidget', LoginWidget)
    Vue.component('TgDiscussionWidget', DiscussionWidget)
  },
}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    TgAlert: typeof Alert
    TgBackButton: typeof BackButton
    TgBiometricManager: typeof BiometricManager
    TgClosingConfirmation: typeof ClosingConfirmation
    TgConfirm: typeof Confirm
    TgExpandedViewport: typeof ExpandedViewport
    TgMainButton: typeof MainButton
    TgPopup: typeof Popup
    TgScanQr: typeof ScanQr
    TgSettingsButton: typeof SettingsButton
    TgShareWidget: typeof ShareWidget
    TgPostWidget: typeof PostWidget
    TgLoginWidget: typeof LoginWidget
    TgDiscussionWidget: typeof DiscussionWidget
  }
}

export { plugin as VueTelegramPlugin }
