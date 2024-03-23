import { useEffect, useState } from 'react'
import { Note as NoteModel } from './models/note'
import Note from './components/Note'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import styles from './styles/NotesPage.module.css'
import styleUtils from './styles/utils.module.css'
import * as NotesApi from './network/notes_api'
import AddEditNoteDialog from './components/AddEditNoteDialog'
import { FaPlus } from 'react-icons/fa'
import SignUpModal from './components/SignUpModal'
import LoginModal from './components/LoginModal'

function App() {
	const [notes, setNotes] = useState<NoteModel[]>([])
	const [notesLoading, setNotesLoading] = useState(true)
	const [showNotesLoadingError, setShowNotesLoadingError] = useState(false)
	const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false)
	const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)

	useEffect(() => {
		async function loadNotes() {
			try {
				setShowNotesLoadingError(false)
				setNotesLoading(true)
				const notes = await NotesApi.fetchNotes()
				setNotes(notes)
			} catch (err) {
				console.error(err)
				setShowNotesLoadingError(true)
			} finally {
				setNotesLoading(false)
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

	const notesGrid = (
		<Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
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
	)

	return (
		<Container className={styles.notesPage}>
			<Button
				className={`my-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
				onClick={() => setShowAddEditNoteDialog(true)}>
				<FaPlus /> Add new note
			</Button>
			{notesLoading && <Spinner animation='border' variant='primary' />}
			{showNotesLoadingError && (
				<div className={styleUtils.errorText}>
					Failed to load notes. Please try again.
				</div>
			)}
			{!notesLoading && !showNotesLoadingError && (
				<>
					{notes.length > 0 ? (
						notesGrid
					) : (
						<h3 className='text-white text-center'>
							You don't have any notes yet.
						</h3>
					)}
				</>
			)}
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
			{false && (
				<SignUpModal onDismiss={() => {}} onSignUpSuccessful={() => {}} />
			)}
			{false && (
				<LoginModal onDismiss={() => {}} onLoginSuccessful={() => {}} />
			)}
		</Container>
	)
}

export default App
