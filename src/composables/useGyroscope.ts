import type { GyroscopeCallback, GyroscopeStartParams } from '../sdk'
import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { readonly, ref } from 'vue'
import { onGyroscopeChanged, onGyroscopeFailed, onGyroscopeStarted, onGyroscopeStopped } from '../events'
import { getWebApp } from '../sdk'
import { createCallbackOrPromiseMethod, defineStore, promisify } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v60 = ReturnType<typeof useGyroscope60>
type v80 = ReturnType<typeof useGyroscope80>
type AllFeatures = v80

export type Schema = {
  '6.0': SchemaBase<AllFeatures, v60>
  '8.0': Merge<Schema['6.0'], v80>
}

export type Gyroscope
  = | SinceUntil<Schema, '6.0', '8.0'>
    | SinceLatest<Schema, '8.0'>

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

  const start = createCallbackOrPromiseMethod(
    (params: GyroscopeStartParams, callback: GyroscopeCallback['start']) => webApp.Gyroscope.start(params, callback),
    promisify,
  )

  const stop = createCallbackOrPromiseMethod(
    (callback: GyroscopeCallback['stop']) => webApp.Gyroscope.stop(callback),
    promisify,
  )

  onGyroscopeStarted(updateState)
  onGyroscopeStopped(updateState)
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
  return createVersionedComposable<Gyroscope, Version, keyof Schema>(
    baseVersion,
    webApp,
    useGyroscope60,
    [
      { since: '8.0', use: useGyroscope80 },
    ],
  )
}
