import { Note } from '../models/note'
import { User } from '../models/user'

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

export async function getLoggedInUser(): Promise<User> {
	const res = await fetchData('/api/users', { method: 'GET' })
	return res.json()
}

export interface SignUpCredentials {
	username: string
	email: string
	password: string
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
	const res = await fetchData('/api/users/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	})
	return res.json()
}

export interface LoginCredentials {
	username: string
	password: string
}

export async function login(credentials: LoginCredentials): Promise<User> {
	const response = await fetchData('/api/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	})
	return response.json()
}

export async function logout() {
	await fetchData('/api/users/logout', { method: 'POST' })
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
	const res = await fetchData('/api/notes/' + noteId, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(note),
	})
	return res.json()
}

export async function deleteNote(noteId: string) {
	await fetchData('/api/notes/' + noteId, { method: 'DELETE' })
}
