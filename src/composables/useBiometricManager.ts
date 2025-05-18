import type { BiometricAuthenticateParams, BiometricManagerCallback, BiometricRequestAccessParams } from '../sdk'
import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { readonly, ref } from 'vue'
import { onBiometricAuthRequested, onBiometricManagerUpdated, onBiometricTokenUpdated } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, promisify, promisifyWithDataObject, promisifyWithNoData, wrapFunction } from '../utils'

type v60 = ReturnType<typeof useBiometricManager60>
type v72 = ReturnType<typeof useBiometricManager72>

export type Schema = {
  '6.0': Merge<Partial<v72>, v60>
  '7.2': Merge<Schema['6.0'], v72>
}

export type BiometricManager =
  | (Schema['6.0'] & { version: BotApiVersionRange<'6.0', BotApiPrevVersion<'7.2'>> })
  | (Schema['7.2'] & { version: BotApiVersionRange<'7.2', LATEST_VERSION> })

const useStore = defineStore(() => {
  const webApp = getWebApp()

  const isInited = ref(webApp.BiometricManager.isInited)
  const isBiometricAvailable = ref(webApp.BiometricManager.isBiometricAvailable)
  const biometricType = ref(webApp.BiometricManager.biometricType)
  const isAccessRequested = ref(webApp.BiometricManager.isAccessRequested)
  const isAccessGranted = ref(webApp.BiometricManager.isAccessGranted)
  const isBiometricTokenSaved = ref(webApp.BiometricManager.isBiometricTokenSaved)
  const deviceId = ref(webApp.BiometricManager.deviceId)

  const updateState = () => {
    isInited.value = webApp.BiometricManager.isInited
    isBiometricAvailable.value = webApp.BiometricManager.isBiometricAvailable
    biometricType.value = webApp.BiometricManager.biometricType
    isAccessRequested.value = webApp.BiometricManager.isAccessRequested
    isAccessGranted.value = webApp.BiometricManager.isAccessGranted
    isBiometricTokenSaved.value = webApp.BiometricManager.isBiometricTokenSaved
    deviceId.value = webApp.BiometricManager.deviceId
  }

  return {
    webApp,
    updateState,
    isInited,
    isBiometricAvailable,
    biometricType,
    isAccessRequested,
    isAccessGranted,
    isBiometricTokenSaved,
    deviceId,
  }
})

function useBiometricManager60() {
  const {
    isInited,
    isBiometricAvailable,
    biometricType,
    isAccessRequested,
    isAccessGranted,
    isBiometricTokenSaved,
    deviceId,
  } = useStore()

  return {
    isInited: readonly(isInited),
    isBiometricAvailable: readonly(isBiometricAvailable),
    biometricType: readonly(biometricType),
    isAccessRequested: readonly(isAccessRequested),
    isAccessGranted: readonly(isAccessGranted),
    isBiometricTokenSaved: readonly(isBiometricTokenSaved),
    deviceId: readonly(deviceId),
  }
}

function useBiometricManager72() {
  const {
    webApp,
    updateState,
  } = useStore()

  const initAsync = promisifyWithNoData(webApp.BiometricManager.init)

  function init(): ReturnType<typeof initAsync>
  function init(callback?: BiometricManagerCallback['init']): void
  function init(callback?: BiometricManagerCallback['init']): ReturnType<typeof initAsync> | void {
    if (callback)
      webApp.BiometricManager.init(callback)
    else
      return initAsync()
  }

  const requestAccessAsync = promisify(webApp.BiometricManager.requestAccess)

  function requestAccess(params: BiometricRequestAccessParams): ReturnType<typeof requestAccessAsync>
  function requestAccess(params: BiometricRequestAccessParams, callback?: BiometricManagerCallback['requestAccess']): void
  function requestAccess(params: BiometricRequestAccessParams, callback?: BiometricManagerCallback['requestAccess']): ReturnType<typeof requestAccessAsync> | void {
    if (callback)
      webApp.BiometricManager.requestAccess(params, callback)
    else
      return requestAccessAsync(params)
  }

  const authenticateAsync = promisifyWithDataObject(
    webApp.BiometricManager.authenticate,
    (isAuthenticated: boolean, token?: string) => ({ isAuthenticated, token }),
  )

  function authenticate(params: BiometricAuthenticateParams): ReturnType<typeof authenticateAsync>
  function authenticate(params: BiometricAuthenticateParams, callback?: BiometricManagerCallback['authenticate']): void
  function authenticate(params: BiometricAuthenticateParams, callback?: BiometricManagerCallback['authenticate']): ReturnType<typeof authenticateAsync> | void {
    if (callback)
      webApp.BiometricManager.authenticate(params, callback)
    else
      return authenticateAsync(params)
  }

  const updateBiometricTokenAsync = promisify(webApp.BiometricManager.updateBiometricToken)

  function updateBiometricToken(token: string,): ReturnType<typeof updateBiometricTokenAsync>
  function updateBiometricToken(token: string, callback?: BiometricManagerCallback['updateBiometricToken']): void
  function updateBiometricToken(token: string, callback?: BiometricManagerCallback['updateBiometricToken']): ReturnType<typeof updateBiometricTokenAsync> | void {
    if (callback)
      webApp.BiometricManager.updateBiometricToken(token, callback)
    else
      return updateBiometricTokenAsync(token)
  }

  onBiometricManagerUpdated(updateState)
  onBiometricAuthRequested(updateState)
  onBiometricTokenUpdated(updateState)

  return {
    init,
    requestAccess,
    authenticate,
    updateToken: updateBiometricToken,
    openSettings: wrapFunction(webApp.BiometricManager.openSettings, {
      omitReturn: true,
    }),
    onManagerUpdate: onBiometricManagerUpdated,
    onAuthRequest: onBiometricAuthRequested,
    onTokenUpdate: onBiometricTokenUpdated,
  }
}

export function useBiometricManager<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  const version = getHighestVersion(baseVersion, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...useBiometricManager60(),
    ...(isVersionGreaterOrEqual(version, '7.2') && useBiometricManager72()),
  } as VersionedReturnType<BiometricManager, Version, keyof Schema>
}
