import { Note } from '../models/note'

async function fetchData(input: RequestInfo, init?: RequestInit) {
	const res = await fetch(input, init)
	if (res.ok) {
		return res
	} else {
		const errorBody = await res.json()
		const errorMessage = errorBody.err
		throw Error(errorMessage)
	}
}

export async function fetchNotes(): Promise<Note[]> {
	const res = await fetchData('/api/notes', {
		method: 'GET',
	})
	return await res.json()
}

export interface NoteInput {
	title: string
	text?: string
}

export async function createNote(note: NoteInput): Promise<Note> {
	const res = await fetchData('/api/notes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(note),
	})
	return res.json()
}

export async function updateNote(
	noteId: string,
	note: NoteInput
): Promise<Note> {
	const response = await fetchData('/api/notes/' + noteId, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(note),
	})
	return response.json()
}
