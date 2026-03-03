import type { BotApiVersion, Merge, SchemaBase, SinceLatest, SinceUntil } from '../types'
import { computed, readonly, ref } from 'vue'
import { onSecondaryButtonClicked } from '../events'
import { getWebApp } from '../sdk'
import { defineStore, wrapFunction } from '../utils'
import { createVersionedComposable } from './factories/createVersionedComposable'

type v60 = ReturnType<typeof useSecondaryButton60>
type v710 = ReturnType<typeof useSecondaryButton710>
type v95 = ReturnType<typeof useSecondaryButton95>
type AllFeatures = v710 & v95

export type Schema = {
  '6.0': SchemaBase<AllFeatures, v60>
  '7.10': Merge<Schema['6.0'], v710>
  '9.5': Merge<Schema['7.10'], v95>
}

export type SecondaryButton
  = | SinceUntil<Schema, '6.0', '7.10'>
    | SinceUntil<Schema, '7.10', '9.5'>
    | SinceLatest<Schema, '9.5'>

const useStore = defineStore(() => {
  const webApp = getWebApp()
  const text = ref(webApp.SecondaryButton.text)
  const color = ref(webApp.SecondaryButton.color)
  const textColor = ref(webApp.SecondaryButton.textColor)
  const isVisible = ref(webApp.SecondaryButton.isVisible)
  const isActive = ref(webApp.SecondaryButton.isActive)
  const isProgressVisible = ref(webApp.SecondaryButton.isProgressVisible)
  const hasShineEffect = ref(webApp.SecondaryButton.hasShineEffect)
  const position = ref(webApp.SecondaryButton.position)
  const iconCustomEmojiId = ref(webApp.SecondaryButton.iconCustomEmojiId)

  const updateState = () => {
    text.value = webApp.SecondaryButton.text
    color.value = webApp.SecondaryButton.color
    textColor.value = webApp.SecondaryButton.textColor
    isVisible.value = webApp.SecondaryButton.isVisible
    isActive.value = webApp.SecondaryButton.isActive
    isProgressVisible.value = webApp.SecondaryButton.isProgressVisible
    hasShineEffect.value = webApp.SecondaryButton.hasShineEffect
    position.value = webApp.SecondaryButton.position
    iconCustomEmojiId.value = webApp.SecondaryButton.iconCustomEmojiId
  }

  return {
    webApp,
    updateState,
    text,
    color,
    textColor,
    isVisible,
    isActive,
    isProgressVisible,
    hasShineEffect,
    position,
    iconCustomEmojiId,
  }
})

function useSecondaryButton60() {
  const {
    text,
    color,
    textColor,
    isVisible,
    isActive,
    isProgressVisible,
    hasShineEffect,
    position,
    iconCustomEmojiId,
  } = useStore()

  return {
    text: readonly(text),
    color: readonly(color),
    textColor: readonly(textColor),
    isVisible: readonly(isVisible),
    isActive: readonly(isActive),
    isProgressVisible: readonly(isProgressVisible),
    hasShineEffect: readonly(hasShineEffect),
    position: readonly(position),
    iconCustomEmojiId: readonly(iconCustomEmojiId),
  }
}

function useSecondaryButton710() {
  const {
    webApp,
    text,
    color,
    textColor,
    isVisible,
    isActive,
    isProgressVisible,
    hasShineEffect,
    position,
    updateState,
  } = useStore()

  const showProgress = wrapFunction(webApp.SecondaryButton.showProgress, {
    hooks: {
      after: updateState,
    },
    omitReturn: true,
  })
  const hideProgress = wrapFunction(webApp.SecondaryButton.hideProgress, {
    hooks: {
      after: updateState,
    },
    omitReturn: true,
  })
  const setParams = wrapFunction(webApp.SecondaryButton.setParams, {
    hooks: {
      after: updateState,
    },
    omitReturn: true,
  })

  return {
    text: computed({
      get() {
        return text.value
      },
      set(text) {
        setParams({ text })
      },
    }),
    color: computed({
      get() {
        return color.value
      },
      set(color) {
        setParams({ color })
      },
    }),
    textColor: computed({
      get() {
        return textColor.value
      },
      set(textColor) {
        setParams({ text_color: textColor })
      },
    }),
    isVisible: computed({
      get() {
        return isVisible.value
      },
      set(isVisible) {
        setParams({ is_visible: isVisible })
      },
    }),
    isActive: computed({
      get() {
        return isActive.value
      },
      set(isActive) {
        setParams({ is_active: isActive })
      },
    }),
    isProgressVisible: computed({
      get() {
        return isProgressVisible.value
      },
      set(isProgressVisible) {
        if (isProgressVisible)
          showProgress()
        else
          hideProgress()
      },
    }),
    hasShineEffect: computed({
      get() {
        return hasShineEffect.value
      },
      set(hasShineEffect) {
        setParams({ has_shine_effect: hasShineEffect })
      },
    }),
    position: computed({
      get() {
        return position.value
      },
      set(position) {
        setParams({ position })
      },
    }),
    show: wrapFunction(webApp.SecondaryButton.show, {
      hooks: {
        after: updateState,
      },
      omitReturn: true,
    }),
    hide: wrapFunction(webApp.SecondaryButton.hide, {
      hooks: {
        after: updateState,
      },
      omitReturn: true,
    }),
    enable: wrapFunction(webApp.SecondaryButton.enable, {
      hooks: {
        after: updateState,
      },
      omitReturn: true,
    }),
    disable: wrapFunction(webApp.SecondaryButton.disable, {
      hooks: {
        after: updateState,
      },
      omitReturn: true,
    }),
    showProgress,
    hideProgress,
    setParams,
    onClick: onSecondaryButtonClicked,
  }
}

function useSecondaryButton95() {
  const {
    webApp,
    updateState,
    iconCustomEmojiId,
  } = useStore()

  const setParams = wrapFunction(webApp.SecondaryButton.setParams, {
    hooks: {
      after: updateState,
    },
    omitReturn: true,
  })

  return {
    iconCustomEmojiId: computed({
      get() {
        return iconCustomEmojiId.value
      },
      set(iconCustomEmojiId) {
        setParams({ icon_custom_emoji_id: iconCustomEmojiId })
      },
    }),
  }
}

export function useSecondaryButton<Version extends BotApiVersion>(baseVersion: Version) {
  const { webApp } = useStore()
  return createVersionedComposable<SecondaryButton, Version, keyof Schema>(
    baseVersion,
    webApp,
    useSecondaryButton60,
    [
      { since: '7.10', use: useSecondaryButton710 },
      { since: '9.5', use: useSecondaryButton95 },
    ],
  )
}
