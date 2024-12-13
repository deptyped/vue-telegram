import type { EventCallback, WebAppInitData, WebAppUser } from './sdk'

/**
 * Mini Apps
 */

export type OnEventReturn = {
  off: () => void
}

export type OnEventOptions = {
  /**
   * Disables automatic subscription management; you need to call the returned function `off` to unsubscribe.
   *
   * Set to `false` by default.
   */
  manual?: boolean
}

export type OnEventWithOptions<O> = {
  <T extends keyof EventCallback>(
    eventType: T,
    eventHandler: EventCallback[T],
    options?: O
  ): OnEventReturn
}

/**
 * Widgets
 */

export type LoginWidgetUser =
  & Pick<WebAppUser, 'id' | 'first_name' | 'last_name' | 'username' | 'photo_url'>
  & Pick<WebAppInitData, 'auth_date' | 'hash'>
