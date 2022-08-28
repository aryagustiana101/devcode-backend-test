import express, { Router } from 'express'
import { asyncWrapper } from '../utils/wrapper'
import { create, getAll, getOne, remove, update } from '../controllers/activity.controller'

const router: Router = express.Router()

router.route('/').get(asyncWrapper(getAll))
router.route('/:id').get(asyncWrapper(getOne))
router.route('/').post(asyncWrapper(create))
router.route('/:id').patch(asyncWrapper(update))
router.route('/:id').delete(asyncWrapper(remove))

export default router
