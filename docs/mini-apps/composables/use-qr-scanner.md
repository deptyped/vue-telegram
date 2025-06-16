### useQrScanner

```ts
import { useQrScanner } from 'vue-tg'

const qrScanner = useQrScanner()
```
 
| Name               | Description                                                                                                               |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `show`             | <!--@include: @/generated/WebApp-showScanQrPopup.md --><br/><Badge type="info" text="⭐️ async" />                          |
| `close`            | <!--@include: @/generated/WebApp-closeScanQrPopup.md -->                                                                  |
| `onScan`           | <Badge type="tip" text="Bot API 6.4+" /> A method that sets event handler. An alias for <code>onQrTextReceived</code>.    |
| `onClose`          | <Badge type="tip" text="Bot API 7.7+" /> A method that sets event handler. An alias for <code>onScanQrPopupClosed</code>. |
| `version`          | <!--@include: @/generated/WebApp-version.md -->                                                                           |
| `isVersionAtLeast` | <!--@include: @/generated/WebApp-isVersionAtLeast.md -->                                                                  |
