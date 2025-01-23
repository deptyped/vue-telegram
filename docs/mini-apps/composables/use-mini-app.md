### useMiniApp

```ts
import { useMiniApp } from 'vue-tg'

const miniApp = useMiniApp()
```
 
| Name                           | Description                                                                                                                        |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `initData`                     | <!--@include: @/generated/WebApp-initData.md -->                                                                                   |
| `initDataUnsafe`               | <!--@include: @/generated/WebApp-initDataUnsafe.md -->                                                                             |
| `platform`                     | <!--@include: @/generated/WebApp-platform.md -->                                                                                   |
| `isActive`                     | <!--@include: @/generated/WebApp-isActive.md --><br/><Badge type="info" text="⚡️ readonly reactive" />                              |
| `onActive`                     | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onActivated</code>.                  |
| `onDeactive`                   | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onDeactivated</code>.                |
| `sendData`                     | <!--@include: @/generated/WebApp-sendData.md -->                                                                                   |
| `switchInlineQuery`            | <!--@include: @/generated/WebApp-switchInlineQuery.md -->                                                                          |
| `openLink`                     | <!--@include: @/generated/WebApp-openLink.md -->                                                                                   |
| `openTelegramLink`             | <!--@include: @/generated/WebApp-openTelegramLink.md -->                                                                           |
| `openInvoice`                  | <!--@include: @/generated/WebApp-openInvoice.md --><br/><Badge type="info" text="⭐️ async" />                                       |
| `onInvoiceClose`               | <Badge type="tip" text="Bot API 6.1+" /> A method that sets event handler. An alias for <code>onInvoiceClosed</code>.              |
| `shareToStory`                 | <!--@include: @/generated/WebApp-shareToStory.md -->                                                                               |
| `shareMessage`                 | <!--@include: @/generated/WebApp-shareMessage.md --><br/><Badge type="info" text="⭐️ async" />                                      |
| `onShareMessageSent`           | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onShareMessageSent</code>.           |
| `onShareMessageFail`           | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>shareMessageFailed</code>.           |
| `downloadFile`                 | <!--@include: @/generated/WebApp-downloadFile.md --><br/><Badge type="info" text="⭐️ async" />                                      |
| `onFileDownloadRequest`        | <Badge type="tip" text="Bot API 8.0+" /> A method that sets event handler. An alias for <code>onFileDownloadRequested</code>.      |
| `requestWriteAccess`           | <!--@include: @/generated/WebApp-requestWriteAccess.md --><br/><Badge type="info" text="⭐️ async" />                                |
| `onWriteAccessRequest`         | <Badge type="tip" text="Bot API 6.9+" /> A method that sets event handler. An alias for <code>onWriteAccessRequested</code>.       |
| `requestContact`               | <!--@include: @/generated/WebApp-requestContact.md --><br/><Badge type="info" text="⭐️ async" />                                    |
| `onContactRequest`             | <Badge type="tip" text="Bot API 6.9+" /> A method that sets event handler. An alias for <code>onContactRequested</code>.           |
| `isClosingConfirmationEnabled` | <!--@include: @/generated/WebApp-isClosingConfirmationEnabled.md --><br/><Badge type="info" text="⚡️ reactive" />                   |
| `ready`                        | <!--@include: @/generated/WebApp-ready.md -->                                                                                      |
| `close`                        | <!--@include: @/generated/WebApp-close.md -->                                                                                      |
| `isReady`                      | Boolean indicating if the app is ready. <br/><Badge type="info" text="🔋 custom" /><Badge type="info" text="⚡️ readonly reactive" /> |
| `isPlatform`                   | Function to check if the app is running on a specified platform. <br/><Badge type="info" text="🔋 custom" />                        |
| `version`                      | <!--@include: @/generated/WebApp-version.md -->                                                                                    |
| `isVersionAtLeast`             | <!--@include: @/generated/WebApp-isVersionAtLeast.md -->                                                                           |
