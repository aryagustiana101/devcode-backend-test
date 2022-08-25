import activity from './activity.routes'
import express, { Request, Response, Router } from 'express'

const router: Router = express.Router()

router.route('/').get((req: Request, res: Response): Response => {
  return res.status(200).json({
    message: 'Welcome to API TODO'
  })
})

router.use('/activity-groups', activity)

export default router
