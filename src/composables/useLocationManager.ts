import type { LocationManagerCallback } from '../sdk'
import type {
  BotApiPrevVersion,
  BotApiVersion,
  BotApiVersionRange,
  LATEST_VERSION,
  Merge,
  VersionedReturnType,
} from '../types'
import { readonly, ref } from 'vue'
import { onLocationManagerUpdated, onLocationRequested } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, promisify, promisifyWithNoData, wrapFunction } from '../utils'

type v60 = ReturnType<typeof useLocationManager60>
type v80 = ReturnType<typeof useLocationManager80>

export type Schema = {
  '6.0': Merge<Partial<v80>, v60>
  '8.0': Merge<Schema['6.0'], v80>
}

export type LocationManager =
  | (Schema['6.0'] & { version: BotApiVersionRange<'6.0', BotApiPrevVersion<'8.0'>> })
  | (Schema['8.0'] & { version: BotApiVersionRange<'8.0', LATEST_VERSION> })

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

  const initAsync = promisifyWithNoData(webApp.LocationManager.init)

  function init(): ReturnType<typeof initAsync>
  function init(callback?: LocationManagerCallback['init']): void
  function init(callback?: LocationManagerCallback['init']): ReturnType<typeof initAsync> | void {
    if (callback)
      webApp.LocationManager.init(callback)
    else
      return initAsync()
  }

  const getLocationAsync = promisify(webApp.LocationManager.getLocation)

  function getLocation(): ReturnType<typeof getLocationAsync>
  function getLocation(callback?: LocationManagerCallback['getLocation']): void
  function getLocation(callback?: LocationManagerCallback['getLocation']): ReturnType<typeof getLocationAsync> | void {
    if (callback)
      webApp.LocationManager.getLocation(callback)
    else
      return getLocationAsync()
  }

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
  const version = getHighestVersion(baseVersion, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...useLocationManager60(),
    ...(isVersionGreaterOrEqual(version, '8.0') && useLocationManager80()),
  } as VersionedReturnType<LocationManager, Version, keyof Schema>
}
