import type { BiometricAuthenticateParams, BiometricManagerCallback, BiometricRequestAccessParams } from '../sdk'
import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { readonly, ref } from 'vue'
import { onBiometricAuthRequested, onBiometricManagerUpdated, onBiometricTokenUpdated } from '../events'
import { getWebApp } from '../sdk'
import { createCallbackOrPromiseMethod, defineStore, promisify, promisifyWithDataObject, promisifyWithNoData, wrapFunction } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v60 = ReturnType<typeof useBiometricManager60>
type v72 = ReturnType<typeof useBiometricManager72>
type AllFeatures = v72

export type Schema = {
  '6.0': SchemaBase<AllFeatures, v60>
  '7.2': Merge<Schema['6.0'], v72>
}

export type BiometricManager
  = | SinceUntil<Schema, '6.0', '7.2'>
    | SinceLatest<Schema, '7.2'>

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

  const init = createCallbackOrPromiseMethod(
    (callback: BiometricManagerCallback['init']) => webApp.BiometricManager.init(callback),
    promisifyWithNoData,
  )
  const requestAccess = createCallbackOrPromiseMethod(
    (params: BiometricRequestAccessParams, callback: BiometricManagerCallback['requestAccess']) =>
      webApp.BiometricManager.requestAccess(params, callback),
    promisify,
  )

  const promisifyAuthenticate = (
    method: (params: BiometricAuthenticateParams, callback: BiometricManagerCallback['authenticate']) => void,
  ) => promisifyWithDataObject(
    method,
    (isAuthenticated: boolean, token?: string) => ({ isAuthenticated, token }),
  )

  const authenticate = createCallbackOrPromiseMethod(
    (params: BiometricAuthenticateParams, callback: BiometricManagerCallback['authenticate']) =>
      webApp.BiometricManager.authenticate(params, callback),
    promisifyAuthenticate,
  )
  const updateBiometricToken = createCallbackOrPromiseMethod(
    (token: string, callback: BiometricManagerCallback['updateBiometricToken']) =>
      webApp.BiometricManager.updateBiometricToken(token, callback),
    promisify,
  )

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
  return createVersionedComposable<BiometricManager, Version, keyof Schema>(
    baseVersion,
    webApp,
    useBiometricManager60,
    [
      { since: '7.2', use: useBiometricManager72 },
    ],
  )
}
