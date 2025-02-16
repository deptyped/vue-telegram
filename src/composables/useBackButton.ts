import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { computed, readonly, ref } from 'vue'
import { onBackButtonClicked } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, wrapFunction } from '../utils'

type BackButtonV60 = ReturnType<typeof useBackButton60>
type BackButtonV61 = ReturnType<typeof useBackButton61>

type BackButtonV60to61 = {
  [version in BotApiVersionRange<'6.0', BotApiPrevVersion<'6.1'>>]: Merge<
    Partial<BackButtonV61>,
    { version: version } & BackButtonV60
  >;
}

type BackButtonV61toLatest = {
  [version in BotApiVersionRange<'6.1', LATEST_VERSION>]: Merge<
    BackButtonV60to61['6.0'],
    { version: version } & BackButtonV61
  >;
}

type BackButton =
  & BackButtonV60to61
  & BackButtonV61toLatest

const useStore = defineStore(() => {
  const webApp = getWebApp()
  const isVisible = ref(webApp.BackButton.isVisible)

  const updateState = () => {
    isVisible.value = webApp.BackButton.isVisible
  }

  return {
    webApp,
    isVisible,
    updateState,
  }
})

function useBackButton60() {
  const {
    isVisible,
  } = useStore()

  return {
    isVisible: readonly(isVisible),
  }
}

function useBackButton61() {
  const {
    webApp,
    isVisible,
    updateState,
  } = useStore()

  const show = wrapFunction(webApp.BackButton.show, {
    hooks: {
      after: updateState,
    },
    omitReturn: true,
  })
  const hide = wrapFunction(webApp.BackButton.hide, {
    hooks: {
      after: updateState,
    },
    omitReturn: true,
  })

  return {
    isVisible: computed({
      get() {
        return isVisible.value
      },
      set(isVisible) {
        if (isVisible)
          show()
        else
          hide()
      },
    }),
    show,
    hide,
    onClick: onBackButtonClicked,
  }
}

export function useBackButton<Version extends BotApiVersion>(
  options: {
    version: Version
  },
) {
  const { webApp } = useStore()
  const version = getHighestVersion(options?.version, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...useBackButton60(),
    ...(isVersionGreaterOrEqual(version, '6.1') && useBackButton61()),
  } as VersionedReturnType<BackButton, Version, '6.1'>
}
