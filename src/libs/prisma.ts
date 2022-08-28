import { PrismaClient } from '@prisma/client'
// import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Prisma Soft Delete Middleware
// type nextPrisma = (params: Prisma.MiddlewareParams) => Promise<any>

// prisma.$use(async (params: Prisma.MiddlewareParams, next: nextPrisma) => {
//   if (params.model === 'Activity') {
//     if (params.action === 'delete') {
//       params.action = 'update'
//       params.args.data = { deleted_at: new Date() }
//     }

//     if (params.action === 'deleteMany') {
//       params.action = 'updateMany'
//       if (params.args.data !== undefined) {
//         params.args.data.deleted_at = new Date()
//       } else {
//         params.args.data = { deleted_at: new Date() }
//       }
//     }
//   }

//   if (params.model === 'Todo') {
//     if (params.action === 'delete') {
//       params.action = 'update'
//       params.args.data = { deleted_at: new Date() }
//     }

//     if (params.action === 'deleteMany') {
//       params.action = 'updateMany'
//       if (params.args.data !== undefined) {
//         params.args.data.deleted_at = new Date()
//       } else {
//         params.args.data = { deleted_at: new Date() }
//       }
//     }
//   }
//   return await next(params)
// })

export default prisma
