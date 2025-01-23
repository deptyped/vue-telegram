export type Accelerometer = {
  isStarted: boolean
  x: number
  y: number
  z: number
  start: (
    params: AccelerometerStartParams,
    callback?: AccelerometerCallback['start']
  ) => Accelerometer
  stop: (callback?: AccelerometerCallback['stop']) => Accelerometer
}

export type AccelerometerStartParams = {
  refresh_rate?: number
}

export type AccelerometerCallback = {
  start: (success: boolean) => void
  stop: (success: boolean) => void
}
