import { NextFunction, Request, Response } from 'express'
import { ValidationChain, body, param, query, validationResult } from 'express-validator'

interface Validation {
  originalUrl: string
  method: string
  rules: ValidationChain[]
}

const validations = [
  {
    originalUrl: '/activity-groups/:id',
    method: 'GET',
    rules: [
      param('id')
        .notEmpty()
        .withMessage('Id is required')
        .isNumeric()
        .withMessage('Id must be a number')
    ]
  },
  {
    originalUrl: '/todo-items',
    method: 'GET',
    rules: [
      query('activity_group_id')
        .optional({ checkFalsy: true })
        .isNumeric()
        .withMessage('Activity group id must be a number')
    ]
  },
  {
    originalUrl: '/activity-groups',
    method: 'POST',
    rules: [
      body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 255 })
        .withMessage('Title must be less than 255 characters'),
      body('email')
        .optional({ checkFalsy: true })
        .isEmail()
        .withMessage('Email is invalid')
        .isLength({ max: 255 })
        .withMessage('Email must be less than 255 characters')
    ]
  },
  {
    originalUrl: '/todo-items',
    method: 'POST',
    rules: [
      body('activity_group_id')
        .notEmpty()
        .withMessage('Activity group id is required')
        .isNumeric()
        .withMessage('Activity group id must be a number'),
      body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 255 })
        .withMessage('Title must be less than 255 characters'),
      body('priority')
        .optional({ checkFalsy: true })
        .isIn(['very-high', 'high', 'medium', 'low', 'very-low'])
        .withMessage('Priority must be one of very-high, high, medium, low, very-low')
        .isLength({ max: 255 })
        .withMessage('Priority must be less than 255 characters')
    ]
  },
  {
    originalUrl: '/activity-groups/:id',
    method: 'PATCH',
    rules: [
      param('id')
        .notEmpty()
        .withMessage('Id is required')
        .isNumeric()
        .withMessage('Id must be a number'),
      body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 255 })
        .withMessage('Title must be less than 255 characters'),
      body('email')
        .optional({ checkFalsy: true })
        .isEmail()
        .withMessage('Email is invalid')
        .isLength({ max: 255 })
        .withMessage('Email must be less than 255 characters')
    ]
  },
  {
    originalUrl: '/activity-groups/:id',
    method: 'PUT',
    rules: [
      param('id')
        .notEmpty()
        .withMessage('Id is required')
        .isNumeric()
        .withMessage('Id must be a number'),
      body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ max: 255 })
        .withMessage('Title must be less than 255 characters'),
      body('email')
        .optional({ checkFalsy: true })
        .isEmail()
        .withMessage('Email is invalid')
        .isLength({ max: 255 })
        .withMessage('Email must be less than 255 characters')
    ]
  },
  {
    originalUrl: '/activity-groups/:id',
    method: 'DELETE',
    rules: [
      param('id')
        .notEmpty()
        .withMessage('Id is required')
        .isNumeric()
        .withMessage('Id must be a number')
    ]
  }
]

export const validate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | unknown> => {
  const { originalUrl, method } = req

  const validation = validations.find((item) => {
    if (item.originalUrl === originalUrl && item.method === method) return item

    if (
      item.originalUrl.includes(':id') &&
      item.method === method &&
      item.originalUrl.replace(/:id/g, req.params.id) === originalUrl
    )
      return item

    return null
  })

  if (validation == null) return next()

  try {
    for (const rule of validation.rules) {
      await rule(req, res, () => {})
    }
  } catch (e) {
    return next(e)
  }

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'Bad Request',
      message: errors.array().map((err) => err.msg)[0],
      data: {}
    })
  }

  return next()
}
