import React, { FormEvent, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyQuestions from '../assets/images/empty-questions.svg'
import Logo from '../assets/images/logo.svg'
import Question from '../components/Question'
import RoomCodeBtn from '../components/RoomCodeBtn'
import useAuth from '../hooks/useAuth'
import useRoom from '../hooks/useRoom'
import { database } from '../services/firebase'
import { Params } from '../types/room'
import DeleteImg from '../assets/images/delete.svg'

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
            <Question key={q.id} author={q.author} content={q.content} >
              <button
                className='ring-1 focus:ring-white ring-white'
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
