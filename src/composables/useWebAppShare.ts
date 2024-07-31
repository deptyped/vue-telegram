interface StoryWidgetLink {
  url: string
  name?: string
}

interface StoryShareParams {
  text?: string
  widgetLink?: StoryWidgetLink
}

function shareToStory(mediaUrl: string, params?: StoryShareParams) {
  // @ts-expect-error not typed
  Telegram.WebApp.shareToStory(mediaUrl, params)
}

export function useWebAppShare() {
  return {
    shareToStory,
  }
}
