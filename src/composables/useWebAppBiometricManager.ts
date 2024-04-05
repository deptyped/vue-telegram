import { readonly, ref } from "vue"
import {
  OnBiometricAuthRequested,
  OnBiometricTokenUpdated,
  OnEventOptions,
} from "~/types"
import { useWebApp } from "./useWebApp"

const {
  init,
  requestAccess,
  authenticate,
  updateBiometricToken,
  openSettings,
} = Telegram.WebApp.BiometricManager

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
  isBiometricAvailable.value =
    Telegram.WebApp.BiometricManager.isBiometricAvailable
  biometricType.value = Telegram.WebApp.BiometricManager.biometricType
  isBiometricAccessRequested.value =
    Telegram.WebApp.BiometricManager.isAccessRequested
  isBiometricAccessGranted.value =
    Telegram.WebApp.BiometricManager.isAccessGranted
  biometricDeviceId.value = Telegram.WebApp.BiometricManager.deviceId
  isBiometricTokenSaved.value =
    Telegram.WebApp.BiometricManager.isBiometricTokenSaved
}

export function useWebAppBiometricManager() {
  const { onEvent } = useWebApp()

  const onBiometricManagerUpdated = (
    eventHandler: () => void,
    options?: OnEventOptions,
  ) => onEvent("biometricManagerUpdated", eventHandler, options)
  const onBiometricAuthRequested = (
    eventHandler: OnBiometricAuthRequested,
    options?: OnEventOptions,
  ) => onEvent("biometricAuthRequested", eventHandler, options)
  const onBiometricTokenUpdated = (
    eventHandler: OnBiometricTokenUpdated,
    options?: OnEventOptions,
  ) => onEvent("biometricTokenUpdated", eventHandler, options)

  onBiometricManagerUpdated(updateState)

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
