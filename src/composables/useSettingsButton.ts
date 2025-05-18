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
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, wrapFunction } from '../utils'

type v60 = ReturnType<typeof useSettingsButton60>
type v70 = ReturnType<typeof useSettingsButton70>

export type Schema = {
  '6.0': Merge<Partial<v70>, v60>
  '7.0': Merge<Schema['6.0'], v70>
}

export type SettingsButton =
  | (Schema['6.0'] & { version: BotApiVersionRange<'6.0', BotApiPrevVersion<'7.0'>> })
  | (Schema['7.0'] & { version: BotApiVersionRange<'7.0', LATEST_VERSION> })

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

export function useSettingsButton<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  const version = getHighestVersion(baseVersion, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...useSettingsButton60(),
    ...(isVersionGreaterOrEqual(version, '7.0') && useSettingsButton70()),
  } as VersionedReturnType<SettingsButton, Version, keyof Schema>
}
