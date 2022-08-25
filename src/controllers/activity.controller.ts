import prisma from '../libs/prisma'
import { Request, Response } from 'express'

export const getAll = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: await prisma.activity.findMany()
  })
}

export const getOne = async (req: Request, res: Response): Promise<Response> => {
  const activity = await prisma.activity.findUnique({
    where: { id: parseInt(req.params.id) }
  })

  if (activity === null) {
    return res.status(404).json({
      status: 'Not Found',
      message: `Activity with ID ${req.params.id} Not Found`,
      data: {}
    })
  }

  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: activity
  })
}

export const create = async (req: Request, res: Response): Promise<Response> => {
  const { title, email } = req.body

  const activity = await prisma.activity.create({
    data: { title, email }
  })

  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: activity
  })
}

export const remove = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: await prisma.activity.findMany()
  })
}

export const update = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: await prisma.activity.findMany()
  })
}
