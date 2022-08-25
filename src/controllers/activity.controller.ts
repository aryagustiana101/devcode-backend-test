import prisma from '../libs/prisma.libs'
import { Request, Response } from 'express'

export const getAll = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: await prisma.activity.findMany()
  })
}

export const getOne = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: await prisma.activity.findMany()
  })
}

export const create = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    status: 'Success',
    message: 'Success',
    data: await prisma.activity.findMany()
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
