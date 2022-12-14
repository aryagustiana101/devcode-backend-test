import prisma from '../libs/prisma'
import { Request, Response } from 'express'
import { getOrSetCache } from '../utils/cache'

export const getAll = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: await getOrSetCache('activity-groups', async () => {
      return await prisma.activity.findMany()
    })
  })
}

export const getOne = async (req: Request, res: Response): Promise<Response> => {
  const id = Number(req.params.id)

  if (id === undefined || isNaN(id)) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'Id is required',
      data: {}
    })
  }

  const activity = await prisma.activity.findUnique({ where: { id } })

  if (activity === null) {
    return res.status(404).json({
      status: 'Not Found',
      message: `Activity with ID ${id} Not Found`,
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

  if (title === undefined) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'title cannot be null',
      data: {}
    })
  }

  const activity = await prisma.activity.create({
    data: { title, email }
  })

  return res.status(201).json({
    status: 'Success',
    message: 'Success',
    data: activity
  })
}

export const update = async (req: Request, res: Response): Promise<Response> => {
  const id = Number(req.params.id)
  const { title, email } = req.body

  if (id === undefined || isNaN(id)) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'Id is required',
      data: {}
    })
  }

  if (title === undefined) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'title cannot be null',
      data: {}
    })
  }

  const activity = await getOrSetCache(`activity-groups/${id}`, async () => {
    return await prisma.activity.findUnique({ where: { id } })
  })

  if (activity === null) {
    return res.status(404).json({
      status: 'Not Found',
      message: `Activity with ID ${req.params.id} Not Found`,
      data: {}
    })
  }

  const updateActivity = await prisma.activity.update({
    where: { id: activity.id },
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

  if (id === undefined || isNaN(id)) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'Id is required',
      data: {}
    })
  }

  const activity = await getOrSetCache(`activity-groups/${id}`, async () => {
    return await prisma.activity.findUnique({ where: { id } })
  })

  if (activity === null) {
    return res.status(404).json({
      status: 'Not Found',
      message: `Activity with ID ${req.params.id} Not Found`,
      data: {}
    })
  }

  await prisma.activity.delete({ where: { id: activity.id } })

  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: {}
  })
}
