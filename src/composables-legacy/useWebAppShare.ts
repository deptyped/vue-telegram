interface StoryWidgetLink {
  url: string
  name?: string
}

interface StoryShareParams {
  text?: string
  widgetLink?: StoryWidgetLink
}

function shareToStory(mediaUrl: string, params?: StoryShareParams) {
  Telegram.WebApp.shareToStory(mediaUrl, params)
}

/**
 * @deprecated Use [`useMiniApp`](https://vue-tg.deptyped.com/mini-apps.html#useminiapp) instead
 */
export function useWebAppShare() {
  return {
    shareToStory,
  }
}
