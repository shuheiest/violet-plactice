import {
  createParentFolder,
  deleteParentFolder,
  getParentFolder,
  updateParentFolder,
} from '$/service/parentfolder'
import { defineController } from './$relay'

const print = (text: string) => console.log(text)

export default defineController({ getParentFolder, print }, ({ getParentFolder, print }) => ({
  get: async ({ query }) => {
    if (query?.message) print(query.message)

    return { status: 200, body: await getParentFolder(query?.limit) }
  },
  post: async ({ body }) => ({
    status: 201,
    body: await createParentFolder(body.foldername),
  }),
  put: async ({ body }) => ({
    status: 201,
    body: await updateParentFolder(body.id, body),
  }),
  delete: async ({ body }) => ({
    status: 201,
    body: await deleteParentFolder(body.id),
  }),
}))
