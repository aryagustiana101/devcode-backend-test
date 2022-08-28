import cors from 'cors'
import logger from 'morgan'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import express, { Express } from 'express'
import index from './src/routes/index.routes'
import { errorHandler, notFoundHandler } from './src/middlewares/error'

const app: Express = express()

app.use(cors())
app.use(compression())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'))
}

app.use(index)

app.use(errorHandler)
app.use(notFoundHandler)

export default app
