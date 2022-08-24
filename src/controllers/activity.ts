import { Request, Response } from 'express'
import prisma from '../libs/prisma'

export const getMultiple = async (req: Request, res: Response): Promise<Response> => {
  
  await prisma.acivity.create({
    data: {
      title: 'test',
      email: 'asd'
    },
  })

  return res.status(200).json({
    activities: await prisma.acivity.findMany()
  })
}