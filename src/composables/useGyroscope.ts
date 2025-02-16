import type { GyroscopeCallback, GyroscopeStartParams } from '../sdk'
import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { readonly, ref } from 'vue'
import { onGyroscopeChanged, onGyroscopeFailed, onGyroscopeStarted, onGyroscopeStopped } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, promisify } from '../utils'

type GyroscopeV60 = ReturnType<typeof useGyroscope60>
type GyroscopeV80 = ReturnType<typeof useGyroscope80>

type GyroscopeV60to80 = {
  [version in BotApiVersionRange<'6.0', BotApiPrevVersion<'8.0'>>]: Merge<
    Partial<GyroscopeV80>,
    { version: version } & GyroscopeV60
  >;
}

type GyroscopeV80toLatest = {
  [version in BotApiVersionRange<'8.0', LATEST_VERSION>]: Merge<
    GyroscopeV60to80['6.0'],
    { version: version } & GyroscopeV80
  >;
}

type Gyroscope =
  & GyroscopeV60to80
  & GyroscopeV80toLatest

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

export function useGyroscope<Version extends BotApiVersion>(
  options: {
    version: Version
  },
) {
  const { webApp } = useStore()
  const version = getHighestVersion(options?.version, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...useGyroscope60(),
    ...(isVersionGreaterOrEqual(version, '8.0') && useGyroscope80()),
  } as VersionedReturnType<Gyroscope, Version, '8.0'>
}
