import cors from 'cors'
import logger from 'morgan'
import indexRouter from './src/routes'
import cookieParser from 'cookie-parser'
import express, { Express } from 'express'
import { errorHandler, notFoundHandler } from './src/middleware/error'

const app: Express = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(indexRouter)

app.use(errorHandler)
app.use(notFoundHandler)

export default app