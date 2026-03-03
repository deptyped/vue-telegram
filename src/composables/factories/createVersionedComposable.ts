import type { BotApiVersion, VersionedReturnType } from '../../types'
import { getHighestVersion, isVersionGreaterOrEqual } from '../../utils'

type VersionedFeature = {
  since: BotApiVersion
  use: () => Record<string, unknown>
}

type VersionedWebAppLike = {
  version: string
  isVersionAtLeast: (version: BotApiVersion) => boolean
}

export function createVersionedComposable<
  TComposable,
  Version extends BotApiVersion,
  SuggestedVersions extends BotApiVersion,
>(
  baseVersion: Version,
  webApp: VersionedWebAppLike,
  useBase: () => Record<string, unknown>,
  features: VersionedFeature[],
) {
  const effectiveVersion = getHighestVersion(baseVersion, webApp.version)
  const result: Record<string, unknown> = {
    ...useBase(),
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
  }

  for (const feature of features) {
    if (isVersionGreaterOrEqual(effectiveVersion, feature.since))
      Object.assign(result, feature.use())
  }

  return result as VersionedReturnType<TComposable, Version, SuggestedVersions>
}
