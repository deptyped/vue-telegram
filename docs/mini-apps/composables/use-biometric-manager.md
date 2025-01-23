### useBiometricManager

```ts
import { useBiometricManager } from 'vue-tg'

const biometricManager = useBiometricManager()
```

| Name                    | Type                                                                                                                            |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `isInited`              | <!--@include: @/generated/BiometricManager-isInited.md --> <br/> <Badge type="info" text="⚡️ readonly reactive" />               |
| `isBiometricAvailable`  | <!--@include: @/generated/BiometricManager-isBiometricAvailable.md --> <br/> <Badge type="info" text="⚡️ readonly reactive" />   |
| `biometricType`         | <!--@include: @/generated/BiometricManager-biometricType.md --><br/> <Badge type="info" text="⚡️ readonly reactive" />           |
| `isAccessRequested`     | <!--@include: @/generated/BiometricManager-isAccessRequested.md --><br/> <Badge type="info" text="⚡️ readonly reactive" />       |
| `isAccessGranted`       | <!--@include: @/generated/BiometricManager-isAccessGranted.md --><br/> <Badge type="info" text="⚡️ readonly reactive" />         |
| `isBiometricTokenSaved` | <!--@include: @/generated/BiometricManager-isBiometricTokenSaved.md --><br/> <Badge type="info" text="⚡️ readonly reactive" />   |
| `deviceId`              | <!--@include: @/generated/BiometricManager-deviceId.md --><br/> <Badge type="info" text="⚡️ readonly reactive" />                |
| `init`                  | <!--@include: @/generated/BiometricManager-init.md --><br/><Badge type="info" text="⭐️ async" />                                 |
| `requestAccess`         | <!--@include: @/generated/BiometricManager-requestAccess.md --><br/><Badge type="info" text="⭐️ async" />                        |
| `onManagerUpdate`       | <Badge type="tip" text="Bot API 7.2+" /> A method that sets event handler. An alias for <code>onBiometricManagerUpdated</code>. |
| `authenticate`          | <!--@include: @/generated/BiometricManager-authenticate.md --><br/><Badge type="info" text="⭐️ async" />                         |
| `onAuthRequest`         | <Badge type="tip" text="Bot API 7.2+" /> A method that sets event handler. An alias for <code>onBiometricAuthRequested</code>.  |
| `updateToken`           | <!--@include: @/generated/BiometricManager-updateBiometricToken.md --><br/><Badge type="info" text="⭐️ async" />                 |
| `onTokenUpdate`         | <Badge type="tip" text="Bot API 7.2+" /> A method that sets event handler. An alias for <code>onBiometricTokenUpdated</code>.   |
| `openSettings`          | <!--@include: @/generated/BiometricManager-openSettings.md -->                                                                  |
| `version`               | <!--@include: @/generated/WebApp-version.md -->                                                                                 |
| `isVersionAtLeast`      | <!--@include: @/generated/WebApp-isVersionAtLeast.md -->                                                                        |
