import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { computed, readonly, ref } from 'vue'
import { onBackButtonClicked } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, wrapFunction } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v60 = ReturnType<typeof useBackButton60>
type v61 = ReturnType<typeof useBackButton61>
type AllFeatures = v61

export type Schema = {
  '6.0': SchemaBase<AllFeatures, v60>
  '6.1': Merge<Schema['6.0'], v61>
}

export type BackButton
  = | SinceUntil<Schema, '6.0', '6.1'>
    | SinceLatest<Schema, '6.1'>

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
  return createVersionedComposable<BackButton, Version, keyof Schema>(
    baseVersion,
    webApp,
    useBackButton60,
    [
      { since: '6.1', use: useBackButton61 },
    ],
  )
}
