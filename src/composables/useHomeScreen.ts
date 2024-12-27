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
import { defineStore, isVersionGreaterOrEqual, promisify } from '../utils'

type HomeScreenV80 = ReturnType<typeof useHomeScreen80>

type HomeScreenV60to80 = {
  [version in BotApiVersionRange<'6.0', BotApiPrevVersion<'8.0'>>]: Merge<
    Partial<HomeScreenV80>,
    { version: version }
  >;
}

type HomeScreenV80toLatest = {
  [version in BotApiVersionRange<'8.0', LATEST_VERSION>]: Merge<
    HomeScreenV60to80['6.0'],
    { version: version } & HomeScreenV80
  >;
}

type HomeScreen =
  & HomeScreenV60to80
  & HomeScreenV80toLatest

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

export function useHomeScreen<
  Version extends BotApiVersion,
>(options: { version: Version }) {
  const { webApp } = useStore()
  const version = options?.version ?? webApp.version

  return {
    version: webApp.version,
    ...(isVersionGreaterOrEqual(version, '8.0')
      ? useHomeScreen80()
      : { isVersionAtLeast: webApp.isVersionAtLeast }),
  } as VersionedReturnType<HomeScreen, Version, '8.0'>
}
