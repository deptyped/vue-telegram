import type { LocationManagerCallback } from '../sdk'
import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { readonly, ref } from 'vue'
import { onLocationManagerUpdated, onLocationRequested } from '../events'
import { getWebApp } from '../sdk'
import { createCallbackOrPromiseMethod, defineStore, promisify, promisifyWithNoData, wrapFunction } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v60 = ReturnType<typeof useLocationManager60>
type v80 = ReturnType<typeof useLocationManager80>
type AllFeatures = v80

export type Schema = {
  '6.0': SchemaBase<AllFeatures, v60>
  '8.0': Merge<Schema['6.0'], v80>
}

export type LocationManager
  = | SinceUntil<Schema, '6.0', '8.0'>
    | SinceLatest<Schema, '8.0'>

const useStore = defineStore(() => {
  const webApp = getWebApp()

  const isInited = ref(webApp.LocationManager.isInited)
  const isLocationAvailable = ref(webApp.LocationManager.isLocationAvailable)
  const isAccessRequested = ref(webApp.LocationManager.isAccessRequested)
  const isAccessGranted = ref(webApp.LocationManager.isAccessGranted)

  const updateState = () => {
    isInited.value = webApp.LocationManager.isInited
    isLocationAvailable.value = webApp.LocationManager.isLocationAvailable
    isAccessRequested.value = webApp.LocationManager.isAccessRequested
    isAccessGranted.value = webApp.LocationManager.isAccessGranted
  }

  return {
    webApp,
    updateState,
    isInited,
    isLocationAvailable,
    isAccessRequested,
    isAccessGranted,
  }
})

function useLocationManager60() {
  const {
    isInited,
    isLocationAvailable,
    isAccessRequested,
    isAccessGranted,
  } = useStore()

  return {
    isInited: readonly(isInited),
    isLocationAvailable: readonly(isLocationAvailable),
    isAccessRequested: readonly(isAccessRequested),
    isAccessGranted: readonly(isAccessGranted),
  }
}

function useLocationManager80() {
  const {
    webApp,
    updateState,
  } = useStore()

  const init = createCallbackOrPromiseMethod(
    (callback: LocationManagerCallback['init']) => webApp.LocationManager.init(callback),
    promisifyWithNoData,
  )
  const getLocation = createCallbackOrPromiseMethod(
    (callback: LocationManagerCallback['getLocation']) => webApp.LocationManager.getLocation(callback),
    promisify,
  )

  onLocationManagerUpdated(updateState)
  onLocationRequested(updateState)

  return {
    init,
    getLocation,
    openSettings: wrapFunction(webApp.LocationManager.openSettings, {
      omitReturn: true,
    }),
    onManagerUpdate: onLocationManagerUpdated,
    onRequest: onLocationRequested,
  }
}

export function useLocationManager<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  return createVersionedComposable<LocationManager, Version, keyof Schema>(
    baseVersion,
    webApp,
    useLocationManager60,
    [
      { since: '8.0', use: useLocationManager80 },
    ],
  )
}
