import { WebApp } from '../sdk'

/**
 * @deprecated Use [`useMiniApp`](https://vue-tg.deptyped.com/mini-apps.html#useminiapp) instead
 */
export function useWebAppShare() {
  const { shareToStory } = WebApp

  return {
    shareToStory,
  }
}
