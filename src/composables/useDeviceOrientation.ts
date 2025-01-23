import type { DeviceOrientationCallback, DeviceOrientationStartParams } from '../sdk'
import type {
  BotApiPrevVersion,
  BotApiVersion,
  BotApiVersionRange,
  LATEST_VERSION,
  Merge,
  VersionedReturnType,
} from '../types'
import { readonly, ref } from 'vue'
import { onDeviceOrientationChanged, onDeviceOrientationFailed, onDeviceOrientationStarted, onDeviceOrientationStopped } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, isVersionGreaterOrEqual, promisify } from '../utils'

type DeviceOrientationV60 = ReturnType<typeof useDeviceOrientation60>
type DeviceOrientationV80 = ReturnType<typeof useDeviceOrientation80>

type DeviceOrientationV60to80 = {
  [version in BotApiVersionRange<'6.0', BotApiPrevVersion<'8.0'>>]: Merge<
    Partial<DeviceOrientationV80>,
    { version: version } & DeviceOrientationV60
  >;
}

type DeviceOrientationV80toLatest = {
  [version in BotApiVersionRange<'8.0', LATEST_VERSION>]: Merge<
    DeviceOrientationV60to80['6.0'],
    { version: version } & DeviceOrientationV80
  >;
}

type DeviceOrientation =
  & DeviceOrientationV60to80
  & DeviceOrientationV80toLatest

const useStore = defineStore(() => {
  const webApp = getWebApp()

  const isStarted = ref(webApp.DeviceOrientation.isStarted)
  const absolute = ref(webApp.DeviceOrientation.absolute)
  const alpha = ref(webApp.DeviceOrientation.alpha)
  const beta = ref(webApp.DeviceOrientation.beta)
  const gamma = ref(webApp.DeviceOrientation.gamma)

  const updateState = () => {
    isStarted.value = webApp.DeviceOrientation.isStarted
    absolute.value = webApp.DeviceOrientation.absolute
    alpha.value = webApp.DeviceOrientation.alpha
    beta.value = webApp.DeviceOrientation.beta
    gamma.value = webApp.DeviceOrientation.gamma
  }

  return {
    webApp,
    updateState,
    isStarted,
    absolute,
    alpha,
    beta,
    gamma,
  }
})

function useDeviceOrientation60() {
  const {
    isStarted,
    absolute,
    alpha,
    beta,
    gamma,
  } = useStore()

  return {
    isStarted: readonly(isStarted),
    absolute: readonly(absolute),
    alpha: readonly(alpha),
    beta: readonly(beta),
    gamma: readonly(gamma),
  }
}

function useDeviceOrientation80() {
  const {
    webApp,
    updateState,
  } = useStore()

  const startAsync = promisify(webApp.DeviceOrientation.start)

  function start(params: DeviceOrientationStartParams): ReturnType<typeof startAsync>
  function start(params: DeviceOrientationStartParams, callback?: DeviceOrientationCallback['start']): void
  function start(params: DeviceOrientationStartParams, callback?: DeviceOrientationCallback['start']): ReturnType<typeof startAsync> | void {
    if (callback)
      webApp.DeviceOrientation.start(params, callback)
    else
      return startAsync(params)
  }

  const stopAsync = promisify(webApp.DeviceOrientation.stop)

  function stop(): ReturnType<typeof stopAsync>
  function stop(callback?: DeviceOrientationCallback['stop']): void
  function stop(callback?: DeviceOrientationCallback['stop']): ReturnType<typeof stopAsync> | void {
    if (callback)
      webApp.DeviceOrientation.stop(callback)
    else
      return stopAsync()
  }

  onDeviceOrientationChanged(updateState)
  onDeviceOrientationFailed(updateState)

  return {
    start,
    stop,
    onStart: onDeviceOrientationStarted,
    onStop: onDeviceOrientationStopped,
    onChange: onDeviceOrientationChanged,
    onFail: onDeviceOrientationFailed,
  }
}

export function useDeviceOrientation<Version extends BotApiVersion>(
  options: {
    version: Version
  },
) {
  const { webApp } = useStore()
  const version = options?.version ?? webApp.version

  return {
    version: webApp.version,
    ...useDeviceOrientation60(),
    ...(isVersionGreaterOrEqual(version, '8.0')
      ? useDeviceOrientation80()
      : { isVersionAtLeast: webApp.isVersionAtLeast }),
  } as VersionedReturnType<DeviceOrientation, Version, '8.0'>
}
