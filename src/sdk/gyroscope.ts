export type Gyroscope = {
  isStarted: boolean
  x: number
  y: number
  z: number
  start: (
    params: GyroscopeStartParams,
    callback?: GyroscopeCallback['start']
  ) => Gyroscope
  stop: (callback?: GyroscopeCallback['stop']) => Gyroscope
}

export type GyroscopeCallback = {
  start: (success: boolean) => void
  stop: (success: boolean) => void
}

export type GyroscopeStartParams = {
  refresh_rate?: number
}
