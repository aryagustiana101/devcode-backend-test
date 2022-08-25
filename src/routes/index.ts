import express, { Router } from 'express'
import apiRouter from './api'

const router: Router = express.Router()

router.use(express.static('public'))

router.use('/api', apiRouter)

export default router
