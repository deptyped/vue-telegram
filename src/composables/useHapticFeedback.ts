import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, wrapFunction } from '../utils'

export type v61 = ReturnType<typeof useHapticFeedback61>

export type Schema = {
  '6.0': Merge<Partial<v61>, object>
  '6.1': Merge<Schema['6.0'], v61>
}

export type HapticFeedback =
  | (Schema['6.0'] & { version: BotApiVersionRange<'6.0', BotApiPrevVersion<'6.1'>> })
  | (Schema['6.1'] & { version: BotApiVersionRange<'6.1', LATEST_VERSION> })

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
  const version = getHighestVersion(baseVersion, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...(isVersionGreaterOrEqual(version, '6.1') && useHapticFeedback61()),
  } as VersionedReturnType<HapticFeedback, Version, keyof Schema>
}
