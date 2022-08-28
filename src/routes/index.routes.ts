import todo from './todo.routes'
import activity from './activity.routes'
import express, { Request, Response, Router } from 'express'

const router: Router = express.Router()

router.route('/').get(async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({
    message: 'Welcome to API TODO'
  })
})

router.use('/activity-groups', activity)
router.use('/todo-items', todo)

export default router
