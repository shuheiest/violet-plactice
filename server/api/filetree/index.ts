import type { Filetree } from '$prisma/client'

export type Methods = {
  get: {
    query?: {
      limit?: number
      message?: string
    }

    resBody: Filetree[]
  }
  post: {
    reqBody: Pick<Filetree, 'path'>
    resBody: Filetree
  }
}
