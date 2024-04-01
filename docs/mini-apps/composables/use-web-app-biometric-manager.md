### useWebAppBiometricManager

```ts
import { useWebAppBiometricManager } from 'vue-tg'
```

▸ **useWebAppBiometricManager**(): `Object`

#### Returns

| Name                        | Type                                                                                                                    |
|:----------------------------|:------------------------------------------------------------------------------------------------------------------------|
| `isInit`                    | `Ref<boolean>`                                                                                                          |
| `isBiometricAvailable`      | `Ref<boolean>`                                                                                                          |
| `biometricType`             | `Ref<"finger" \| "face" \| "unknown">`                                                                                  |
| `isAccessRequested`         | `Ref<boolean>`                                                                                                          |
| `isAccessGranted`           | `Ref<boolean>`                                                                                                          |
| `isBiometricTokenSaved`     | `Ref<boolean>`                                                                                                          |
| `deviceId`                  | `Ref<string>`                                                                                                           |
| `init`                      | `(callback?: () => void) => void`                                                                                       |
| `requestAccess`             | `(params: BiometricRequestAccessParams, callback?: (isAccessGranted: boolean) => void) => void`                         |
| `authenticate`              | `(params: BiometricAuthenticateParams, callback?: (isAuthenticated: boolean, biometricToken?: string) => void) => void` |
| `updateBiometricToken`      | `(token: string, callback?: (applied: boolean) => void) => void`                                                        |
| `openSettings`              | `() => void`                                                                                                            |
| `onBiometricManagerUpdated` | `(eventHandler: () => void) => void`                                                                                    |
| `onBiometricAuthRequested`  | `(eventHandler: `[`OnBiometricAuthRequested`](#onbiometricauthrequested)`)) => void`                                    |
| `onBiometricTokenUpdated`   | `(eventHandler: `[`OnBiometricTokenUpdated`](#onbiometrictokenupdated)`)) => void`                                      |
