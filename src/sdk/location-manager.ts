export type LocationManager = {
  isInited: boolean
  isLocationAvailable: boolean
  isAccessRequested: boolean
  isAccessGranted: boolean
  init: (callback?: LocationManagerCallback['init']) => LocationManager
  getLocation: (callback: LocationManagerCallback['getLocation']) => LocationManager
  openSettings: () => LocationManager
}

export type LocationManagerCallback = {
  init: () => void
  getLocation: (data: LocationData | null) => void
}

export type LocationData = {
  latitude: number
  longitude: number
  altitude: number | null
  course: number | null
  speed: number | null
  horizontal_accuracy: number | null
  vertical_accuracy: number | null
  course_accuracy: number | null
  speed_accuracy: number | null
}
