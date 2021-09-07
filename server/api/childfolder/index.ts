import type { Childfolder } from '$prisma/client'

export type Methods = {
  get: {
    query?: {
      limit?: number
      message?: string
    }

    resBody: Childfolder[]
  }
  post: {
    reqBody: Required<Omit<Childfolder, 'id'>>
    resBody: Childfolder
  }
  put: {
    reqBody: Required<Partial<Childfolder>>
    resBody: Childfolder
  }
  delete: {
    reqBody: Pick<Childfolder, 'id'>
  }
}
