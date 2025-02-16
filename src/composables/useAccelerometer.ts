import type { AccelerometerCallback, AccelerometerStartParams } from '../sdk'
import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { readonly, ref } from 'vue'
import { onAccelerometerChanged, onAccelerometerFailed, onAccelerometerStarted, onAccelerometerStopped } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, promisify } from '../utils'

type AccelerometerV60 = ReturnType<typeof useAccelerometer60>
type AccelerometerV80 = ReturnType<typeof useAccelerometer80>

type AccelerometerV60to80 = {
  [version in BotApiVersionRange<'6.0', BotApiPrevVersion<'8.0'>>]: Merge<
    Partial<AccelerometerV80>,
    { version: version } & AccelerometerV60
  >;
}

type AccelerometerV80toLatest = {
  [version in BotApiVersionRange<'8.0', LATEST_VERSION>]: Merge<
    AccelerometerV60to80['6.0'],
    { version: version } & AccelerometerV80
  >;
}

type Accelerometer =
  & AccelerometerV60to80
  & AccelerometerV80toLatest

const useStore = defineStore(() => {
  const webApp = getWebApp()

  const isStarted = ref(webApp.Accelerometer.isStarted)
  const x = ref(webApp.Accelerometer.x)
  const y = ref(webApp.Accelerometer.y)
  const z = ref(webApp.Accelerometer.z)

  const updateState = () => {
    isStarted.value = webApp.Accelerometer.isStarted
    x.value = webApp.Accelerometer.x
    y.value = webApp.Accelerometer.y
    z.value = webApp.Accelerometer.z
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

function useAccelerometer60() {
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

function useAccelerometer80() {
  const {
    webApp,
    updateState,
  } = useStore()

  const startAsync = promisify(webApp.Accelerometer.start)

  function start(params: AccelerometerStartParams): ReturnType<typeof startAsync>
  function start(params: AccelerometerStartParams, callback?: AccelerometerCallback['start']): void
  function start(params: AccelerometerStartParams, callback?: AccelerometerCallback['start']): ReturnType<typeof startAsync> | void {
    if (callback)
      webApp.Accelerometer.start(params, callback)
    else
      return startAsync(params)
  }

  const stopAsync = promisify(webApp.Accelerometer.stop)

  function stop(): ReturnType<typeof stopAsync>
  function stop(callback?: AccelerometerCallback['stop']): void
  function stop(callback?: AccelerometerCallback['stop']): ReturnType<typeof stopAsync> | void {
    if (callback)
      webApp.Accelerometer.stop(callback)
    else
      return stopAsync()
  }

  onAccelerometerChanged(updateState)
  onAccelerometerFailed(updateState)

  return {
    start,
    stop,
    onStart: onAccelerometerStarted,
    onStop: onAccelerometerStopped,
    onChange: onAccelerometerChanged,
    onFail: onAccelerometerFailed,
  }
}

export function useAccelerometer<Version extends BotApiVersion>(
  options: {
    version: Version
  },
) {
  const { webApp } = useStore()
  const version = getHighestVersion(options?.version, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...useAccelerometer60(),
    ...(isVersionGreaterOrEqual(version, '8.0') && useAccelerometer80()),
  } as VersionedReturnType<Accelerometer, Version, '8.0'>
}
