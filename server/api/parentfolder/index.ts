import type { Parentfolder } from '$prisma/client'

export type Methods = {
  get: {
    query?: {
      limit?: number
      message?: string
    }

    resBody: Parentfolder[]
  }
  post: {
    reqBody: Required<Omit<Parentfolder, 'id'>>
    resBody: Parentfolder
  }
  put: {
    reqBody: Required<Partial<Parentfolder>>
    resBody: Parentfolder
  }
  delete: {
    reqBody: Pick<Parentfolder, 'id'>
  }
}
