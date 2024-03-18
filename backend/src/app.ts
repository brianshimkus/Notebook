import 'dotenv/config'
import express, { Request, Response } from 'express'
import NoteModel from './models/note'

const app = express()

app.get('/', async (req, res, next) => {
	try {
		// throw new Error('Error!')
		const notes = await NoteModel.find().exec()
		res.status(200).json(notes)
	} catch (err) {
		next(err)
	}
})

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
