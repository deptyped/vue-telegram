import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, wrapFunction } from '../utils'

type HapticFeedbackV61 = ReturnType<typeof useHapticFeedback61>

type HapticFeedbackV60to61 = {
  [version in BotApiVersionRange<'6.0', BotApiPrevVersion<'6.1'>>]: Merge<
    Partial<HapticFeedbackV61>,
    { version: version }
  >;
}

type HapticFeedbackV61toLatest = {
  [version in BotApiVersionRange<'6.1', LATEST_VERSION>]: Merge<
    HapticFeedbackV60to61['6.0'],
    { version: version } & HapticFeedbackV61
  >;
}

type HapticFeedback =
  & HapticFeedbackV60to61
  & HapticFeedbackV61toLatest

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

export function useHapticFeedback<Version extends BotApiVersion>(
  options: {
    version: Version
  },
) {
  const { webApp } = useStore()
  const version = getHighestVersion(options?.version, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...(isVersionGreaterOrEqual(version, '6.1') && useHapticFeedback61()),
  } as VersionedReturnType<HapticFeedback, Version, '6.1'>
}
