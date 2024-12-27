interface HookObject<TArgs extends any[], TResult> {
  before?: (args: TArgs) => void
  after?: (args: TArgs, result: TResult) => void
}

export function wrapFunction<
  TFunction extends (...args: any[]) => any,
  TOmitReturn extends boolean = false,
>(
  fn: TFunction,
  options?: {
    hooks?: HookObject<Parameters<TFunction>, ReturnType<TFunction>>
    omitReturn?: TOmitReturn
  },
): (...args: Parameters<TFunction>) => TOmitReturn extends true ? void : ReturnType<TFunction> {
  return (...args: Parameters<TFunction>) => {
    const { hooks, omitReturn } = options || {}
    if (hooks?.before)
      hooks.before(args)

    const result = fn(...args)

    if (hooks?.after)
      hooks.after(args, result)

    if (!omitReturn)
      return result
  }
}

type Callback<T> = (data: T) => void

export function promisify<T, A extends any[]>(
  func: (...args: [...A, Callback<T>]) => void,
): (...args: A) => Promise<T> {
  return (...args: A) =>
    new Promise<T>(resolve => func(...args, resolve))
}

type CallbackWithNoData = () => void

export function promisifyWithNoData<A extends any[]>(
  func: (...args: [...A, CallbackWithNoData]) => void,
): (...args: A) => Promise<void> {
  return (...args: A) =>
    new Promise<void>(resolve => func(...args, resolve))
}

type CallbackWithError<T> = (err: string | null, data: T | null) => void

export function promisifyWithError<T, A extends any[]>(
  func: (...args: [...A, CallbackWithError<T>]) => void,
): (...args: A) => Promise<T> {
  return (...args: A) =>
    new Promise<T>((resolve, reject) =>
      func(...args, (err, data) => (err ? reject(err) : resolve(data as T))),
    )
}

type CallbackWithMultipleData<T extends any[]> = (...data: T) => void

export function promisifyWithDataObject<
  T extends any[],
  R extends Record<string, any>,
  A extends any[],
>(
  func: (...args: [...A, CallbackWithMultipleData<T>]) => void,
  mapToObject: (...data: T) => R,
): (...args: A) => Promise<R> {
  return (...args: A) =>
    new Promise<R>(resolve =>
      func(...args, (...data: T) => resolve(mapToObject(...data))),
    )
}
