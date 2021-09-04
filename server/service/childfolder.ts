import type { Childfolder, Prisma } from '$prisma/client'
import { PrismaClient } from '@prisma/client'
import { depend } from 'velona'

const prisma = new PrismaClient()

export const getChildFolder = depend(
  { prisma: prisma as { childfolder: { findMany(): Promise<Childfolder[]> } } },
  async ({ prisma }, limit?: number) => (await prisma.childfolder.findMany()).slice(0, limit)
)

export const createChildFolder = (folderid: Childfolder['folderid']) =>
  prisma.childfolder.create({ data: { folderid } })

export const updateChildFolder = (
  id: Childfolder['id'],
  partialChildfolder: Prisma.ChildfolderUpdateInput
) => prisma.childfolder.update({ where: { id }, data: partialChildfolder })

export const deleteChildFolder = (id: Childfolder['id']) =>
  prisma.childfolder.delete({ where: { id } })
