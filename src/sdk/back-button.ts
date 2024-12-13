import type { EventCallback } from './events'

export type BackButton = {
  isVisible: boolean
  onClick: (callback: EventCallback['backButtonClicked']) => BackButton
  offClick: (callback: EventCallback['backButtonClicked']) => BackButton
  show: () => BackButton
  hide: () => BackButton
}
