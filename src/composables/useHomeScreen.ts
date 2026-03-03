import type { WebAppCallback } from '../sdk'
import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { onHomeScreenAdded, onHomeScreenChecked } from '../events'
import { getWebApp } from '../sdk'
import { createCallbackOrPromiseMethod, defineStore, promisify } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v80 = ReturnType<typeof useHomeScreen80>
type AllFeatures = v80

export type Schema = {
  '6.0': SchemaBase<AllFeatures, object>
  '8.0': Merge<Schema['6.0'], v80>
}

export type HomeScreen
  = | SinceUntil<Schema, '6.0', '8.0'>
    | SinceLatest<Schema, '8.0'>

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

  const checkHomeScreenStatus = createCallbackOrPromiseMethod(
    (callback: WebAppCallback['checkHomeScreenStatus']) => webApp.checkHomeScreenStatus(callback),
    promisify,
  )

  return {
    addShortcut: webApp.addToHomeScreen,
    checkShortcutStatus: checkHomeScreenStatus,
    onShortcutAdd: onHomeScreenAdded,
    onShortcutCheck: onHomeScreenChecked,
  }
}

export function useHomeScreen<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  return createVersionedComposable<HomeScreen, Version, keyof Schema>(
    baseVersion,
    webApp,
    () => ({}),
    [
      { since: '8.0', use: useHomeScreen80 },
    ],
  )
}
