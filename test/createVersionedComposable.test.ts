import { describe, expect, it, vi } from 'vitest'
import { createVersionedComposable } from '../src/composables/factories/createVersionedComposable'
import { isVersionGreaterOrEqual } from '../src/utils/version'

function createMockWebApp(version: string) {
  return {
    version,
    isVersionAtLeast: (target: string) => isVersionGreaterOrEqual(version, target),
  }
}

describe('createVersionedComposable', () => {
  it('always includes base fields and metadata', () => {
    const useBase = vi.fn(() => ({ base: true }))
    const feature = vi.fn(() => ({ f61: true }))

    const result = createVersionedComposable(
      '6.0',
      createMockWebApp('6.0'),
      useBase,
      [{ since: '6.1', use: feature }],
    )

    expect(result).toMatchObject({
      base: true,
      version: '6.0',
    })
    expect(typeof result.isVersionAtLeast).toBe('function')
    expect(useBase).toHaveBeenCalledTimes(1)
    expect(feature).not.toHaveBeenCalled()
  })

  it('uses effective version = max(baseVersion, runtimeVersion)', () => {
    const since61 = vi.fn(() => ({ f61: true }))
    const since80 = vi.fn(() => ({ f80: true }))

    const withNewerBase = createVersionedComposable(
      '9.1',
      createMockWebApp('6.0'),
      () => ({}),
      [
        { since: '6.1', use: since61 },
        { since: '8.0', use: since80 },
      ],
    )
    expect(withNewerBase).toMatchObject({ f61: true, f80: true })

    since61.mockClear()
    since80.mockClear()

    const withNewerRuntime = createVersionedComposable(
      '6.0',
      createMockWebApp('9.1'),
      () => ({}),
      [
        { since: '6.1', use: since61 },
        { since: '8.0', use: since80 },
      ],
    )
    expect(withNewerRuntime).toMatchObject({ f61: true, f80: true })
  })
})
