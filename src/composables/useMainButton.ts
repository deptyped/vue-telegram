import type {
  BotApiPrevVersion,
  BotApiVersion,
  BotApiVersionRange,
  LATEST_VERSION,
  Merge,
  VersionedReturnType,
} from '../types'
import { computed, readonly, ref } from 'vue'
import { onMainButtonClicked } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, isVersionGreaterOrEqual, wrapFunction } from '../utils'

type MainButtonV60 = ReturnType<typeof useMainButton60>
type MainButtonV710 = ReturnType<typeof useMainButton710>

type MainButtonV60to710 = {
  [version in BotApiVersionRange<'6.0', BotApiPrevVersion<'7.10'>>]: Merge<
    Partial<MainButtonV710>,
    { version: version } & MainButtonV60
  >;
}

type MainButtonV710toLatest = {
  [version in BotApiVersionRange<'7.10', LATEST_VERSION>]: Merge<
    MainButtonV60to710['6.0'],
    { version: version } & MainButtonV710
  >;
}

type MainButton =
  & MainButtonV60to710
  & MainButtonV710toLatest

const useStore = defineStore(() => {
  const webApp = getWebApp()
  const text = ref(webApp.MainButton.text)
  const color = ref(webApp.MainButton.color)
  const textColor = ref(webApp.MainButton.textColor)
  const isVisible = ref(webApp.MainButton.isVisible)
  const isActive = ref(webApp.MainButton.isActive)
  const isProgressVisible = ref(webApp.MainButton.isProgressVisible)
  const hasShineEffect = ref(webApp.MainButton.hasShineEffect)

  const updateState = () => {
    text.value = webApp.MainButton.text
    color.value = webApp.MainButton.color
    textColor.value = webApp.MainButton.textColor
    isVisible.value = webApp.MainButton.isVisible
    isActive.value = webApp.MainButton.isActive
    isProgressVisible.value = webApp.MainButton.isProgressVisible
    hasShineEffect.value = webApp.MainButton.hasShineEffect
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
  }
})

function useMainButton60() {
  const {
    webApp,
    updateState,
    text,
    color,
    textColor,
    isVisible,
    isActive,
    isProgressVisible,
    hasShineEffect,
  } = useStore()

  const showProgress = wrapFunction(webApp.MainButton.showProgress, {
    hooks: {
      after: updateState,
    },
    omitReturn: true,
  })
  const hideProgress = wrapFunction(webApp.MainButton.hideProgress, {
    hooks: {
      after: updateState,
    },
    omitReturn: true,
  })
  const setParams = wrapFunction(webApp.MainButton.setParams, {
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
    hasShineEffect: readonly(hasShineEffect),
    show: wrapFunction(webApp.MainButton.show, {
      hooks: {
        after: updateState,
      },
      omitReturn: true,
    }),
    hide: wrapFunction(webApp.MainButton.hide, {
      hooks: {
        after: updateState,
      },
      omitReturn: true,
    }),
    enable: wrapFunction(webApp.MainButton.enable, {
      hooks: {
        after: updateState,
      },
      omitReturn: true,
    }),
    disable: wrapFunction(webApp.MainButton.disable, {
      hooks: {
        after: updateState,
      },
      omitReturn: true,
    }),
    showProgress,
    hideProgress,
    setParams,
    onClick: onMainButtonClicked,
  }
}

function useMainButton710() {
  const {
    webApp,
    updateState,
    hasShineEffect,
  } = useStore()

  const setParams = wrapFunction(webApp.MainButton.setParams, {
    hooks: {
      after: updateState,
    },
    omitReturn: true,
  })

  return {
    hasShineEffect: computed({
      get() {
        return hasShineEffect.value
      },
      set(hasShineEffect) {
        setParams({ has_shine_effect: hasShineEffect })
      },
    }),
  }
}

export function useMainButton<Version extends BotApiVersion>(
  options: {
    version: Version
  },
) {
  const { webApp } = useStore()
  const version = options?.version ?? webApp.version

  return {
    version: webApp.version,
    ...useMainButton60(),
    ...(isVersionGreaterOrEqual(version, '7.10')
      ? useMainButton710()
      : { isVersionAtLeast: webApp.isVersionAtLeast }),
  } as VersionedReturnType<MainButton, Version, '7.10'>
}
