import { getCurrentInstance, onMounted, onUnmounted } from 'vue'

export function tryOnMounted(fn: () => void) {
  const instance = getCurrentInstance()
  if (instance)
    onMounted(fn)
}

export function tryOnUnmounted(fn: () => void) {
  const instance = getCurrentInstance()
  if (instance)
    onUnmounted(fn)
}
