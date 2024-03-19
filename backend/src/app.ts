import 'dotenv/config'
import express, { Request, Response } from 'express'
import notesRoutes from './routes/notes'

const app = express()

app.use('/api/notes', notesRoutes)

app.use((req, res, next) => {
	next(Error('Endpoint not found'))
})

app.use((err: unknown, req: Request, res: Response) => {
	console.log(err)
	let errorMessage = 'An unknown error occurred'
	if (err instanceof Error) errorMessage = err.message
	res.status(500).json({ message: errorMessage })
})

export default app
