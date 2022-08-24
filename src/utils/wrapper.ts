import { NextFunction, Request, Response } from 'express'

type Callback = (req: Request, res: Response, next: NextFunction) => Promise<Response>;

export function asyncWrapper(callback: Callback) {
  return function (req: Request, res: Response, next: NextFunction) {
    callback(req, res, next).catch(next)
  }
}
