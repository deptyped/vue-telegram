import type { BotApiPrevVersion, BotApiVersion, BotApiVersionRange, LATEST_VERSION, Merge, VersionedReturnType } from '../types'
import { computed, readonly, ref } from 'vue'
import { onContentSafeAreaChanged, onFullscreenChanged, onFullscreenFailed, onSafeAreaChanged, onViewportChanged } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, getHighestVersion, isVersionGreaterOrEqual, wrapFunction } from '../utils'

type v60 = ReturnType<typeof useViewport60>
type v77 = ReturnType<typeof useViewport77>
type v80 = ReturnType<typeof useViewport80>

export type Schema = {
  '6.0': Merge<Partial<v77 & v80>, v60>
  '7.7': Merge<Schema['6.0'], v77>
  '8.0': Merge<Schema['7.7'], v80>
}

export type Viewport =
  | (Schema['6.0'] & { version: BotApiVersionRange<'6.0', BotApiPrevVersion<'7.7'>> })
  | (Schema['7.7'] & { version: BotApiVersionRange<'7.7', BotApiPrevVersion<'8.0'>> })
  | (Schema['8.0'] & { version: BotApiVersionRange<'8.0', LATEST_VERSION> })

const useStore = defineStore(() => {
  const webApp = getWebApp()
  const isExpanded = ref(webApp.isExpanded)
  const viewportHeight = ref(webApp.viewportHeight)
  const viewportStableHeight = ref(webApp.viewportStableHeight)
  const isFullscreen = ref(webApp.isFullscreen)
  const isOrientationLocked = ref(webApp.isOrientationLocked)
  const isVerticalSwipesEnabled = ref(webApp.isVerticalSwipesEnabled)
  const safeAreaInset = ref(webApp.safeAreaInset)
  const contentSafeAreaInset = ref(webApp.contentSafeAreaInset)

  const updateState = () => {
    isExpanded.value = webApp.isExpanded
    viewportHeight.value = webApp.viewportHeight
    viewportStableHeight.value = webApp.viewportStableHeight
    isFullscreen.value = webApp.isFullscreen
    isOrientationLocked.value = webApp.isOrientationLocked
    isVerticalSwipesEnabled.value = webApp.isVerticalSwipesEnabled
    safeAreaInset.value = {
      ...webApp.safeAreaInset,
    }
    contentSafeAreaInset.value = {
      ...webApp.contentSafeAreaInset,
    }
  }

  return {
    webApp,
    updateState,
    isExpanded,
    viewportHeight,
    viewportStableHeight,
    isFullscreen,
    isOrientationLocked,
    isVerticalSwipesEnabled,
    safeAreaInset,
    contentSafeAreaInset,
  }
})

function useViewport60() {
  const {
    webApp,
    updateState,
    isExpanded,
    viewportHeight,
    viewportStableHeight,
    isFullscreen,
    isOrientationLocked,
    isVerticalSwipesEnabled,
    safeAreaInset,
    contentSafeAreaInset,
  } = useStore()

  onViewportChanged(updateState)

  return {
    expand: wrapFunction(webApp.expand, {
      hooks: {
        after: updateState,
      },
    }),
    isExpanded: readonly(isExpanded),
    viewportHeight: readonly(viewportHeight),
    viewportStableHeight: readonly(viewportStableHeight),
    isFullscreen: readonly(isFullscreen),
    isOrientationLocked: readonly(isOrientationLocked),
    isVerticalSwipesEnabled: readonly(isVerticalSwipesEnabled),
    safeAreaInset: readonly(safeAreaInset),
    contentSafeAreaInset: readonly(contentSafeAreaInset),
    onChange: onViewportChanged,
  }
}

function useViewport77() {
  const {
    webApp,
    isVerticalSwipesEnabled,
    updateState,
  } = useStore()

  const enableVerticalSwipes = wrapFunction(webApp.enableVerticalSwipes, {
    hooks: {
      after: updateState,
    },
  })
  const disableVerticalSwipes = wrapFunction(webApp.disableVerticalSwipes, {
    hooks: {
      after: updateState,
    },
  })

  return {
    isVerticalSwipesEnabled: computed({
      get() {
        return isVerticalSwipesEnabled.value
      },
      set(isEnabled) {
        if (isEnabled)
          enableVerticalSwipes()
        else
          disableVerticalSwipes()
      },
    }),
  }
}

function useViewport80() {
  const {
    webApp,
    isFullscreen,
    isOrientationLocked,
    updateState,
  } = useStore()

  const requestFullscreen = wrapFunction(webApp.requestFullscreen, {
    hooks: {
      after: updateState,
    },
  })
  const exitFullscreen = wrapFunction(webApp.exitFullscreen, {
    hooks: {
      after: updateState,
    },
  })
  const lockOrientation = wrapFunction(webApp.lockOrientation, {
    hooks: {
      after: updateState,
    },
  })
  const unlockOrientation = wrapFunction(webApp.unlockOrientation, {
    hooks: {
      after: updateState,
    },
  })

  return {
    isFullscreen: computed({
      get() {
        return isFullscreen.value
      },
      set(isEnabled) {
        if (isEnabled)
          requestFullscreen()
        else
          exitFullscreen()
      },
    }),
    isOrientationLocked: computed({
      get() {
        return isOrientationLocked.value
      },
      set(isEnabled) {
        if (isEnabled)
          lockOrientation()
        else
          unlockOrientation()
      },
    }),
    onSafeAreaChange: onSafeAreaChanged,
    onContentSafeAreaChange: onContentSafeAreaChanged,
    onFullscreenChange: onFullscreenChanged,
    onFullscreenFail: onFullscreenFailed,
  }
}

export function useViewport<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  const version = getHighestVersion(baseVersion, webApp.version)

  return {
    version: webApp.version,
    isVersionAtLeast: webApp.isVersionAtLeast,
    ...useViewport60(),
    ...(isVersionGreaterOrEqual(version, '7.7') && useViewport77()),
    ...(isVersionGreaterOrEqual(version, '8.0') && useViewport80()),
  } as VersionedReturnType<Viewport, Version, keyof Schema>
}
