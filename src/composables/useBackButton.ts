import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { computed, readonly, ref } from 'vue'
import { onBackButtonClicked } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, wrapFunction } from '../utils'

type v60 = ReturnType<typeof useBackButton60>
type v61 = ReturnType<typeof useBackButton61>

export type Schema = {
  '6.0': Merge<Partial<v61>, v60>
  '6.1': Merge<Schema['6.0'], v61>
}

export type BackButton =
  | (Schema['6.0'] & { version: BotApiVersionRange<'6.0', BotApiPrevVersion<'6.1'>> })
  | (Schema['6.1'] & { version: BotApiVersionRange<'6.1', LATEST_VERSION> })

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

export function useBackButton<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  const version = getHighestVersion(baseVersion, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...useBackButton60(),
    ...(isVersionGreaterOrEqual(version, '6.1') && useBackButton61()),
  } as VersionedReturnType<BackButton, Version, keyof Schema>
}
