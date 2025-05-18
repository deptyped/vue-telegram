import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { computed, readonly, ref } from 'vue'
import { onSecondaryButtonClicked } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, wrapFunction } from '../utils'

type v60 = ReturnType<typeof useSecondaryButton60>
type v710 = ReturnType<typeof useSecondaryButton710>

export type Schema = {
  '6.0': Merge<Partial<v710>, v60>
  '7.10': Merge<Schema['6.0'], v710>
}

export type SecondaryButton =
  | (Schema['6.0'] & { version: BotApiVersionRange<'6.0', BotApiPrevVersion<'7.10'>> })
  | (Schema['7.10'] & { version: BotApiVersionRange<'7.10', LATEST_VERSION> })

const useStore = defineStore(() => {
  const webApp = getWebApp()
  const text = ref(webApp.SecondaryButton.text)
  const color = ref(webApp.SecondaryButton.color)
  const textColor = ref(webApp.SecondaryButton.textColor)
  const isVisible = ref(webApp.SecondaryButton.isVisible)
  const isActive = ref(webApp.SecondaryButton.isActive)
  const isProgressVisible = ref(webApp.SecondaryButton.isProgressVisible)
  const hasShineEffect = ref(webApp.SecondaryButton.hasShineEffect)
  const position = ref(webApp.SecondaryButton.position)

  const updateState = () => {
    text.value = webApp.SecondaryButton.text
    color.value = webApp.SecondaryButton.color
    textColor.value = webApp.SecondaryButton.textColor
    isVisible.value = webApp.SecondaryButton.isVisible
    isActive.value = webApp.SecondaryButton.isActive
    isProgressVisible.value = webApp.SecondaryButton.isProgressVisible
    hasShineEffect.value = webApp.SecondaryButton.hasShineEffect
    position.value = webApp.SecondaryButton.position
  }

  return {
    webApp,
    updateState,
    text,
    color,
    textColor,
    isVisible,
    isActive,
    isProgressVisible,
    hasShineEffect,
    position,
  }
})

function useSecondaryButton60() {
  const {
    text,
    color,
    textColor,
    isVisible,
    isActive,
    isProgressVisible,
    hasShineEffect,
    position,
  } = useStore()

  return {
    text: readonly(text),
    color: readonly(color),
    textColor: readonly(textColor),
    isVisible: readonly(isVisible),
    isActive: readonly(isActive),
    isProgressVisible: readonly(isProgressVisible),
    hasShineEffect: readonly(hasShineEffect),
    position: readonly(position),
  }
}

function useSecondaryButton710() {
  const {
    webApp,
    text,
    color,
    textColor,
    isVisible,
    isActive,
    isProgressVisible,
    hasShineEffect,
    position,
    updateState,
  } = useStore()

  const showProgress = wrapFunction(webApp.SecondaryButton.showProgress, {
    hooks: {
      after: updateState,
    },
    omitReturn: true,
  })
  const hideProgress = wrapFunction(webApp.SecondaryButton.hideProgress, {
    hooks: {
      after: updateState,
    },
    omitReturn: true,
  })
  const setParams = wrapFunction(webApp.SecondaryButton.setParams, {
    hooks: {
      after: updateState,
    },
    omitReturn: true,
  })

  return {
    text: computed({
      get() {
        return text.value
      },
      set(text) {
        setParams({ text })
      },
    }),
    color: computed({
      get() {
        return color.value
      },
      set(color) {
        setParams({ color })
      },
    }),
    textColor: computed({
      get() {
        return textColor.value
      },
      set(textColor) {
        setParams({ text_color: textColor })
      },
    }),
    isVisible: computed({
      get() {
        return isVisible.value
      },
      set(isVisible) {
        setParams({ is_visible: isVisible })
      },
    }),
    isActive: computed({
      get() {
        return isActive.value
      },
      set(isActive) {
        setParams({ is_active: isActive })
      },
    }),
    isProgressVisible: computed({
      get() {
        return isProgressVisible.value
      },
      set(isProgressVisible) {
        if (isProgressVisible)
          showProgress()
        else
          hideProgress()
      },
    }),
    hasShineEffect: computed({
      get() {
        return hasShineEffect.value
      },
      set(hasShineEffect) {
        setParams({ has_shine_effect: hasShineEffect })
      },
    }),
    position: computed({
      get() {
        return position.value
      },
      set(position) {
        setParams({ position })
      },
    }),
    show: wrapFunction(webApp.SecondaryButton.show, {
      hooks: {
        after: updateState,
      },
      omitReturn: true,
    }),
    hide: wrapFunction(webApp.SecondaryButton.hide, {
      hooks: {
        after: updateState,
      },
      omitReturn: true,
    }),
    enable: wrapFunction(webApp.SecondaryButton.enable, {
      hooks: {
        after: updateState,
      },
      omitReturn: true,
    }),
    disable: wrapFunction(webApp.SecondaryButton.disable, {
      hooks: {
        after: updateState,
      },
      omitReturn: true,
    }),
    showProgress,
    hideProgress,
    setParams,
    onClick: onSecondaryButtonClicked,
  }
}

export function useSecondaryButton<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  const version = getHighestVersion(baseVersion, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...useSecondaryButton60(),
    ...(isVersionGreaterOrEqual(version, '7.10') && useSecondaryButton710()),
  } as VersionedReturnType<SecondaryButton, Version, keyof Schema>
}
