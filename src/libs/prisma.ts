import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error']
})

// Prisma Soft Delete Middleware
prisma.$use(async (params, next) => {
  if (params.model === 'Activity') {
    if (params.action === 'delete') {
      params.action = 'update'
      params.args.data = { deleted_at: new Date() }
    }

    if (params.action === 'deleteMany') {
      params.action = 'updateMany'
      if (params.args.data !== undefined) {
        params.args.data.deleted_at = new Date()
      } else {
        params.args.data = { deleted_at: new Date() }
      }
    }
  }

  if (params.model === 'Todo') {
    if (params.action === 'delete') {
      params.action = 'update'
      params.args.data = { deleted_at: new Date() }
    }

    if (params.action === 'deleteMany') {
      params.action = 'updateMany'
      if (params.args.data !== undefined) {
        params.args.data.deleted_at = new Date()
      } else {
        params.args.data = { deleted_at: new Date() }
      }
    }
  }
  return await next(params)
})

export default prisma
