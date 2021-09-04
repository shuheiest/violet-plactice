import type { Parentfolder, Prisma } from '$prisma/client'
import { PrismaClient } from '@prisma/client'
import { depend } from 'velona'

const prisma = new PrismaClient()

export const getParentFolder = depend(
  { prisma: prisma as { parentfolder: { findMany(): Promise<Parentfolder[]> } } },
  async ({ prisma }, limit?: number) => (await prisma.parentfolder.findMany()).slice(0, limit)
)

export const createParentFolder = (foldername: Parentfolder['foldername']) =>
  prisma.parentfolder.create({ data: { foldername } })

export const updateParentFolder = (
  id: Parentfolder['id'],
  partialParentfolder: Prisma.ParentfolderUpdateInput
) => prisma.parentfolder.update({ where: { id }, data: partialParentfolder })

export const deleteParentFolder = (id: Parentfolder['id']) =>
  prisma.parentfolder.delete({ where: { id } })
