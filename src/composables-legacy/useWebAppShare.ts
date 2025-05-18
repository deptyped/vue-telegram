import { useMiniApp } from '../composables/useMiniApp'

/**
 * @deprecated Use [`useMiniApp`](https://vue-tg.deptyped.com/mini-apps.html#useminiapp) instead
 */
export function useWebAppShare() {
  const { shareToStory } = useMiniApp('8.0')

  return {
    shareToStory,
  }
}
