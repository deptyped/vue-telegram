import type { App } from "vue"

import Alert from "./components/Alert.vue"
import BackButton from "./components/BackButton.vue"
import ClosingConfirmation from "./components/ClosingConfirmation.vue"
import Confirm from "./components/Confirm.vue"
import ExpandedViewport from "./components/ExpandedViewport.vue"
import MainButton from "./components/MainButton.vue"
import Popup from "./components/Popup.vue"
import ScanQr from "./components/ScanQr.vue"
import SettingsButton from "./components/SettingsButton.vue"
import ShareWidget from "./widgets/ShareWidget.vue"
import PostWidget from "./widgets/PostWidget.vue"
import LoginWidget from "./widgets/LoginWidget.vue"
import DiscussionWidget from "./widgets/DiscussionWidget.vue"

export {
  Alert,
  BackButton,
  ClosingConfirmation,
  Confirm,
  ExpandedViewport,
  MainButton,
  Popup,
  ScanQr,
  SettingsButton,
  ShareWidget,
  PostWidget,
  LoginWidget,
  DiscussionWidget,
}

export type { LoginWidgetUser } from "./types"

export * from "./composables"

const plugin = {
  install(Vue: App) {
    Vue.component("TgAlert", Alert)
    Vue.component("TgBackButton", BackButton)
    Vue.component("TgClosingConfirmation", ClosingConfirmation)
    Vue.component("TgConfirm", Confirm)
    Vue.component("TgExpandedViewport", ExpandedViewport)
    Vue.component("TgMainButton", MainButton)
    Vue.component("TgPopup", Popup)
    Vue.component("TgScanQr", ScanQr)
    Vue.component("TgSettingsButton", SettingsButton)
    Vue.component("TgShareWidget", ShareWidget)
    Vue.component("TgPostWidget", PostWidget)
    Vue.component("TgLoginWidget", LoginWidget)
    Vue.component("TgDiscussionWidget", DiscussionWidget)
  },
}

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    TgAlert: typeof Alert
    TgBackButton: typeof BackButton
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

export default plugin
