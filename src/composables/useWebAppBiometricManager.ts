import { readonly, ref } from "vue"
import { OnBiometricAuthRequested, OnBiometricTokenUpdated } from "~/types"
import { useWebApp } from "./useWebApp"

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

const initBiometric = (
  ...params: Parameters<typeof Telegram.WebApp.BiometricManager.init>
) => {
  Telegram.WebApp.BiometricManager.init(...params)
  updateState()
}

const requestBiometricAccess = (
  ...params: Parameters<typeof Telegram.WebApp.BiometricManager.requestAccess>
) => {
  Telegram.WebApp.BiometricManager.requestAccess(...params)
  updateState()
}

const authenticateBiometric = (
  ...params: Parameters<typeof Telegram.WebApp.BiometricManager.authenticate>
) => {
  Telegram.WebApp.BiometricManager.authenticate(...params)
  updateState()
}

const updateBiometricToken = (
  ...params: Parameters<
    typeof Telegram.WebApp.BiometricManager.updateBiometricToken
  >
) => {
  Telegram.WebApp.BiometricManager.updateBiometricToken(...params)
  updateState()
}

const openBiometricSettings = (
  ...params: Parameters<typeof Telegram.WebApp.BiometricManager.openSettings>
) => {
  Telegram.WebApp.BiometricManager.openSettings(...params)
  updateState()
}

export function useWebAppBiometricManager() {
  const { onEvent } = useWebApp()

  const onBiometricManagerUpdated = (eventHandler: () => void) =>
    onEvent("biometricManagerUpdated", eventHandler)
  const onBiometricAuthRequested = (eventHandler: OnBiometricAuthRequested) =>
    onEvent("biometricAuthRequested", eventHandler)
  const onBiometricTokenUpdated = (eventHandler: OnBiometricTokenUpdated) =>
    onEvent("biometricTokenUpdated", eventHandler)

  onBiometricManagerUpdated(updateState)
  onBiometricAuthRequested(updateState)
  onBiometricTokenUpdated(updateState)

  return {
    isBiometricInited: readonly(isBiometricInited),
    isBiometricAvailable: readonly(isBiometricAvailable),
    biometricType: readonly(biometricType),
    isBiometricAccessRequested: readonly(isBiometricAccessRequested),
    isBiometricAccessGranted: readonly(isBiometricAccessGranted),
    isBiometricTokenSaved: readonly(isBiometricTokenSaved),
    biometricDeviceId: readonly(biometricDeviceId),
    initBiometric,
    requestBiometricAccess,
    authenticateBiometric,
    updateBiometricToken,
    openBiometricSettings,
    onBiometricManagerUpdated,
    onBiometricAuthRequested,
    onBiometricTokenUpdated,
  }
}
