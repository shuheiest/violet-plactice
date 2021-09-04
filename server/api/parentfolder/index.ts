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
    reqBody: Pick<Parentfolder, 'foldername'>
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
