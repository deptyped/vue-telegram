import type { DeviceOrientationCallback, DeviceOrientationStartParams } from '../sdk'
import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { readonly, ref } from 'vue'
import { onDeviceOrientationChanged, onDeviceOrientationFailed, onDeviceOrientationStarted, onDeviceOrientationStopped } from '../events'
import { getWebApp } from '../sdk'
import { createCallbackOrPromiseMethod, defineStore, promisify } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v60 = ReturnType<typeof useDeviceOrientation60>
type v80 = ReturnType<typeof useDeviceOrientation80>
type AllFeatures = v80

export type Schema = {
  '6.0': SchemaBase<AllFeatures, v60>
  '8.0': Merge<Schema['6.0'], v80>
}

export type DeviceOrientation
  = | SinceUntil<Schema, '6.0', '8.0'>
    | SinceLatest<Schema, '8.0'>

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

  const start = createCallbackOrPromiseMethod(
    (params: DeviceOrientationStartParams, callback: DeviceOrientationCallback['start']) => webApp.DeviceOrientation.start(params, callback),
    promisify,
  )
  const stop = createCallbackOrPromiseMethod(
    (callback: DeviceOrientationCallback['stop']) => webApp.DeviceOrientation.stop(callback),
    promisify,
  )

  onDeviceOrientationStarted(updateState)
  onDeviceOrientationStopped(updateState)
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

export function useDeviceOrientation<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  return createVersionedComposable<DeviceOrientation, Version, keyof Schema>(
    baseVersion,
    webApp,
    useDeviceOrientation60,
    [
      { since: '8.0', use: useDeviceOrientation80 },
    ],
  )
}
