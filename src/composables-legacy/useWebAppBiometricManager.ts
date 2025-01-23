import { useBiometricManager } from '../composables/useBiometricManager'
import { onBiometricAuthRequested, onBiometricManagerUpdated, onBiometricTokenUpdated } from '../events'

/**
 * @deprecated Use [`useBiometricManager`](https://vue-tg.deptyped.com/mini-apps.html#usebiometricmanager) instead
 */
export function useWebAppBiometricManager() {
  const {
    isInited,
    isBiometricAvailable,
    biometricType,
    isAccessRequested,
    isAccessGranted,
    deviceId,
    isBiometricTokenSaved,
    init,
    authenticate,
    requestAccess,
    openSettings,
    updateToken,
  } = useBiometricManager({ version: '8.0' })

  return {
    isBiometricInited: isInited,
    isBiometricAvailable,
    biometricType,
    isBiometricAccessRequested: isAccessRequested,
    isBiometricAccessGranted: isAccessGranted,
    isBiometricTokenSaved,
    biometricDeviceId: deviceId,
    initBiometric: init,
    requestBiometricAccess: requestAccess,
    authenticateBiometric: authenticate,
    updateBiometricToken: updateToken,
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
