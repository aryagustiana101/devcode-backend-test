import { NextFunction, Request, Response } from 'express'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
  console.error(err)

  return res.status(500).json({
    status: 'Error',
    message: err.message
  })
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction): Response => {
  return res.status(404).json({
    message: 'Not Found'
  })
}
