import { computed, ref } from 'vue'
import { onMainButtonClicked } from '../events'
import { WebApp } from '../sdk'
import { defineStore } from '../utils'

const useStore = defineStore(() => {
  const mainButtonText = ref(WebApp.MainButton.text)
  const mainButtonColor = ref(WebApp.MainButton.color)
  const mainButtonTextColor = ref(WebApp.MainButton.textColor)
  const isMainButtonVisible = ref(WebApp.MainButton.isVisible)
  const isMainButtonActive = ref(WebApp.MainButton.isActive)
  const isMainButtonProgressVisible = ref(
    WebApp.MainButton.isProgressVisible,
  )

  function updateState() {
    mainButtonText.value = WebApp.MainButton.text
    mainButtonColor.value = WebApp.MainButton.color
    mainButtonTextColor.value = WebApp.MainButton.textColor
    isMainButtonVisible.value = WebApp.MainButton.isVisible
    isMainButtonActive.value = WebApp.MainButton.isActive
    isMainButtonProgressVisible.value
      = WebApp.MainButton.isProgressVisible
  }

  function setMainButtonText(
    ...params: Parameters<typeof WebApp.MainButton.setText>
  ) {
    WebApp.MainButton.setText(...params)
    updateState()
  }

  function showMainButton(
    ...params: Parameters<typeof WebApp.MainButton.show>
  ) {
    WebApp.MainButton.show(...params)
    updateState()
  }

  function hideMainButton(
    ...params: Parameters<typeof WebApp.MainButton.hide>
  ) {
    WebApp.MainButton.hide(...params)
    updateState()
  }

  function enableMainButton(
    ...params: Parameters<typeof WebApp.MainButton.enable>
  ) {
    WebApp.MainButton.enable(...params)
    updateState()
  }

  function disableMainButton(
    ...params: Parameters<typeof WebApp.MainButton.disable>
  ) {
    WebApp.MainButton.disable(...params)
    updateState()
  }

  function showMainButtonProgress(
    ...params: Parameters<typeof WebApp.MainButton.showProgress>
  ) {
    WebApp.MainButton.showProgress(...params)
    updateState()
  }

  function hideMainButtonProgress(
    ...params: Parameters<typeof WebApp.MainButton.hideProgress>
  ) {
    WebApp.MainButton.hideProgress(...params)
    updateState()
  }

  function setMainButtonParams(
    ...params: Parameters<typeof WebApp.MainButton.setParams>
  ) {
    WebApp.MainButton.setParams(...params)
    updateState()
  }

  return {
    mainButtonText,
    mainButtonColor,
    mainButtonTextColor,
    isMainButtonVisible,
    isMainButtonActive,
    isMainButtonProgressVisible,
    setMainButtonText,
    showMainButton,
    hideMainButton,
    enableMainButton,
    disableMainButton,
    showMainButtonProgress,
    hideMainButtonProgress,
    setMainButtonParams,
  }
})

/**
 * @deprecated Use [`useMainButton`](https://vue-tg.deptyped.com/mini-apps.html#usemainbutton) instead
 */
export function useWebAppMainButton() {
  const {
    mainButtonText,
    mainButtonColor,
    mainButtonTextColor,
    isMainButtonVisible,
    isMainButtonActive,
    isMainButtonProgressVisible,
    setMainButtonText,
    showMainButton,
    hideMainButton,
    enableMainButton,
    disableMainButton,
    showMainButtonProgress,
    hideMainButtonProgress,
    setMainButtonParams,
  } = useStore()

  return {
    mainButtonText: computed({
      get() {
        return mainButtonText.value
      },
      set(text) {
        setMainButtonText(text)
      },
    }),
    mainButtonColor: computed({
      get() {
        return mainButtonColor.value
      },
      set(color) {
        setMainButtonParams({
          color,
        })
      },
    }),
    mainButtonTextColor: computed({
      get() {
        return mainButtonTextColor.value
      },
      set(color) {
        setMainButtonParams({
          text_color: color,
        })
      },
    }),
    isMainButtonVisible: computed({
      get() {
        return isMainButtonVisible.value
      },
      set(isVisible) {
        isVisible ? showMainButton() : hideMainButton()
      },
    }),
    isMainButtonActive: computed({
      get() {
        return isMainButtonActive.value
      },
      set(isActive) {
        isActive ? enableMainButton() : disableMainButton()
      },
    }),
    isMainButtonProgressVisible: computed({
      get() {
        return isMainButtonProgressVisible.value
      },
      set(isProgressVisible) {
        isProgressVisible ? showMainButtonProgress() : hideMainButtonProgress()
      },
    }),
    setMainButtonText,
    showMainButton,
    hideMainButton,
    enableMainButton,
    disableMainButton,
    showMainButtonProgress,
    hideMainButtonProgress,
    setMainButtonParams,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onMainButtonClicked,
  }
}
