import type { Filetree, Prisma } from '$prisma/client'
import { PrismaClient } from '@prisma/client'
import { depend } from 'velona'

const prisma = new PrismaClient()

export const getFiletree = depend(
  { prisma: prisma as { filetree: { findMany(): Promise<Filetree[]> } } },
  async ({ prisma }, limit?: number) => (await prisma.filetree.findMany()).slice(0, limit)
)

export const createFiletree = (path: Filetree['path']) => prisma.filetree.create({ data: { path } })

export const updateFiletree = (id: Filetree['id'], partialTask: Prisma.TaskUpdateInput) =>
  prisma.filetree.update({ where: { id }, data: partialTask })

export const deleteFiletree = (id: Filetree['id']) => prisma.filetree.delete({ where: { id } })
