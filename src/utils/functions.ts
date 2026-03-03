interface HookObject<TArgs extends unknown[], TResult> {
  before?: (args: TArgs) => void
  after?: (args: TArgs, result: TResult) => void
}

/** Adds optional before/after hooks around a function call. */
export function wrapFunction<
  TFunction extends (...args: never[]) => unknown,
  TOmitReturn extends boolean = false,
>(
  fn: TFunction,
  options?: {
    hooks?: HookObject<Parameters<TFunction>, ReturnType<TFunction>>
    omitReturn?: TOmitReturn
  },
): (...args: Parameters<TFunction>) => TOmitReturn extends true ? void : ReturnType<TFunction> {
  return ((...args: Parameters<TFunction>) => {
    const { hooks, omitReturn } = options || {}
    if (hooks?.before)
      hooks.before(args)

    const result = fn(...args) as ReturnType<TFunction>

    if (hooks?.after)
      hooks.after(args, result)

    if (!omitReturn)
      return result
  }) as (...args: Parameters<TFunction>) => TOmitReturn extends true ? void : ReturnType<TFunction>
}

type Callback<T> = (data: T) => void

/** Promisifies callback-last functions with a single data result. */
export function promisify<T, A extends unknown[]>(
  func: (...args: [...A, Callback<T>]) => void,
): (...args: A) => Promise<T> {
  return (...args: A) =>
    new Promise<T>(resolve => func(...args, resolve))
}

type CallbackWithNoData = () => void

/** Promisifies callback-last functions where callback has no payload. */
export function promisifyWithNoData<A extends unknown[]>(
  func: (...args: [...A, CallbackWithNoData]) => void,
): (...args: A) => Promise<void> {
  return (...args: A) =>
    new Promise<void>(resolve => func(...args, resolve))
}

type CallbackWithError<T> = (err: string | null, data: T | null) => void

/** Promisifies `(err, data)` callbacks and rejects when `err` is present. */
export function promisifyWithError<T, A extends unknown[]>(
  func: (...args: [...A, CallbackWithError<T>]) => void,
): (...args: A) => Promise<T> {
  return (...args: A) =>
    new Promise<T>((resolve, reject) =>
      func(...args, (err, data) => (err ? reject(err) : resolve(data as T))),
    )
}

type CallbackWithMultipleData<T extends unknown[]> = (...data: T) => void

/** Promisifies multi-argument callbacks by mapping args into one object. */
export function promisifyWithDataObject<
  T extends unknown[],
  R extends Record<string, unknown>,
  A extends unknown[],
>(
  func: (...args: [...A, CallbackWithMultipleData<T>]) => void,
  mapToObject: (...data: T) => R,
): (...args: A) => Promise<R> {
  return (...args: A) =>
    new Promise<R>(resolve =>
      func(...args, (...data: T) => resolve(mapToObject(...data))),
    )
}

export function createCallbackOrPromiseMethod<
  TArgs extends unknown[],
  TCallbackArgs extends unknown[],
  TResult,
>(
  method: (...args: [...TArgs, (...args: TCallbackArgs) => void]) => void,
  promisifyMethod: (
    method: (...args: [...TArgs, (...args: TCallbackArgs) => void]) => void,
  ) => (...args: TArgs) => TResult,
) {
  /** Preserves dual API: promise form and callback form. */
  const asyncMethod = promisifyMethod(method)

  type TCallback = (...args: TCallbackArgs) => void
  type OverloadedMethod = {
    (...args: TArgs): TResult
    (...args: [...TArgs, callback?: TCallback]): void
  }

  const wrapped = (...rawArgs: [...TArgs] | [...TArgs, TCallback?]): TResult | void => {
    const maybeCallback = rawArgs[rawArgs.length - 1]
    if (typeof maybeCallback === 'function') {
      const args = rawArgs.slice(0, -1) as unknown as TArgs
      const callback = maybeCallback as TCallback
      method(...args, callback)
      return
    }

    return asyncMethod(...(rawArgs as unknown as TArgs))
  }

  return wrapped as OverloadedMethod
}
