import prisma from '../libs/prisma'
import { Request, Response } from 'express'

export const getAll = async (req: Request, res: Response): Promise<Response> => {
  const activities = await prisma.activity.findMany({ where: { deleted_at: null } })

  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: activities
  })
}

export const getOne = async (req: Request, res: Response): Promise<Response> => {
  const id = Number(req.params.id)

  const activity = await prisma.activity.findFirst({ where: { id, deleted_at: null } })

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

export const update = async (req: Request, res: Response): Promise<Response> => {
  const id = Number(req.params.id)
  const { title, email } = req.body

  const activity = await prisma.activity.findFirst({ where: { id, deleted_at: null } })

  if (activity === null) {
    return res.status(404).json({
      status: 'Not Found',
      message: `Activity with ID ${req.params.id} Not Found`,
      data: {}
    })
  }

  const updateActivity = await prisma.activity.update({
    where: { id },
    data: { title, email: email ?? activity.email }
  })

  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: updateActivity
  })
}

export const remove = async (req: Request, res: Response): Promise<Response> => {
  const id = Number(req.params.id)

  const activity = await prisma.activity.findFirst({ where: { id, deleted_at: null } })

  if (activity === null) {
    return res.status(404).json({
      status: 'Not Found',
      message: `Activity with ID ${req.params.id} Not Found`,
      data: {}
    })
  }

  await prisma.activity.delete({ where: { id } })
  await prisma.todo.deleteMany({ where: { activity: { id } } })

  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: {}
  })
}
