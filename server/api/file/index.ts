import type { File } from '$prisma/client'

export type Methods = {
  get: {
    query?: {
      limit?: number
      message?: string
    }

    resBody: File[]
  }
  post: {
    reqBody: Required<Partial<File>>
    resBody: File
  }
  put: {
    reqBody: Required<Partial<File>>
    resBody: File
  }
  delete: {
    reqBody: Pick<File, 'id'>
  }
}
