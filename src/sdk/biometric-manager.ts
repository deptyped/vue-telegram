export type BiometricManager = {
  isInited: boolean
  isBiometricAvailable: boolean
  biometricType: 'finger' | 'face' | 'unknown'
  isAccessRequested: boolean
  isAccessGranted: boolean
  isBiometricTokenSaved: boolean
  deviceId: string
  init: (callback?: BiometricManagerCallback['init']) => BiometricManager
  requestAccess: (
    params: BiometricRequestAccessParams,
    callback?: BiometricManagerCallback['requestAccess']
  ) => BiometricManager
  authenticate: (
    params: BiometricAuthenticateParams,
    callback?: BiometricManagerCallback['authenticate']
  ) => BiometricManager
  updateBiometricToken: (
    token: string,
    callback?: BiometricManagerCallback['updateBiometricToken']
  ) => BiometricManager
  openSettings: () => BiometricManager
}

export type BiometricManagerCallback = {
  init: () => void
  requestAccess: (isGranted: boolean) => void
  authenticate: (isAuthenticated: boolean, token?: string) => void
  updateBiometricToken: (isUpdated: boolean) => void
}

export type BiometricRequestAccessParams = {
  reason?: string
}

export type BiometricAuthenticateParams = {
  reason?: string
}
