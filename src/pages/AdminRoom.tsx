import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DeleteImg from '../assets/images/delete.svg'
import EmptyQuestions from '../assets/images/empty-questions.svg'
import Logo from '../assets/images/logo.svg'
import Question from '../components/Question'
import RoomCodeBtn from '../components/RoomCodeBtn'
import useAuth from '../hooks/useAuth'
import useRoom from '../hooks/useRoom'
import { database } from '../services/firebase'
import { Params } from '../types/room'

export default function AdminRoom() {
  const params = useParams<Params>()
  const { user } = useAuth()
  const roomId = params.id as string
  const { questions, roomTitle } = useRoom(roomId, handleDeleteQuestion as any)
  const navigate = useNavigate()

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).remove()

    navigate('/')
  }
  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }
  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }
  async function handleHightLightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }
  return (
    <div className='flex justify-center flex-col items-center'>
      <header className='w-[100vw] flex px-40 mt-7 pb-4 border-b-2 items-center  h-20 justify-between'>
        <img
          className='bt-5 h-14'
          src={Logo}
          alt="Letmeask logo" />
        <div className='flex w-[33vw] relative left-10 justify-between  gap-2'>
          <RoomCodeBtn code={`${params.id}`} />
          <button
            onClick={handleEndRoom}
            className='ring-1 rounded-lg text-mainPurple-500 px-6 ring-mainPurple-500 hover:text-white hover:bg-mainPurple-500 transition-colors'>
            Encerrar sala
          </button>
        </div>
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
        {questions.length > 0 ? questions.map(q => {
          return (
            <Question
              key={q.id}
              author={q.author}
              content={q.content}
              isAnswered={q.isAnswered}
              isHighlighted={q.isHighlighted}
            >
              {!q.isAnswered && (
                <>
                  <button
                    className='check-btn ring-1 focus:ring-transparent ring-transparent'
                    type='button'
                    onClick={() => handleCheckQuestionAsAnswered(q.id)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12.0003" cy="11.9998" r="9.00375" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                  </button>
                  <button
                    className='hightlight-btn ring-1 focus:ring-transparent ring-transparent'
                    type='button'
                    onClick={() => handleHightLightQuestion(q.id)}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                  </button>
                </>)}
              <button
                className='ring-1 focus:ring-transparent ring-transparent'
                type='button'
                onClick={() => handleDeleteQuestion(q.id)}
              >
                <img src={DeleteImg} alt="remover pergunta" />
              </button>
            </Question>
          )
        })
          :
          (<div className='flex flex-col items-center self-center gap-1 w-[17.75rem]'>
            <img
              className='h-[9.375rem] w-[9.375rem]'
              src={EmptyQuestions}
              alt="baloes de dialogo vazios coloridos" />
            <h2 className='font-[Poppins] text-lg font-semibold'>Nenhuma pergunta por aqui...  </h2>
            <p className='font-[Roboto] text-sm text-center text-mainGrey-200'>Faça o seu login e seja a primeira pessoa a fazer uma pergunta!
            </p>
          </div>)
        }

      </main>
    </div>
  )
}
