import prisma from '../libs/prisma'
import { Request, Response } from 'express'

export const getAll = async (req: Request, res: Response): Promise<Response> => {
  const activityGroupId = Number(req.query.activity_group_id)

  if (!isNaN(activityGroupId)) {
    const activity = await prisma.activity.findFirst({
      where: { id: activityGroupId, deleted_at: null },
      include: { todoList: true }
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
      data: 'activity.todoList'
    })
  }

  const todoList = await prisma.todo.findMany({ where: { deleted_at: null } })

  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: todoList
  })
}

export const getOne = async (req: Request, res: Response): Promise<Response> => {
  const id = Number(req.params.id)

  const todo = await prisma.todo.findFirst({ where: { id, deleted_at: null } })

  if (todo === null) {
    return res.status(404).json({
      status: 'Not Found',
      message: `Todo with ID ${id} Not Found`,
      data: {}
    })
  }

  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: todo
  })
}

export const create = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: {}
  })
}

export const update = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: {}
  })
}

export const remove = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: {}
  })
}
