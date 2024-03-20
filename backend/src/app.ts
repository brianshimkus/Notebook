import 'dotenv/config'
import express, { Request, Response } from 'express'
import notesRoutes from './routes/notes'
import morgan from 'morgan'
import createHttpError, { isHttpError } from 'http-errors'

const app = express()

app.use(morgan('dev'))

app.use(express.json())

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
