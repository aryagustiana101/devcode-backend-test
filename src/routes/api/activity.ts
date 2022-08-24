import express, { Router } from 'express'
import { asyncWrapper } from '../../utils/wrapper'
import { validate } from '../../middleware/validation'
import { getMultiple } from '../../controllers/activity'

const router: Router = express.Router()

router.route('/').get(validate, asyncWrapper(getMultiple))
router.route('/:id').get(validate, asyncWrapper(getMultiple))
router.route('/').post(validate, asyncWrapper(getMultiple))
router.route('/:id').patch(validate, asyncWrapper(getMultiple))
router.route('/:id').delete(validate, asyncWrapper(getMultiple))

export default router