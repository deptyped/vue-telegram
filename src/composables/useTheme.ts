import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { computed, readonly, ref } from 'vue'
import { onThemeChanged } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, wrapFunction } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v60 = ReturnType<typeof useTheme60>
type v61 = ReturnType<typeof useTheme61>
type v710 = ReturnType<typeof useTheme710>
type AllFeatures = v61 & v710

export type Schema = {
  '6.0': SchemaBase<AllFeatures, v60>
  '6.1': Merge<Schema['6.0'], v61>
  '7.10': Merge<Schema['6.1'], v710>
}

export type Theme
  = | SinceUntil<Schema, '6.0', '6.1'>
    | SinceUntil<Schema, '6.1', '7.10'>
    | SinceLatest<Schema, '7.10'>

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

export function useTheme<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  return createVersionedComposable<Theme, Version, keyof Schema>(
    baseVersion,
    webApp,
    useTheme60,
    [
      { since: '6.1', use: useTheme61 },
      { since: '7.10', use: useTheme710 },
    ],
  )
}
