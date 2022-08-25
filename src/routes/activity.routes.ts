import express, { Router } from 'express'
import { asyncWrapper } from '../utils/wrapper.utils'
import { validate } from '../middleware/validation.middleware'
import { create, getAll, getOne, remove, update } from '../controllers/activity.controller'

const router: Router = express.Router()

router.route('/').get(validate, asyncWrapper(getAll))
router.route('/:id').get(validate, asyncWrapper(getOne))
router.route('/').post(validate, asyncWrapper(create))
router.route('/:id').patch(validate, asyncWrapper(update))
router.route('/:id').delete(validate, asyncWrapper(remove))

export default router