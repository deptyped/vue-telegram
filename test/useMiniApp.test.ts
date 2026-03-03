import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isVersionGreaterOrEqual } from '../src/utils/version'

function createMockWebApp(version: string) {
  return {
    initData: '',
    initDataUnsafe: {},
    version,
    platform: 'webk',
    isActive: true,
    isClosingConfirmationEnabled: false,
    isVersionAtLeast: (target: string) => isVersionGreaterOrEqual(version, target),
    sendData: vi.fn(),
    openLink: vi.fn(),
    openTelegramLink: vi.fn(),
    ready: vi.fn(),
    close: vi.fn(),
    enableClosingConfirmation: vi.fn(),
    disableClosingConfirmation: vi.fn(),
    switchInlineQuery: vi.fn(),
    shareToStory: vi.fn(),
    hideKeyboard: vi.fn(),
    openInvoice: vi.fn((_: string, callback?: (status: string) => void) => callback?.('paid')),
    requestContact: vi.fn((callback?: (granted: boolean) => void) => callback?.(true)),
    requestWriteAccess: vi.fn((callback?: (granted: boolean) => void) => callback?.(true)),
    shareMessage: vi.fn((_: string, callback?: (success: boolean) => void) => callback?.(true)),
    downloadFile: vi.fn((_: unknown, callback?: (success: boolean) => void) => callback?.(true)),
    onEvent: vi.fn(),
    offEvent: vi.fn(),
  }
}

function setMockWebApp(version: string) {
  Object.defineProperty(window, 'Telegram', {
    configurable: true,
    writable: true,
    value: {
      WebApp: createMockWebApp(version),
    },
  })
}

beforeEach(() => {
  vi.resetModules()
})

describe('useMiniApp', () => {
  it('includes base (6.0) surface when both base and runtime are 6.0', async () => {
    setMockWebApp('6.0')
    const { useMiniApp: useMiniApp60 } = await import('../src/versions/6.0')
    const miniApp = useMiniApp60()

    expect(miniApp.version).toBe('6.0')
    expect(miniApp.openLink).toBeDefined()
    expect(miniApp.close).toBeDefined()
    expect(miniApp.openInvoice).toBeUndefined()
  })

  it('includes newer features when effective version comes from base import', async () => {
    setMockWebApp('6.0')
    const { useMiniApp: useMiniApp91 } = await import('../src/versions/9.1')
    const miniApp = useMiniApp91()

    expect(miniApp.openInvoice).toBeDefined()
    expect(miniApp.requestContact).toBeDefined()
    expect(miniApp.hideKeyboard).toBeDefined()
  })

  it('supports both promise and callback APIs for async mini app methods', async () => {
    setMockWebApp('9.1')
    const { useMiniApp: useMiniApp91 } = await import('../src/versions/9.1')
    const miniApp = useMiniApp91()

    await expect(miniApp.openInvoice('https://t.me/invoice')).resolves.toBe('paid')
    await expect(miniApp.requestContact()).resolves.toBe(true)
    await expect(miniApp.requestWriteAccess()).resolves.toBe(true)
    await expect(miniApp.shareMessage('msg-1')).resolves.toBe(true)
    await expect(miniApp.downloadFile({ url: 'https://example.com/f', file_name: 'f.txt' })).resolves.toBe(true)

    const invoiceCallback = vi.fn()
    const contactCallback = vi.fn()
    const writeAccessCallback = vi.fn()
    const shareMessageCallback = vi.fn()
    const downloadFileCallback = vi.fn()

    expect(miniApp.openInvoice('https://t.me/invoice', invoiceCallback)).toBeUndefined()
    expect(miniApp.requestContact(contactCallback)).toBeUndefined()
    expect(miniApp.requestWriteAccess(writeAccessCallback)).toBeUndefined()
    expect(miniApp.shareMessage('msg-1', shareMessageCallback)).toBeUndefined()
    expect(miniApp.downloadFile({ url: 'https://example.com/f', file_name: 'f.txt' }, downloadFileCallback)).toBeUndefined()

    expect(invoiceCallback).toHaveBeenCalledWith('paid')
    expect(contactCallback).toHaveBeenCalledWith(true)
    expect(writeAccessCallback).toHaveBeenCalledWith(true)
    expect(shareMessageCallback).toHaveBeenCalledWith(true)
    expect(downloadFileCallback).toHaveBeenCalledWith(true)
  })
})
