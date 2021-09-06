import {
  createChildFolder,
  deleteChildFolder,
  getChildFolder,
  updateChildFolder,
} from '$/service/childfolder'
import { defineController } from './$relay'

const print = (text: string) => console.log(text)

export default defineController({ getChildFolder, print }, ({ getChildFolder, print }) => ({
  get: async ({ query }) => {
    if (query?.message) print(query.message)

    return { status: 200, body: await getChildFolder(query?.limit) }
  },
  post: async ({ body }) => ({
    status: 201,
    body: await createChildFolder(body.folderid, body.foldername),
  }),
  put: async ({ body }) => ({
    status: 201,
    body: await updateChildFolder(body.id, body),
  }),
  delete: async ({ body }) => ({
    status: 201,
    body: await deleteChildFolder(body.id),
  }),
}))
