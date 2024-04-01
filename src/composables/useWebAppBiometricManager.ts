import { ref } from "vue"
import { OnBiometricAuthRequested, OnBiometricTokenUpdated } from "~/types"
import { useWebApp } from "./useWebApp"

const isInit = ref(Telegram.WebApp.BiometricManager.isInited)
const isBiometricAvailable = ref(
  Telegram.WebApp.BiometricManager.isBiometricAvailable,
)
const biometricType = ref(Telegram.WebApp.BiometricManager.biometricType)
const isAccessRequested = ref(
  Telegram.WebApp.BiometricManager.isAccessRequested,
)
const isAccessGranted = ref(Telegram.WebApp.BiometricManager.isAccessGranted)
const isBiometricTokenSaved = ref(
  Telegram.WebApp.BiometricManager.isAccessGranted,
)
const deviceId = ref(Telegram.WebApp.BiometricManager.deviceId)

function updateState() {
  isInit.value = Telegram.WebApp.BiometricManager.isInited
  isBiometricAvailable.value =
    Telegram.WebApp.BiometricManager.isBiometricAvailable
  biometricType.value = Telegram.WebApp.BiometricManager.biometricType
  isAccessRequested.value = Telegram.WebApp.BiometricManager.isAccessRequested
  isAccessGranted.value = Telegram.WebApp.BiometricManager.isAccessGranted
  deviceId.value = Telegram.WebApp.BiometricManager.deviceId
  isBiometricTokenSaved.value =
    Telegram.WebApp.BiometricManager.isBiometricTokenSaved
}

const init = (
  ...params: Parameters<typeof Telegram.WebApp.BiometricManager.init>
) => {
  Telegram.WebApp.BiometricManager.init(...params)
  updateState()
}

const requestAccess = (
  ...params: Parameters<typeof Telegram.WebApp.BiometricManager.requestAccess>
) => {
  Telegram.WebApp.BiometricManager.requestAccess(...params)
  updateState()
}

const authenticate = (
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

const openSettings = (
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
    isInit,
    isBiometricAvailable,
    biometricType,
    isAccessRequested,
    isAccessGranted,
    isBiometricTokenSaved,
    deviceId,
    init,
    requestAccess,
    authenticate,
    updateBiometricToken,
    openSettings,
    onBiometricManagerUpdated,
    onBiometricAuthRequested,
    onBiometricTokenUpdated,
  }
}
