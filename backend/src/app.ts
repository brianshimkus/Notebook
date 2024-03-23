import 'dotenv/config'
import express, { Request, Response } from 'express'
import notesRoutes from './routes/notes'
import userRoutes from './routes/users'
import morgan from 'morgan'
import createHttpError, { isHttpError } from 'http-errors'
import session from 'express-session'
import env from './util/validateEnv'
import MongoStore from 'connect-mongo'

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use(
	session({
		secret: env.SESSION_SECRET || 'secret',
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 7,
		},
		rolling: true,
		store: MongoStore.create({
			mongoUrl: env.MONGO_CONNECTION_STRING,
		}),
	})
)

app.use('/api/users', userRoutes)
app.use('/api/notes', notesRoutes)

app.use((req, res, next) => {
	next(createHttpError(404, 'Endpoint not found'))
})

app.use((err: unknown, req: Request, res: Response) => {
	console.log(err)
	let errorMessage = 'An unknown error occurred'
	let statusCode = 500
	if (isHttpError(err)) {
		statusCode = err.status
		errorMessage = err.message
	}
	res.status(statusCode).json({ err: errorMessage })
})

export default app
