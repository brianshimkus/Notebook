import { useEffect, useState } from 'react'
import './App.css'
import { Note } from './models/note'

function App() {
	const [notes, setNotes] = useState<Note[]>([])

	useEffect(() => {
		async function loadNotes() {
			try {
				const res = await fetch('/api/notes', {
					method: 'GET',
				})
				const notes = await res.json()
				setNotes(notes)
			} catch (err) {
				console.error(err)
				alert(err)
			}
		}
		loadNotes()
	}, [])

	return <div className='App'>{JSON.stringify(notes)}</div>
}

export default App
