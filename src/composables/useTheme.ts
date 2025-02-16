import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { computed, readonly, ref } from 'vue'
import { onThemeChanged } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, wrapFunction } from '../utils'

type ThemeV60 = ReturnType<typeof useTheme60>
type ThemeV61 = ReturnType<typeof useTheme61>
type ThemeV710 = ReturnType<typeof useTheme710>

type ThemeV60to61 = {
  [version in BotApiVersionRange<'6.0', BotApiPrevVersion<'6.1'>>]: Merge<
    Partial<ThemeV61> & Partial<ThemeV710>,
    { version: version } & ThemeV60
  >;
}

type ThemeV61to710 = {
  [version in BotApiVersionRange<'6.1', BotApiPrevVersion<'7.10'>>]: Merge<
    ThemeV60to61['6.0'],
    { version: version } & ThemeV61
  >;
}

type ThemeV710toLatest = {
  [version in BotApiVersionRange<'7.10', LATEST_VERSION>]: Merge<
    ThemeV61to710['6.1'],
    { version: version } & ThemeV710
  >;
}

type Theme =
  & ThemeV60to61
  & ThemeV61to710
  & ThemeV710toLatest

const useStore = defineStore(() => {
  const webApp = getWebApp()
  const colorScheme = ref(webApp.colorScheme)
  const themeParams = ref(webApp.themeParams)
  const headerColor = ref(webApp.headerColor)
  const backgroundColor = ref(webApp.backgroundColor)
  const bottomBarColor = ref(webApp.bottomBarColor)

  const updateState = () => {
    colorScheme.value = webApp.colorScheme
    themeParams.value = {
      ...webApp.themeParams,
    }
    headerColor.value = webApp.headerColor
    backgroundColor.value = webApp.backgroundColor
    bottomBarColor.value = webApp.bottomBarColor
  }

  return {
    webApp,
    updateState,
    colorScheme,
    themeParams,
    headerColor,
    backgroundColor,
    bottomBarColor,
  }
})

function useTheme60() {
  const {
    colorScheme,
    themeParams,
    headerColor,
    backgroundColor,
    bottomBarColor,
    updateState,
  } = useStore()

  onThemeChanged(updateState)

  return {
    colorScheme: readonly(colorScheme),
    themeParams: readonly(themeParams),
    headerColor: readonly(headerColor),
    backgroundColor: readonly(backgroundColor),
    bottomBarColor: readonly(bottomBarColor),
    onChange: onThemeChanged,
  }
}

function useTheme61() {
  const {
    webApp,
    headerColor,
    backgroundColor,
    updateState,
  } = useStore()

  const setHeaderColor = wrapFunction(webApp.setHeaderColor, {
    hooks: {
      after: updateState,
    },
  })
  const setBackgroundColor = wrapFunction(webApp.setBackgroundColor, {
    hooks: {
      after: updateState,
    },
  })

  return {
    headerColor: computed({
      get() {
        return headerColor.value
      },
      set(newColor: Parameters<typeof webApp.setHeaderColor>[0]) {
        setHeaderColor(newColor)
      },
    }),
    backgroundColor: computed({
      get() {
        return backgroundColor.value
      },
      set(newColor: Parameters<typeof webApp.setBackgroundColor>[0]) {
        setBackgroundColor(newColor)
      },
    }),
  }
}

function useTheme710() {
  const {
    webApp,
    bottomBarColor,
    updateState,
  } = useStore()

  const setBottomBarColor = wrapFunction(webApp.setBottomBarColor, {
    hooks: {
      after: updateState,
    },
  })

  return {
    bottomBarColor: computed({
      get() {
        return bottomBarColor.value
      },
      set(newColor: Parameters<typeof webApp.setBottomBarColor>[0]) {
        setBottomBarColor(newColor)
      },
    }),
  }
}

export function useTheme<Version extends BotApiVersion>(
  options: { version: Version },
) {
  const { webApp } = useStore()
  const version = getHighestVersion(options?.version, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...useTheme60(),
    ...(isVersionGreaterOrEqual(version, '6.1') && useTheme61()),
    ...(isVersionGreaterOrEqual(version, '7.10') && useTheme710()),
  } as VersionedReturnType<Theme, Version, '6.1' | '7.10'>
}
