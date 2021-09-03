import { createFiletree, getFiletree } from '$/service/filetree'
import { defineController } from './$relay'

const print = (text: string) => console.log(text)

export default defineController({ getFiletree, print }, ({ getFiletree, print }) => ({
  get: async ({ query }) => {
    if (query?.message) print(query.message)

    return { status: 200, body: await getFiletree(query?.limit) }
  },
  post: async ({ body }) => ({
    status: 201,
    body: await createFiletree(body.path),
  }),
}))
