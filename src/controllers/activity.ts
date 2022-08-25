import prisma from '../libs/prisma'
import { Request, Response } from 'express'

export const getMultiple = async (req: Request, res: Response): Promise<Response> => {
  await prisma.activity.create({
    data: {
      title: 'test',
      email: 'asd'
    }
  })

  return res.status(200).json({
    activities: await prisma.activity.findMany()
  })
}
