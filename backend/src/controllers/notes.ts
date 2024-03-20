import { RequestHandler } from 'express'
import NoteModel from '../models/note'

export const getNotes: RequestHandler = async (req, res, next) => {
	try {
		// throw new Error('Error!')
		const notes = await NoteModel.find().exec()
		res.status(200).json(notes)
	} catch (err) {
		next(err)
	}
}

export const createNote: RequestHandler = async (req, res, next) => {
	const title = req.body.title
	const text = req.body.text

	try {
		const newNote = await NoteModel.create({ title, text })

		res.status(201).json(newNote)
	} catch (err) {
		next(err)
	}
}
