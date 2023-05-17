export interface ResponseData<T = null> {
  message?: string
  error?: any
  data?: T
}
