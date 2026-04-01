export interface Form {
  name: string
  email: string
  message: string
}

export type Status = 'idle' | 'loading' | 'success'
