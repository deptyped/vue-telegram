import type { EventCallback, WebAppInitData, WebAppUser } from './sdk'

type BOT_API_VERSIONS = [
  '6.0',
  '6.1',
  '6.2',
  '6.4',
  '6.7',
  '6.9',
  '7.0',
  '7.2',
  '7.6',
  '7.7',
  '7.8',
  '7.10',
  '8.0',
  '9.0',
]

export type LATEST_VERSION = '9.0'

type Reverse<T extends any[]> = T extends [infer First, ...infer Rest]
  ? [...Reverse<Rest>, First]
  : []

type Equals<X, Y> = X extends Y ? (Y extends X ? true : false) : false

export type Merge<T, U> = Omit<T, keyof U> & U

export type BotApiVersion = BOT_API_VERSIONS[number]

type VersionMap<T extends readonly BotApiVersion[], R = object> =
  T extends readonly [infer First extends BotApiVersion, infer Second extends BotApiVersion, ...infer Rest extends BotApiVersion[]]
    ? VersionMap<[Second, ...Rest], R & { [K in First]: Second }>
    : R

type BotApiNextVersionMap = VersionMap<BOT_API_VERSIONS>
export type BotApiNextVersion<V extends BotApiVersion> = V extends keyof BotApiNextVersionMap
  ? BotApiNextVersionMap[V]
  : never

type BotApiPrevVersionMap = VersionMap<Reverse<BOT_API_VERSIONS>>
export type BotApiPrevVersion<V extends BotApiVersion> = V extends keyof BotApiPrevVersionMap
  ? BotApiPrevVersionMap[V]
  : never

export type BotApiVersionRange<Start extends BotApiVersion, End extends BotApiVersion> =
  Equals<Start, End> extends true
    ? Start
    : Start | BotApiVersionRange<BotApiNextVersion<Start>, End>

export type VersionedReturnType<
  Schema extends Record<BotApiVersion, object>,
  Version extends BotApiVersion,
  SuggestedVersions extends BotApiVersion,
> =
  & Extract<Schema[BotApiVersion], { version: BotApiVersionRange<Version, LATEST_VERSION> }>
  & {
    isVersionAtLeast: <V extends Exclude<SuggestedVersions, BotApiVersionRange<'6.0', Version>>>(version: V) => this is { version: BotApiVersionRange<V, LATEST_VERSION> }
  }

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
