export type DeviceOrientation = {
  isStarted: boolean
  absolute: boolean
  alpha: number
  beta: number
  gamma: number
  start: (
    params: DeviceOrientationStartParams,
    callback?: DeviceOrientationCallback['start']
  ) => DeviceOrientation
  stop: (callback?: DeviceOrientationCallback['stop']) => DeviceOrientation
}

export type DeviceOrientationCallback = {
  start: (success: boolean) => void
  stop: (success: boolean) => void
}

export type DeviceOrientationStartParams = {
  refresh_rate?: number
  need_absolute?: boolean
}
