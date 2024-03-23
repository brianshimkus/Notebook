import { useEffect, useState } from 'react'
import { Note as NoteModel } from './models/note'
import Note from './components/Note'
import { Button, Col, Container, Row } from 'react-bootstrap'
import styles from './styles/NotesPage.module.css'
import * as NotesApi from './network/notes_api'
import AddEditNoteDialog from './components/AddEditNoteDialog'

function App() {
	const [notes, setNotes] = useState<NoteModel[]>([])
	const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false)

	useEffect(() => {
		async function loadNotes() {
			try {
				const notes = await NotesApi.fetchNotes()
				setNotes(notes)
			} catch (err) {
				console.error(err)
				alert(err)
			}
		}
		loadNotes()
	}, [])

	return (
		<Container>
			<Button onClick={() => setShowAddEditNoteDialog(true)}>
				Add new note
			</Button>
			<Row xs={1} md={2} xl={3} className='g-4'>
				{notes.map((note) => (
					<Col key={note._id}>
						<Note note={note} className={styles.note} />
					</Col>
				))}
			</Row>
			{showAddEditNoteDialog && (
				<AddEditNoteDialog
					onDismiss={() => setShowAddEditNoteDialog(false)}
					onNoteSaved={(newNote) => {
						setNotes([...notes, newNote])
						setShowAddEditNoteDialog(false)
					}}
				/>
			)}
		</Container>
	)
}

export default App
