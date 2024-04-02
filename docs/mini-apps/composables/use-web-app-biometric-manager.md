### useWebAppBiometricManager

```ts
import { useWebAppBiometricManager } from 'vue-tg'
```

▸ **useWebAppBiometricManager**(): `Object`

#### Returns

| Name                         | Type                                                                                                                    |
| :--------------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `isBiometricInited`          | `Readonly<Ref<boolean>>`                                                                                                |
| `isBiometricAvailable`       | `Readonly<Ref<boolean>>`                                                                                                |
| `biometricType`              | `Readonly<Ref<"finger" \| "face" \| "unknown">>`                                                                        |
| `isBiometricAccessRequested` | `Readonly<Ref<boolean>>`                                                                                                |
| `isBiometricAccessGranted`   | `Readonly<Ref<boolean>>`                                                                                                |
| `isBiometricTokenSaved`      | `Readonly<Ref<boolean>>`                                                                                                |
| `biometricDeviceId`          | `Readonly<Ref<string>>`                                                                                                 |
| `initBiometric`              | `(callback?: () => void) => void`                                                                                       |
| `requestBiometricAccess`     | `(params: BiometricRequestAccessParams, callback?: (isAccessGranted: boolean) => void) => void`                         |
| `authenticateBiometric`      | `(params: BiometricAuthenticateParams, callback?: (isAuthenticated: boolean, biometricToken?: string) => void) => void` |
| `updateBiometricToken`       | `(token: string, callback?: (applied: boolean) => void) => void`                                                        |
| `openBiometricSettings`      | `() => void`                                                                                                            |
| `onBiometricManagerUpdated`  | `(eventHandler: () => void) => void`                                                                                    |
| `onBiometricAuthRequested`   | `(eventHandler: `[`OnBiometricAuthRequested`](#onbiometricauthrequested)`)) => void`                                    |
| `onBiometricTokenUpdated`    | `(eventHandler: `[`OnBiometricTokenUpdated`](#onbiometrictokenupdated)`)) => void`                                      |
