import React, { FormEvent, useEffect, useState } from 'react'
import { database } from '../services/firebase'
import { FirebaseQuestion, QuestionType } from '../types/room'
import useAuth from './useAuth'

export default function useRoom(
  paramsId: string,
  handleQuestion?: (e: FormEvent, question?: string) => Promise<void>
) {
  const { user } = useAuth()
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [roomTitle, setRoomTitle] = useState('')

  useEffect(() => {
    const roomRef = database.ref(`rooms/${paramsId}`)
    roomRef.once('value', (room) => {
      const databaseRoom = room.val()
      const firebaseQuestion: FirebaseQuestion = databaseRoom?.questions
      const parsedQuestion = Object.entries(firebaseQuestion).map(([key, value]) => ({
        id: key,
        content: value.content,
        author: value.author,
        isHighlighted: value.isHighlighted,
        isAnswered: value.isAnswered,
        likeCount: Object.values(value.likes ?? {}).length,
        likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
      }))
      setQuestions(parsedQuestion)
      setRoomTitle(databaseRoom.title)
    })

    return () => {
      roomRef.off('value')
    }
  }, [paramsId, handleQuestion, questions, user?.id])

  return { questions, roomTitle }
}
