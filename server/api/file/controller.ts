import { createFile, deleteFile, getFile, updateFile } from '$/service/file'
import { defineController } from './$relay'

const print = (text: string) => console.log(text)

export default defineController({ getFile, print }, ({ getFile, print }) => ({
  get: async ({ query }) => {
    if (query?.message) print(query.message)

    return { status: 200, body: await getFile(query?.limit) }
  },
  post: async ({ body }) => ({
    status: 201,
    body: await createFile(body.filename, body.folderid),
  }),
  put: async ({ body }) => ({
    status: 201,
    body: await updateFile(body.id, body),
  }),
  delete: async ({ body }) => ({
    status: 201,
    body: await deleteFile(body.id),
  }),
}))
