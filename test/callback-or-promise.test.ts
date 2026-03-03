import { describe, expect, it, vi } from 'vitest'
import { createCallbackOrPromiseMethod, promisify, promisifyWithNoData } from '../src/utils'

describe('createCallbackOrPromiseMethod', () => {
  it('supports callback and promise styles for methods with args', async () => {
    const method = vi.fn((message: string, callback: (result: boolean) => void) => callback(message.length > 0))
    const call = createCallbackOrPromiseMethod(method, promisify)

    await expect(call('ok')).resolves.toBe(true)

    const callback = vi.fn()
    expect(call('ok', callback)).toBeUndefined()
    expect(callback).toHaveBeenCalledWith(true)
  })

  it('supports callback and promise styles for methods without args', async () => {
    const method = vi.fn((callback: () => void) => callback())
    const call = createCallbackOrPromiseMethod(method, promisifyWithNoData)

    await expect(call()).resolves.toBeUndefined()

    const callback = vi.fn()
    expect(call(callback)).toBeUndefined()
    expect(callback).toHaveBeenCalled()
  })
})
