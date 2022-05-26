import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { database } from '../services/firebase'
import { FirebaseQuestion, QuestionType } from '../types/room'
import useAuth from './useAuth'

export default function useRoom(paramsId: string) {
  const { user } = useAuth()
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [roomTitle, setRoomTitle] = useState('')
  const location = useLocation()
  useEffect(() => {
    const roomRef = database.ref(`rooms/${paramsId}`)
    roomRef.once('value', (room) => {
      const databaseRoom = room.val()
      setRoomTitle(databaseRoom.title)
    })

  }, [location])
  useEffect(() => {
    const roomRef = database.ref(`rooms/${paramsId}`)
    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestion = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
        }
      })
      setQuestions(parsedQuestions)
    })

    return () => {
      roomRef.off('value')
    }
  }, [paramsId, user?.id])

  return { questions, roomTitle, setQuestions }
}
