import styles from '../styles/Note.module.css'
import { Card } from 'react-bootstrap'
import { Note as NoteModel } from '../models/note'
import { formateDate } from '../utils/formateDate'
import { MdDelete } from 'react-icons/md'
import styleUtils from '../styles/utils.module.css'

interface NoteProps {
	note: NoteModel
	onDeleteNoteClicked: (note: NoteModel) => void
	className?: string
}

export default function Note({
	note,
	onDeleteNoteClicked,
	className,
}: NoteProps) {
	const { title, text, createdAt, updatedAt } = note

	let createdUpdatedText: string
	if (updatedAt > createdAt) {
		createdUpdatedText = 'Updated: ' + formateDate(updatedAt)
	} else {
		createdUpdatedText = 'Created: ' + formateDate(createdAt)
	}

	return (
		<Card className={`${styles.noteCard} ${className}`}>
			<Card.Body className={styles.cardBody}>
				<Card.Title className={styleUtils.flexCenter}>
					{title}{' '}
					<MdDelete
						onClick={(e) => {
							onDeleteNoteClicked(note)
							e.stopPropagation()
						}}
						className='text-muted ms-auto'
					/>
				</Card.Title>
				<Card.Text className={styles.cardText}>{text}</Card.Text>
			</Card.Body>
			<Card.Footer className={styles.cardFooter}>
				{createdUpdatedText}
			</Card.Footer>
		</Card>
	)
}
