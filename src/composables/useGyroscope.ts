import type { GyroscopeCallback, GyroscopeStartParams } from '../sdk'
import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { readonly, ref } from 'vue'
import { onGyroscopeChanged, onGyroscopeFailed, onGyroscopeStarted, onGyroscopeStopped } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, promisify } from '../utils'

type v60 = ReturnType<typeof useGyroscope60>
type v80 = ReturnType<typeof useGyroscope80>

export type Schema = {
  '6.0': Merge<Partial<v80>, v60>
  '8.0': Merge<Schema['6.0'], v80>
}

export type Gyroscope =
  | (Schema['6.0'] & { version: BotApiVersionRange<'6.0', BotApiPrevVersion<'8.0'>> })
  | (Schema['8.0'] & { version: BotApiVersionRange<'8.0', LATEST_VERSION> })

const useStore = defineStore(() => {
  const webApp = getWebApp()

  const isStarted = ref(webApp.Gyroscope.isStarted)
  const x = ref(webApp.Gyroscope.x)
  const y = ref(webApp.Gyroscope.y)
  const z = ref(webApp.Gyroscope.z)

  const updateState = () => {
    isStarted.value = webApp.Gyroscope.isStarted
    x.value = webApp.Gyroscope.x
    y.value = webApp.Gyroscope.y
    z.value = webApp.Gyroscope.z
  }

  return {
    webApp,
    updateState,
    isStarted,
    x,
    y,
    z,
  }
})

function useGyroscope60() {
  const {
    isStarted,
    x,
    y,
    z,
  } = useStore()

  return {
    isStarted: readonly(isStarted),
    x: readonly(x),
    y: readonly(y),
    z: readonly(z),
  }
}

function useGyroscope80() {
  const {
    webApp,
    updateState,
  } = useStore()

  const startAsync = promisify(webApp.Gyroscope.start)

  function start(params: GyroscopeStartParams): ReturnType<typeof startAsync>
  function start(params: GyroscopeStartParams, callback?: GyroscopeCallback['start']): void
  function start(params: GyroscopeStartParams, callback?: GyroscopeCallback['start']): ReturnType<typeof startAsync> | void {
    if (callback)
      webApp.Gyroscope.start(params, callback)
    else
      return startAsync(params)
  }

  const stopAsync = promisify(webApp.Gyroscope.stop)

  function stop(): ReturnType<typeof stopAsync>
  function stop(callback?: GyroscopeCallback['stop']): void
  function stop(callback?: GyroscopeCallback['stop']): ReturnType<typeof stopAsync> | void {
    if (callback)
      webApp.Gyroscope.stop(callback)
    else
      return stopAsync()
  }

  onGyroscopeChanged(updateState)
  onGyroscopeFailed(updateState)

  return {
    start,
    stop,
    onStart: onGyroscopeStarted,
    onStop: onGyroscopeStopped,
    onChange: onGyroscopeChanged,
    onFail: onGyroscopeFailed,
  }
}

export function useGyroscope<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  const version = getHighestVersion(baseVersion, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...useGyroscope60(),
    ...(isVersionGreaterOrEqual(version, '8.0') && useGyroscope80()),
  } as VersionedReturnType<Gyroscope, Version, keyof Schema>
}
