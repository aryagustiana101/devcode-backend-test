import { Request, Response } from 'express'

export const getMultiple = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    message: 'Activity registered'
  })
}