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
    showPopup: vi.fn((_: unknown, callback?: (buttonId: string) => void) => callback?.('ok')),
    showAlert: vi.fn((_: string, callback?: () => void) => callback?.()),
    showConfirm: vi.fn((_: string, callback?: (ok: boolean) => void) => callback?.(true)),
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

describe('version behavior contracts', () => {
  it('keeps effective version behavior for newer base imports', async () => {
    setMockWebApp('6.0')
    const { usePopup: usePopup91 } = await import('../src/versions/9.1')
    const popup = usePopup91()

    expect(Object.keys(popup).sort()).toEqual([
      'isVersionAtLeast',
      'onClose',
      'showAlert',
      'showConfirm',
      'showPopup',
      'version',
    ])
  })

  it('keeps effective version behavior when runtime is newer than base import', async () => {
    setMockWebApp('9.1')
    const { usePopup: usePopup60 } = await import('../src/versions/6.0')
    const popup = usePopup60()

    expect(Object.keys(popup).sort()).toEqual([
      'isVersionAtLeast',
      'onClose',
      'showAlert',
      'showConfirm',
      'showPopup',
      'version',
    ])
  })

  it('keeps low-version surface when both base and runtime are old', async () => {
    setMockWebApp('6.0')
    const { usePopup: usePopup60 } = await import('../src/versions/6.0')
    const popup = usePopup60()

    expect(Object.keys(popup).sort()).toEqual([
      'isVersionAtLeast',
      'version',
    ])
  })

  it('reports global isVersionAtLeast using current runtime version', async () => {
    setMockWebApp('7.8')
    const { isVersionAtLeast } = await import('../src/composables/useMiniApp')

    expect(isVersionAtLeast('7.8')).toBe(true)
    expect(isVersionAtLeast('7.7')).toBe(true)
    expect(isVersionAtLeast('8.0')).toBe(false)
  })

  it('supports promise and callback styles after popup factory migration', async () => {
    setMockWebApp('9.1')
    const { usePopup: usePopup91 } = await import('../src/versions/9.1')
    const popup = usePopup91()

    await expect(popup.showConfirm('Proceed?')).resolves.toBe(true)
    expect(await popup.showPopup({ message: 'Hi', buttons: [{ id: 'ok', type: 'default', text: 'OK' }] })).toBe('ok')
    await expect(popup.showAlert('Done')).resolves.toBeUndefined()

    const confirmCallback = vi.fn()
    const popupCallback = vi.fn()
    const alertCallback = vi.fn()
    expect(popup.showConfirm('Proceed?', confirmCallback)).toBeUndefined()
    expect(popup.showPopup({ message: 'Hi', buttons: [{ id: 'ok', type: 'default', text: 'OK' }] }, popupCallback)).toBeUndefined()
    expect(popup.showAlert('Done', alertCallback)).toBeUndefined()
    expect(confirmCallback).toHaveBeenCalledWith(true)
    expect(popupCallback).toHaveBeenCalledWith('ok')
    expect(alertCallback).toHaveBeenCalled()
  })

  it('supports promise and callback styles after mini app factory migration', async () => {
    setMockWebApp('9.1')
    const { useMiniApp: useMiniApp91 } = await import('../src/versions/9.1')
    const miniApp = useMiniApp91()

    await expect(miniApp.openInvoice('https://t.me/invoice')).resolves.toBe('paid')
    await expect(miniApp.requestContact()).resolves.toBe(true)
    await expect(miniApp.requestWriteAccess()).resolves.toBe(true)
    await expect(miniApp.shareMessage('msg-1')).resolves.toBe(true)
    await expect(miniApp.downloadFile({ url: 'https://example.com/file', file_name: 'file.txt' })).resolves.toBe(true)

    const invoiceCallback = vi.fn()
    const contactCallback = vi.fn()
    const writeAccessCallback = vi.fn()
    const shareMessageCallback = vi.fn()
    const downloadFileCallback = vi.fn()

    expect(miniApp.openInvoice('https://t.me/invoice', invoiceCallback)).toBeUndefined()
    expect(miniApp.requestContact(contactCallback)).toBeUndefined()
    expect(miniApp.requestWriteAccess(writeAccessCallback)).toBeUndefined()
    expect(miniApp.shareMessage('msg-1', shareMessageCallback)).toBeUndefined()
    expect(miniApp.downloadFile({ url: 'https://example.com/file', file_name: 'file.txt' }, downloadFileCallback)).toBeUndefined()

    expect(invoiceCallback).toHaveBeenCalledWith('paid')
    expect(contactCallback).toHaveBeenCalledWith(true)
    expect(writeAccessCallback).toHaveBeenCalledWith(true)
    expect(shareMessageCallback).toHaveBeenCalledWith(true)
    expect(downloadFileCallback).toHaveBeenCalledWith(true)
  })

  it('keeps both onDeactivate alias and legacy onDeactive', async () => {
    setMockWebApp('9.1')
    const { useMiniApp: useMiniApp91 } = await import('../src/versions/9.1')
    const miniApp = useMiniApp91()

    expect(miniApp.onDeactivate).toBeDefined()
    expect(miniApp.onDeactive).toBeDefined()
    expect(miniApp.onDeactivate).toBe(miniApp.onDeactive)
  })
})
