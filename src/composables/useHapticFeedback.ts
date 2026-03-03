import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { getWebApp } from '../sdk'
import { defineStore, wrapFunction } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

export type v61 = ReturnType<typeof useHapticFeedback61>
type AllFeatures = v61

export type Schema = {
  '6.0': SchemaBase<AllFeatures, object>
  '6.1': Merge<Schema['6.0'], v61>
}

export type HapticFeedback
  = | SinceUntil<Schema, '6.0', '6.1'>
    | SinceLatest<Schema, '6.1'>

const useStore = defineStore(() => {
  const webApp = getWebApp()

  return {
    webApp,
  }
})

function useHapticFeedback61() {
  const {
    webApp,
  } = useStore()

  const impactOccurred = wrapFunction(webApp.HapticFeedback.impactOccurred, {
    omitReturn: true,
  })
  const notificationOccurred = wrapFunction(webApp.HapticFeedback.notificationOccurred, {
    omitReturn: true,
  })
  const selectionChanged = wrapFunction(webApp.HapticFeedback.selectionChanged, {
    omitReturn: true,
  })

  return {
    impactOccurred,
    notificationOccurred,
    selectionChanged,
  }
}

export function useHapticFeedback<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  return createVersionedComposable<HapticFeedback, Version, keyof Schema>(
    baseVersion,
    webApp,
    () => ({}),
    [
      { since: '6.1', use: useHapticFeedback61 },
    ],
  )
}
