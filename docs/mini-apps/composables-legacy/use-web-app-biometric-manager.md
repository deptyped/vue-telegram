### ~~useWebAppBiometricManager~~

::: danger Deprecated
Use [useBiometricManager](#usebiometricmanager) instead.
:::

```ts twoslash
// Hover to inspect type
import { useWebAppBiometricManager } from 'vue-tg'
```

| Name                         | Type                                                                                                                          |
| :--------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `isBiometricInited`          | <!--@include: @/generated/BiometricManager-isInited.md --> <br/> <Badge type="info" text="⚡️ readonly reactive" />             |
| `isBiometricAvailable`       | <!--@include: @/generated/BiometricManager-isBiometricAvailable.md --> <br/> <Badge type="info" text="⚡️ readonly reactive" /> |
| `biometricType`              | <!--@include: @/generated/BiometricManager-biometricType.md --><br/> <Badge type="info" text="⚡️ readonly reactive" />         |
| `isBiometricAccessRequested` | <!--@include: @/generated/BiometricManager-isAccessRequested.md --><br/> <Badge type="info" text="⚡️ readonly reactive" />     |
| `isBiometricAccessGranted`   | <!--@include: @/generated/BiometricManager-isAccessGranted.md --><br/> <Badge type="info" text="⚡️ readonly reactive" />       |
| `isBiometricTokenSaved`      | <!--@include: @/generated/BiometricManager-isBiometricTokenSaved.md --><br/> <Badge type="info" text="⚡️ readonly reactive" /> |
| `biometricDeviceId`          | <!--@include: @/generated/BiometricManager-deviceId.md --><br/> <Badge type="info" text="⚡️ readonly reactive" />              |
| `initBiometric`              | <!--@include: @/generated/BiometricManager-init.md -->                                                                        |
| `requestBiometricAccess`     | <!--@include: @/generated/BiometricManager-requestAccess.md -->                                                               |
| `authenticateBiometric`      | <!--@include: @/generated/BiometricManager-authenticate.md -->                                                                |
| `updateBiometricToken`       | <!--@include: @/generated/BiometricManager-updateBiometricToken.md -->                                                        |
| `openBiometricSettings`      | <!--@include: @/generated/BiometricManager-openSettings.md -->                                                                |
| `onManagerUpdated`           | <Badge type="tip" text="Bot API 7.2+" /> A method that sets the `biometricManagerUpdated` [event handler](#event-handling).   |
| `onAuthRequested`            | <Badge type="tip" text="Bot API 7.2+" /> A method that sets the `biometricAuthRequested` [event handler](#event-handling).    |
| `onTokenUpdated`             | <Badge type="tip" text="Bot API 7.2+" /> A method that sets the `biometricTokenUpdated` [event handler](#event-handling).     |
