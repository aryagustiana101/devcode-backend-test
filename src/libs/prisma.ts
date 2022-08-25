import { Prisma, PrismaClient } from '@prisma/client'

const mysqlHost = process.env.MYSQL_HOST ?? '127.0.0.1'
const mysqlPort = process.env.MYSQL_PORT ?? '3306'
const mysqlUser = process.env.MYSQL_USER ?? 'root'
const mysqlPassword = process.env.MYSQL_PASSWORD ?? ''
const mysqlDbName = process.env.MYSQL_DBNAME ?? 'devcode_backend_test'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  datasources: {
    db: {
      url: `mysql://${mysqlUser}:${mysqlPassword}@${mysqlHost}:${mysqlPort}/${mysqlDbName}`
    }
  }
})

// Prisma Soft Delete Middleware
type nextPrisma = (params: Prisma.MiddlewareParams) => Promise<any>

prisma.$use(async (params: Prisma.MiddlewareParams, next: nextPrisma) => {
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
