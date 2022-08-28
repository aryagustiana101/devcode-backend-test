import cors from 'cors'
// import logger from 'morgan'
import cookieParser from 'cookie-parser'
import express, { Express } from 'express'
import indexRouter from './src/routes/index.routes'
import { errorHandler, notFoundHandler } from './src/middlewares/error'

const app: Express = express()

app.use(cors())
// app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(indexRouter)

app.use(errorHandler)
app.use(notFoundHandler)

export default app
