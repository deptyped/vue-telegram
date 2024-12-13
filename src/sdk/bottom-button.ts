import type { EventCallback } from './events'

export type BottomButton = {
  readonly type: 'main' | 'secondary'
  text: string
  color: string
  textColor: string
  isVisible: boolean
  isActive: boolean
  hasShineEffect: boolean
  position?: 'left' | 'right' | 'top' | 'bottom'
  readonly isProgressVisible: boolean
  setText: (text: string) => BottomButton
  onClick: (callback: EventCallback['mainButtonClicked']) => BottomButton
  offClick: (callback: EventCallback['mainButtonClicked']) => BottomButton
  show: () => BottomButton
  hide: () => BottomButton
  enable: () => BottomButton
  disable: () => BottomButton
  showProgress: (leaveActive?: boolean) => BottomButton
  hideProgress: () => BottomButton
  setParams: (params: {
    text?: string
    color?: string
    text_color?: string
    has_shine_effect?: boolean
    position?: 'left' | 'right' | 'top' | 'bottom'
    is_active?: boolean
    is_visible?: boolean
  }) => BottomButton
}
