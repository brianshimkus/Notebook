import { useEffect, useState } from 'react'
import { Note as NoteModel } from './models/note'
import Note from './components/Note'
import { Button, Col, Container, Row } from 'react-bootstrap'
import styles from './styles/NotesPage.module.css'
import styleUtils from './styles/utils.module.css'
import * as NotesApi from './network/notes_api'
import AddEditNoteDialog from './components/AddEditNoteDialog'
import { FaPlus } from 'react-icons/fa'

function App() {
	const [notes, setNotes] = useState<NoteModel[]>([])
	const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false)
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)

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

	async function deleteNote(note: NoteModel) {
		try {
			await NotesApi.deleteNote(note._id)
			setNotes(notes.filter((n) => n._id !== note._id))
		} catch (err) {
			console.error(err)
			alert(err)
		}
	}

	return (
		<Container>
			<Button
				className={`my-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
				onClick={() => setShowAddEditNoteDialog(true)}>
				<FaPlus /> Add new note
			</Button>
			<Row xs={1} md={2} xl={3} className='g-4'>
				{notes.map((note) => (
					<Col key={note._id}>
						<Note
							note={note}
							className={styles.note}
							onNoteClicked={setNoteToEdit}
							onDeleteNoteClicked={deleteNote}
						/>
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
			{noteToEdit && (
				<AddEditNoteDialog
					noteToEdit={noteToEdit}
					onDismiss={() => setNoteToEdit(null)}
					onNoteSaved={(updatedNote) => {
						setNotes(
							notes.map((existingNote) =>
								existingNote._id === updatedNote._id
									? updatedNote
									: existingNote
							)
						)
						setNoteToEdit(null)
					}}
				/>
			)}
		</Container>
	)
}

export default App
