import type {
  BotApiPrevVersion,
  BotApiVersion,
  BotApiVersionRange,
  LATEST_VERSION,
  Merge,
  VersionedReturnType,
} from '../types'
import { computed, readonly, ref } from 'vue'
import { onSettingsButtonClicked } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, isVersionGreaterOrEqual, wrapFunction } from '../utils'

type SettingsButtonV60 = ReturnType<typeof useSettingsButton60>
type SettingsButtonV70 = ReturnType<typeof useSettingsButton70>

type SettingsButtonV60to70 = {
  [version in BotApiVersionRange<'6.0', BotApiPrevVersion<'7.0'>>]: Merge<
    & Partial<SettingsButtonV70>,
    { version: version } & SettingsButtonV60
  >;
}

type SettingsButtonV70toLatest = {
  [version in BotApiVersionRange<'7.0', LATEST_VERSION>]: Merge<
    SettingsButtonV60to70['6.0'],
    { version: version } & SettingsButtonV70
  >;
}

type SettingsButton =
  & SettingsButtonV60to70
  & SettingsButtonV70toLatest

const useStore = defineStore(() => {
  const webApp = getWebApp()
  const isVisible = ref(webApp.SettingsButton.isVisible)

  const updateState = () => {
    isVisible.value = webApp.SettingsButton.isVisible
  }

  return {
    webApp,
    isVisible,
    updateState,
  }
})

function useSettingsButton60() {
  const {
    isVisible,
  } = useStore()

  return {
    isVisible: readonly(isVisible),
  }
}

function useSettingsButton70() {
  const {
    webApp,
    isVisible,
    updateState,
  } = useStore()

  const show = wrapFunction(webApp.SettingsButton.show, {
    hooks: {
      after: updateState,
    },
    omitReturn: true,
  })
  const hide = wrapFunction(webApp.SettingsButton.hide, {
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
    onClick: onSettingsButtonClicked,
  }
}

export function useSettingsButton<Version extends BotApiVersion>(
  options?: { version?: Version },
) {
  const { webApp } = useStore()
  const version = options?.version ?? webApp.version

  return {
    version: webApp.version,
    ...useSettingsButton60(),
    ...(isVersionGreaterOrEqual(version, '7.0')
      ? useSettingsButton70()
      : { isVersionAtLeast: webApp.isVersionAtLeast }),
  } as VersionedReturnType<SettingsButton, Version, '7.0'>
}
