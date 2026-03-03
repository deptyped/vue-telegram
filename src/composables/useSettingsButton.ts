import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { computed, readonly, ref } from 'vue'
import { onSettingsButtonClicked } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, wrapFunction } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v60 = ReturnType<typeof useSettingsButton60>
type v70 = ReturnType<typeof useSettingsButton70>
type AllFeatures = v70

export type Schema = {
  '6.0': SchemaBase<AllFeatures, v60>
  '7.0': Merge<Schema['6.0'], v70>
}

export type SettingsButton
  = | SinceUntil<Schema, '6.0', '7.0'>
    | SinceLatest<Schema, '7.0'>

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
  return createVersionedComposable<SettingsButton, Version, keyof Schema>(
    baseVersion,
    webApp,
    useSettingsButton60,
    [
      { since: '7.0', use: useSettingsButton70 },
    ],
  )
}
