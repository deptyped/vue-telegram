import type { WebAppCallback } from '../sdk'
import type {
  BotApiPrevVersion,
  BotApiVersion,
  BotApiVersionRange,
  LATEST_VERSION,
  Merge,
  VersionedReturnType,
} from '../types'
import { onHomeScreenAdded, onHomeScreenChecked } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, promisify } from '../utils'

type v80 = ReturnType<typeof useHomeScreen80>

export type Schema = {
  '6.0': Merge<Partial<v80>, object>
  '8.0': Merge<Schema['6.0'], v80>
}

export type HomeScreen =
  | (Schema['6.0'] & { version: BotApiVersionRange<'6.0', BotApiPrevVersion<'8.0'>> })
  | (Schema['8.0'] & { version: BotApiVersionRange<'8.0', LATEST_VERSION> })

const useStore = defineStore(() => {
  const webApp = getWebApp()

  return {
    webApp,
  }
})

function useHomeScreen80() {
  const {
    webApp,
  } = useStore()

  const checkHomeScreenStatusAsync = promisify(webApp.checkHomeScreenStatus)

  function checkHomeScreenStatus(): ReturnType<typeof checkHomeScreenStatusAsync>
  function checkHomeScreenStatus(callback?: WebAppCallback['checkHomeScreenStatus']): void
  function checkHomeScreenStatus(callback?: WebAppCallback['checkHomeScreenStatus']): ReturnType<typeof checkHomeScreenStatusAsync> | void {
    if (callback)
      webApp.checkHomeScreenStatus(callback)
    else
      return checkHomeScreenStatusAsync()
  }

  return {
    addShortcut: webApp.addToHomeScreen,
    checkShortcutStatus: checkHomeScreenStatus,
    onShortcutAdd: onHomeScreenAdded,
    onShortcutCheck: onHomeScreenChecked,
  }
}

export function useHomeScreen<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  const version = getHighestVersion(baseVersion, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...(isVersionGreaterOrEqual(version, '8.0') && useHomeScreen80()),
  } as VersionedReturnType<HomeScreen, Version, keyof Schema>
}
