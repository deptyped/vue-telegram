import type { OnEventOptions } from '../types'
import { readonly, ref } from 'vue'
import { defineStore } from '../utils'
import { useWebApp } from './useWebApp'

const useStore = defineStore(() => {
  const isBiometricInited = ref(Telegram.WebApp.BiometricManager.isInited)
  const isBiometricAvailable = ref(
    Telegram.WebApp.BiometricManager.isBiometricAvailable,
  )
  const biometricType = ref(Telegram.WebApp.BiometricManager.biometricType)
  const isBiometricAccessRequested = ref(
    Telegram.WebApp.BiometricManager.isAccessRequested,
  )
  const isBiometricAccessGranted = ref(
    Telegram.WebApp.BiometricManager.isAccessGranted,
  )
  const isBiometricTokenSaved = ref(
    Telegram.WebApp.BiometricManager.isAccessGranted,
  )
  const biometricDeviceId = ref(Telegram.WebApp.BiometricManager.deviceId)

  function updateState() {
    isBiometricInited.value = Telegram.WebApp.BiometricManager.isInited
    isBiometricAvailable.value
      = Telegram.WebApp.BiometricManager.isBiometricAvailable
    biometricType.value = Telegram.WebApp.BiometricManager.biometricType
    isBiometricAccessRequested.value
      = Telegram.WebApp.BiometricManager.isAccessRequested
    isBiometricAccessGranted.value
      = Telegram.WebApp.BiometricManager.isAccessGranted
    biometricDeviceId.value = Telegram.WebApp.BiometricManager.deviceId
    isBiometricTokenSaved.value
      = Telegram.WebApp.BiometricManager.isBiometricTokenSaved
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

  const { onEvent } = useWebApp()

  const onBiometricManagerUpdated = (
    eventHandler: () => void,
    options?: OnEventOptions,
  ) => onEvent('biometricManagerUpdated', eventHandler, options)
  const onBiometricAuthRequested = (
    eventHandler: BiometricAuthRequestedCallback,
    options?: OnEventOptions,
  ) => onEvent('biometricAuthRequested', eventHandler, options)
  const onBiometricTokenUpdated = (
    eventHandler: BiometricTokenUpdatedCallback,
    options?: OnEventOptions,
  ) => onEvent('biometricTokenUpdated', eventHandler, options)

  onBiometricManagerUpdated(updateState)

  const {
    init,
    requestAccess,
    authenticate,
    updateBiometricToken,
    openSettings,
  } = Telegram.WebApp.BiometricManager

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
    onBiometricManagerUpdated,
    onBiometricAuthRequested,
    onBiometricTokenUpdated,
  }
}
