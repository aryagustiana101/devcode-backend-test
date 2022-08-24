import activity from './activity'
import express, { Router } from 'express'

const router: Router = express.Router()

router.use('/activity-groups', activity)

export default router