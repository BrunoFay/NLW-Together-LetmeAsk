import React, { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EmptyQuestions from '../assets/images/empty-questions.svg'
import Logo from '../assets/images/logo.svg'
import RoomCodeBtn from '../components/RoomCodeBtn'
import useAuth from '../hooks/useAuth'
import { FirebaseQuestion, Question, Params } from '../types/room'
import { database } from '../services/firebase'

export default function Room() {
  const params = useParams<Params>()
  const { user } = useAuth()
  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [roomTitle, setRoomTitle] = useState('')

  useEffect(() => {
    const roomRef = database.ref(`rooms/${params.id}`)
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
  }, [params.id])
  async function sendQuestionToDb() {
    const questionFormated = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar,
      }
    }
    await database.ref(`rooms/${params.id}/questions`).push(questionFormated)
  }
  async function handleSendQuestion(e: FormEvent) {
    e.preventDefault()
    if (newQuestion.trim() === '') return
    if (!user) throw new Error('User not found')
    await sendQuestionToDb()
    setNewQuestion('')
  }


  return (
    <div className='flex justify-center flex-col items-center'>
      <header className='w-[100vw] flex px-40 mt-7 pb-4 border-b-2 items-center  h-20 justify-between'>
        <img
          className='bt-5 h-14'
          src={Logo}
          alt="Letmeask logo" />

        <RoomCodeBtn code={`${params.id}`} />
      </header>
      <main className='w-min mt-9  flex justify-center items-start gap-6 flex-col'>
        <div className='flex gap-4'>
          <h1 className='font-bold text-2xl font-[Poppins]'>Sala {roomTitle}</h1>
          {questions.length > 0 && (
            <span
              className='rounded-[3rem] px-3 py-1 text-[#f8f8f8] font-[Roboto] font-medium text-sm bg-[#e559f9]'>
              {questions.length} perguntas
            </span>
          )}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            value={newQuestion}
            onChange={({ target }) => setNewQuestion(target.value)}
            className='w-[55vw] h-32 p-2 rounded-lg focus:ring-2 resize-none'
            placeholder='O que você quer perguntar?'
          />

          <div className='flex justify-between items-center'>
            {!user ?
              (<span className='font-[Roboto] font-medium text-sm text-mainGrey-200'>Para enviar uma pergunta,
                {" "}
                <button className='text-mainPurple-500'> faça seu login</button>.
              </span>) :
              (<div className='flex gap-2 items-center '>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className='w-8 h-8 rounded-full'
                />
                <span className='font-[Roboto] font-medium text-sm text-[#737380]'>{user.name}</span>
              </div>)
            }
            <button
              disabled={!user}
              className='px-[1.5rem] rounded-lg disabled:opacity-50 disabled:pointer-events-none py-2 bg-mainPurple-500 text-[#f8f8f8]'>Enviar pergunta
            </button>
          </div>
        </form>
        <div className='flex flex-col items-center self-center gap-1 w-[17.75rem]'>
          <img
            className='h-[9.375rem] w-[9.375rem]'
            src={EmptyQuestions}
            alt="baloes de dialogo vazios coloridos" />
          <h2 className='font-[Poppins] text-lg font-semibold'>Nenhuma pergunta por aqui...  </h2>
          <p className='font-[Roboto] text-sm text-center text-mainGrey-200'>Faça o seu login e seja a primeira pessoa a fazer uma pergunta!
          </p>
        </div>
      </main>
    </div>
  )
}
