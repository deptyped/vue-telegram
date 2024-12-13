export type PopupButton = {
  id?: string
  type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'
  text?: string
}

export type PopupParams = {
  title?: string
  message: string
  buttons?: PopupButton[]
}
