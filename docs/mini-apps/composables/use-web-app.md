### useWebApp

```ts twoslash
// Hover to inspect type
import { useWebApp } from 'vue-tg'
```

| Name                 | Description                                                                                                                        |
| :------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `initData`           | <!--@include: @/generated/WebApp-initData.md -->                                                                                   |
| `initDataUnsafe`     | <!--@include: @/generated/WebApp-initDataUnsafe.md -->                                                                             |
| `version`            | <!--@include: @/generated/WebApp-version.md -->                                                                                    |
| `platform`           | <!--@include: @/generated/WebApp-platform.md -->                                                                                   |
| `isVersionAtLeast`   | <!--@include: @/generated/WebApp-isVersionAtLeast.md -->                                                                           |
| `onEvent`            | <!--@include: @/generated/WebApp-onEvent.md -->                                                                                    |
| `sendData`           | <!--@include: @/generated/WebApp-sendData.md -->                                                                                   |
| `ready`              | <!--@include: @/generated/WebApp-ready.md -->                                                                                      |
| `close`              | <!--@include: @/generated/WebApp-close.md -->                                                                                      |
| `isReady`            | Boolean indicating if the app is ready. <br/><Badge type="info" text="🔋 custom" /><Badge type="info" text="⚡️ readonly reactive" /> |
| `isPlatform`         | Function to check if the app is running on a specified platform. <br/><Badge type="info" text="🔋 custom" />                        |
| `isPlatformUnknown`  | Boolean indicating if the platform is unknown. <br/><Badge type="info" text="🔋 custom" />                                          |
| `isFeatureSupported` | Function to check if a specified feature is supported. <br/><Badge type="info" text="🔋 custom" />                                  |
