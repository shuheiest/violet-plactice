import type { File, Prisma } from '$prisma/client'
import { PrismaClient } from '@prisma/client'
import { depend } from 'velona'

const prisma = new PrismaClient()

export const getFile = depend(
  { prisma: prisma as { file: { findMany(): Promise<File[]> } } },
  async ({ prisma }, limit?: number) => (await prisma.file.findMany()).slice(0, limit)
)

export const createFile = (filename: File['filename'], folderid: File['folderid']) =>
  prisma.file.create({ data: { filename, folderid } })

export const updateFile = (id: File['id'], partialFile: Prisma.FileUpdateInput) =>
  prisma.file.update({ where: { id }, data: partialFile })

export const deleteFile = (id: File['id']) => prisma.file.delete({ where: { id } })
