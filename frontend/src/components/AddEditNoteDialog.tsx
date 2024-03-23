import { Button, Form, Modal } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { NoteInput } from '../network/notes_api'
import * as NotesApi from '../network/notes_api'
import { Note } from '../models/note'

interface AddEditNoteDialogProps {
	onDismiss: () => void
	onNoteSaved: (note: Note) => void
}

export default function AddEditNoteDialog({
	onDismiss,
	onNoteSaved,
}: AddEditNoteDialogProps) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<NoteInput>()

	async function onSubmit(input: NoteInput) {
		try {
			const noteResponse = await NotesApi.createNote(input)
			onNoteSaved(noteResponse)
			onDismiss()
		} catch (err) {
			console.error(err)
			alert(err)
		}
	}

	return (
		<Modal show onHide={onDismiss}>
			<Modal.Header closeButton>
				<Modal.Title>Add Note</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form id='addNoteForm' onSubmit={handleSubmit(onSubmit)}>
					<Form.Group className='mb-3'>
						<Form.Label>Title</Form.Label>
						<Form.Control
							type='text'
							placeholder='Title'
							isInvalid={!!errors.title}
							{...register('title', { required: 'Title is required' })}
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.title?.message}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className='mb-3'>
						<Form.Label>Text</Form.Label>
						<Form.Control
							as='textarea'
							rows={5}
							placeholder='Note'
							{...register('text', { required: 'Text is required' })}
						/>
					</Form.Group>
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button type='submit' form='addNoteForm' disabled={isSubmitting}>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
