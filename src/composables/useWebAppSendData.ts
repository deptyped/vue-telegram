import { ref } from "vue"
import { useWebApp } from "./useWebApp"

const { initData, initDataUnsafe, sendData, close } = useWebApp()

export function useWebAppSendData<D>(
  data: D,
  options: {
    serialize?: (data: D) => string
  },
) {
  const serialize = options.serialize ?? JSON.stringify

  const error = ref("")
  const setError = (errorMessage: string) => {
    error.value = errorMessage
    console.error(errorMessage)
  }

  const isLoading = ref(false)

  return {
    error,
    isLoading,
    execute: () => {
      sendData(serialize(data))

      setTimeout(
        () =>
          setError(
            "Telegram.WebApp.sendData is only available for custom keyboards.",
          ),
        1_000,
      )
    },
    executeHttp: async (
      callbackUrl: string,
      options: { closeAfter?: boolean } = {},
    ) => {
      const closeAfter = options.closeAfter ?? true
      isLoading.value = true
      try {
        const response = await fetch(callbackUrl, {
          method: "POST",
          body: JSON.stringify({
            initData,
            initDataUnsafe,
            data: serialize(data),
          }),
        })

        if (!response.ok) setError(`${response.status} ${response.statusText}`)

        if (response.ok && closeAfter) close()

        return response
      } catch (err) {
        setError(String(err))
      } finally {
        isLoading.value = false
      }
    },
  }
}
