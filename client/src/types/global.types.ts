export interface BaseInitState<T> {
   isFetching: boolean
   error: string
   data: T
}

export interface BaseError {
   message: string
}