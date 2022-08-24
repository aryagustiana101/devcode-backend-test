import { NextFunction, Request, Response } from 'express'
import { ValidationChain, body, validationResult } from 'express-validator'

type Validation = {
  path: string;
  method: string;
  rules: ValidationChain[];
};

const validations: Validation[] = [
  {
    path: '/api/auth/register',
    method: 'POST',
    rules: [
      body('name').notEmpty().withMessage('Name is required'),
      body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
      body('password').notEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password must be at least 6 characters long'),
    ],
  },
]

export const validate = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { originalUrl, method } = req

  const validation = validations.find((item) => {
    if (item.path == originalUrl && item.method == method) return item
  })

  if (!validation) return next()

  try {
    for (const rule of validation.rules) {
      await rule(req, res, () => void 0)
    }
  } catch (e) {
    return next(e)
  }

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      code: 400,
      messages: errors.array().map((err) => err.msg)[0],
      data: [],
    })
  }

  return next()
}
