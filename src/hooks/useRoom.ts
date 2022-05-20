import React, { FormEvent, useEffect, useState } from 'react'
import { database } from '../services/firebase'
import { FirebaseQuestion, QuestionType } from '../types/room'

export default function useRoom(paramsId: string,handleSendQuestion?:(e:FormEvent)=>Promise<void>) {
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
        isAnswered: value.isAnswered
      }))
      setQuestions(parsedQuestion)
      setRoomTitle(databaseRoom.title)
    })
  }, [paramsId, handleSendQuestion])

  return {questions,roomTitle}
}
