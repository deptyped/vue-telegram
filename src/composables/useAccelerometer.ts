import type { AccelerometerCallback, AccelerometerStartParams } from '../sdk'
import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { readonly, ref } from 'vue'
import { onAccelerometerChanged, onAccelerometerFailed, onAccelerometerStarted, onAccelerometerStopped } from '../events'
import { getWebApp } from '../sdk'
import { createCallbackOrPromiseMethod, defineStore, promisify } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v60 = ReturnType<typeof useAccelerometer60>
type v80 = ReturnType<typeof useAccelerometer80>
type AllFeatures = v80

export type Schema = {
  '6.0': SchemaBase<AllFeatures, v60>
  '8.0': Merge<Schema['6.0'], v80>
}

export type Accelerometer
  = | SinceUntil<Schema, '6.0', '8.0'>
    | SinceLatest<Schema, '8.0'>

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

  const start = createCallbackOrPromiseMethod(
    (params: AccelerometerStartParams, callback: AccelerometerCallback['start']) => webApp.Accelerometer.start(params, callback),
    promisify,
  )
  const stop = createCallbackOrPromiseMethod(
    (callback: AccelerometerCallback['stop']) => webApp.Accelerometer.stop(callback),
    promisify,
  )

  onAccelerometerStarted(updateState)
  onAccelerometerStopped(updateState)
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

export function useAccelerometer<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  return createVersionedComposable<Accelerometer, Version, keyof Schema>(
    baseVersion,
    webApp,
    useAccelerometer60,
    [
      { since: '8.0', use: useAccelerometer80 },
    ],
  )
}
