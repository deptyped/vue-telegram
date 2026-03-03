import type { WebAppCallback } from '../src/sdk'
import { createCallbackOrPromiseMethod, promisify, promisifyWithNoData } from '../src/utils'

// Promise + callback overload with one argument.
const showConfirm = createCallbackOrPromiseMethod(
  (message: string, callback: WebAppCallback['showConfirm']) => callback(message.length > 0),
  promisify,
)

const promiseResult: Promise<boolean> = showConfirm('ok')
const callbackResult: void = showConfirm('ok', (value) => {
  const _narrowed: boolean = value
  return _narrowed
})

void promiseResult
void callbackResult

// Promise + callback overload without arguments.
const readClipboard = createCallbackOrPromiseMethod(
  (callback: WebAppCallback['readTextFromClipboard']) => callback('text'),
  promisify,
)

const promiseClipboard: Promise<string> = readClipboard()
const callbackClipboard: void = readClipboard((value) => {
  const _narrowed: string = value
  return _narrowed
})

void promiseClipboard
void callbackClipboard

// Void promise type support for no-data callbacks.
const showAlert = createCallbackOrPromiseMethod(
  (message: string, callback: WebAppCallback['showAlert']) => callback(),
  promisifyWithNoData,
)

const promiseNoData: Promise<void> = showAlert('hello')
const callbackNoData: void = showAlert('hello', () => {})

void promiseNoData
void callbackNoData
