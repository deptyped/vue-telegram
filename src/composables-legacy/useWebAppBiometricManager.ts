import { readonly, ref } from 'vue'
import { onBiometricAuthRequested, onBiometricManagerUpdated, onBiometricTokenUpdated } from '../events'
import { WebApp } from '../sdk'
import { defineStore } from '../utils'

const useStore = defineStore(() => {
  const isBiometricInited = ref(WebApp.BiometricManager.isInited)
  const isBiometricAvailable = ref(
    WebApp.BiometricManager.isBiometricAvailable,
  )
  const biometricType = ref(WebApp.BiometricManager.biometricType)
  const isBiometricAccessRequested = ref(
    WebApp.BiometricManager.isAccessRequested,
  )
  const isBiometricAccessGranted = ref(
    WebApp.BiometricManager.isAccessGranted,
  )
  const isBiometricTokenSaved = ref(
    WebApp.BiometricManager.isAccessGranted,
  )
  const biometricDeviceId = ref(WebApp.BiometricManager.deviceId)

  function updateState() {
    isBiometricInited.value = WebApp.BiometricManager.isInited
    isBiometricAvailable.value
      = WebApp.BiometricManager.isBiometricAvailable
    biometricType.value = WebApp.BiometricManager.biometricType
    isBiometricAccessRequested.value
      = WebApp.BiometricManager.isAccessRequested
    isBiometricAccessGranted.value
      = WebApp.BiometricManager.isAccessGranted
    biometricDeviceId.value = WebApp.BiometricManager.deviceId
    isBiometricTokenSaved.value
      = WebApp.BiometricManager.isBiometricTokenSaved
  }

  return {
    isBiometricInited,
    isBiometricAvailable,
    biometricType,
    isBiometricAccessRequested,
    isBiometricAccessGranted,
    biometricDeviceId,
    isBiometricTokenSaved,
    updateState,
  }
})

/**
 * @deprecated Use [`useBiometricManager`](https://vue-tg.deptyped.com/mini-apps.html#usebiometricmanager) instead
 */
export function useWebAppBiometricManager() {
  const {
    isBiometricInited,
    isBiometricAvailable,
    biometricType,
    isBiometricAccessRequested,
    isBiometricAccessGranted,
    biometricDeviceId,
    isBiometricTokenSaved,
    updateState,
  } = useStore()

  onBiometricManagerUpdated(updateState)

  const {
    init,
    requestAccess,
    authenticate,
    updateBiometricToken,
    openSettings,
  } = WebApp.BiometricManager

  return {
    isBiometricInited: readonly(isBiometricInited),
    isBiometricAvailable: readonly(isBiometricAvailable),
    biometricType: readonly(biometricType),
    isBiometricAccessRequested: readonly(isBiometricAccessRequested),
    isBiometricAccessGranted: readonly(isBiometricAccessGranted),
    isBiometricTokenSaved: readonly(isBiometricTokenSaved),
    biometricDeviceId: readonly(biometricDeviceId),
    initBiometric: init,
    requestBiometricAccess: requestAccess,
    authenticateBiometric: authenticate,
    updateBiometricToken,
    openBiometricSettings: openSettings,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onBiometricManagerUpdated,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onBiometricAuthRequested,
    /**
     * @deprecated import directly from `vue-tg` instead.
     */
    onBiometricTokenUpdated,
  }
}
