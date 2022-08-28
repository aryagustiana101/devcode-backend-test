import express, { Router } from 'express'
import { asyncWrapper } from '../utils/wrapper'
import { validate } from '../middlewares/validation'
import { create, getAll, getOne, remove, update } from '../controllers/todo.controller'

const router: Router = express.Router()

router.route('/').get(validate, asyncWrapper(getAll))
router.route('/:id').get(validate, asyncWrapper(getOne))
router.route('/').post(validate, asyncWrapper(create))
router.route('/:id').patch(validate, asyncWrapper(update))
router.route('/:id').delete(validate, asyncWrapper(remove))

export default router
