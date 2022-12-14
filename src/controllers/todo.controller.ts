import prisma from '../libs/prisma'
import { Request, Response } from 'express'
import { getOrSetCache } from '../utils/cache'

export const getAll = async (req: Request, res: Response): Promise<Response> => {
  const activityGroupId = Number(req.query.activity_group_id)

  if (!isNaN(activityGroupId)) {
    const activity = await getOrSetCache(`activity-groups/${activityGroupId}`, async () => {
      return await prisma.activity.findUnique({
        where: { id: activityGroupId },
        include: { todoList: true }
      })
    })

    return res.status(200).json({
      status: 'Success',
      message: 'Success',
      data: activity?.todoList ?? []
    })
  }

  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: await getOrSetCache('todo-items', async () => {
      return await prisma.todo.findMany()
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

  const todo = await getOrSetCache(`todo-items/${id}`, async () => {
    return await prisma.todo.findUnique({ where: { id } })
  })

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
  const { title, priority } = req.body
  const activityGroupId = Number(req.body.activity_group_id)
  const isActive = true

  if (activityGroupId === undefined || isNaN(activityGroupId)) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'activity_group_id cannot be null',
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

  const activity = await getOrSetCache(`activity-groups/${activityGroupId}`, async () => {
    return await prisma.activity.findUnique({ where: { id: activityGroupId } })
  })

  if (activity === null) {
    return res.status(404).json({
      status: 'Not Found',
      message: `Activity with ID ${activityGroupId} Not Found`,
      data: {}
    })
  }

  const todo = await prisma.todo.create({
    data: {
      title,
      priority,
      is_active: isActive,
      activity: { connect: { id: activity.id } }
    }
  })

  return res.status(201).json({
    status: 'Success',
    message: 'Success',
    data: todo
  })
}

export const update = async (req: Request, res: Response): Promise<Response> => {
  const id = Number(req.params.id)
  const { title, priority } = req.body
  const isActive = Boolean(req.body.is_active === 'true' ?? true)

  const todo = await getOrSetCache(`todo-items/${id}`, async () => {
    return await prisma.todo.findUnique({ where: { id } })
  })

  if (todo === null) {
    return res.status(404).json({
      status: 'Not Found',
      message: `Todo with ID ${id} Not Found`,
      data: {}
    })
  }

  const updatedTodo = await prisma.todo.update({
    where: { id: todo.id },
    data: {
      title: title ?? todo.title,
      is_active: isActive ?? todo.is_active,
      priority: priority ?? todo.priority
    }
  })

  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: updatedTodo
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

  const todo = await getOrSetCache(`todo-items/${id}`, async () => {
    return await prisma.todo.findUnique({ where: { id } })
  })

  if (todo === null) {
    return res.status(404).json({
      status: 'Not Found',
      message: `Todo with ID ${req.params.id} Not Found`,
      data: {}
    })
  }

  await prisma.todo.delete({ where: { id: todo.id } })

  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: {}
  })
}
