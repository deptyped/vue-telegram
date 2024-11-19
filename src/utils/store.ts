import { effectScope } from "vue"

/**
 * Create a composable that returns a lazily initialized store.
 */
export function defineStore<T>(initialValue: () => T) {
  let initialized = false
  let value: T

  return function useStore(): T {
    if (!initialized) {
      // Init store in detached scope, so that watchers are not disposed on component unmount.
      effectScope(true).run(() => {
        value = initialValue()
      })
      initialized = true
    }
    return value
  }
}
