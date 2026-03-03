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
  '9.1',
]

export type LATEST_VERSION = '9.1'

// Reverses a tuple so previous-version map can be derived from next-version logic.
type Reverse<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? [...Reverse<Rest>, First]
  : []

// Compile-time equality check used to terminate recursive ranges.
type Equals<X, Y> = X extends Y ? (Y extends X ? true : false) : false

export type Merge<T, U> = Omit<T, keyof U> & U
// Base schema shape: current base feature set + optional future feature members.
export type SchemaBase<AllFeatures, Base extends object = object> = Merge<Partial<AllFeatures>, Base>

export type BotApiVersion = BOT_API_VERSIONS[number]

type VersionMap<T extends readonly BotApiVersion[], R = object>
  = T extends readonly [infer First extends BotApiVersion, infer Second extends BotApiVersion, ...infer Rest extends BotApiVersion[]]
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

export type BotApiVersionRange<Start extends BotApiVersion, End extends BotApiVersion>
  = Equals<Start, End> extends true
    ? Start
    : Start | BotApiVersionRange<BotApiNextVersion<Start>, End>

// Narrows a versioned union by minimum requested version.
type FilterSchemaByMinVersion<Schema, MinVersion extends BotApiVersion>
  = Schema extends { version: infer V }
    ? V extends BotApiVersionRange<MinVersion, LATEST_VERSION>
      ? Schema
      : never
    : Schema

export type VersionedReturnType<
  Schema,
  Version extends BotApiVersion,
  SuggestedVersions extends BotApiVersion,
> = Omit<FilterSchemaByMinVersion<Schema, Version>, 'isVersionAtLeast'> & {
  // Runtime version guard that also refines the compile-time type.
  isVersionAtLeast: <V extends SuggestedVersions>(
    version: V
  ) => this is VersionedReturnType<Schema, V, SuggestedVersions>
}

// Converts ordered schema milestones into version-ranged union members.
export type VersionedSchemaUnion<
  TSchema extends Record<string, object>,
  TVersions extends readonly BotApiVersion[],
> = TVersions extends readonly [
  infer Current extends keyof TSchema & BotApiVersion,
  infer Next extends BotApiVersion,
  ...infer Rest extends BotApiVersion[],
]
  ? | (TSchema[Current] & { version: BotApiVersionRange<Current, BotApiPrevVersion<Next>> })
  | VersionedSchemaUnion<TSchema, [Next, ...Rest]>
  : TVersions extends readonly [infer Last extends keyof TSchema & BotApiVersion]
    ? (TSchema[Last] & { version: BotApiVersionRange<Last, LATEST_VERSION> })
    : never

export type SinceUntil<
  TSchema extends Record<string, object>,
  Since extends keyof TSchema & BotApiVersion,
  Until extends BotApiVersion,
> = TSchema[Since] & {
  version: BotApiVersionRange<Since, BotApiPrevVersion<Until>>
}

// Version slice from `Since` up to latest known API version.
export type SinceLatest<
  TSchema extends Record<string, object>,
  Since extends keyof TSchema & BotApiVersion,
> = TSchema[Since] & {
  version: BotApiVersionRange<Since, LATEST_VERSION>
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

export type LoginWidgetUser
  = & Pick<WebAppUser, 'id' | 'first_name' | 'last_name' | 'username' | 'photo_url'>
    & Pick<WebAppInitData, 'auth_date' | 'hash'>
