import styles from '../styles/Note.module.css'
import { Card } from 'react-bootstrap'
import { Note as NoteModel } from '../models/note'
import { formateDate } from '../utils/formateDate'

interface NoteProps {
	note: NoteModel
	className?: string
}

export default function Note({ note, className }: NoteProps) {
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
				<Card.Title>{title}</Card.Title>
				<Card.Text className={styles.cardText}>{text}</Card.Text>
			</Card.Body>
			<Card.Footer className={styles.cardFooter}>
				{createdUpdatedText}
			</Card.Footer>
		</Card>
	)
}
