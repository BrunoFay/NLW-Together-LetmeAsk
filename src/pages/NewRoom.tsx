import React, { FormEvent, useState } from 'react'
import Illustration from '../assets/images/illustration.svg'
import LogoImg from '../assets/images/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { database } from '../services/firebase'
import useAuth from '../hooks/useAuth'

export default function NewRoom() {
  const [newRoom, setNewRoom] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()
  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault()
    if (newRoom.trim() === '') {
      return;
    }
    const roomRef = database.ref('rooms')
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })
    navigate(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <main className='w-[100vw] h-[100vh] flex'>
      <section className='w-[42.25rem] h-[100vh] bg-mainPurple-500 flex items-center ' >
        <div className='w-[28.688rem] pl-12 flex gap-1 flex-col items-start text-left '>
          <img src={Illustration} alt="ilustração simbolizando perguntas e repostas" />
          <h1 className='font-[Poppins] text-4xl font-bold text-white'>Toda pergunta tem uma resposta.</h1>
          <p className='font-[Roboto] text-2xl font-normal text-[#f8f8f8] opacity-70'>Aprenda e compartilhe conhecimento
            com outras pessoas
          </p>
        </div>
      </section>
      <section className='flex items-center justify-center  w-[47.75rem]'>
        <div
          className='flex flex-col items-center  h-[23.188rem] w-[20.063rem]
            justify-between'>
          <img className='h-[4.313rem] w-[9.625rem] ' src={LogoImg} alt="logo" />
          <h2 className='text-2xl font-bold relative top-3 text-zinc-800 font-[Poppins]'>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom} className='flex justify-center flex-col gap-4 '>
            <input
              type='text'
              placeholder='Nome da sala'
              value={newRoom}
              onChange={({ target }) => setNewRoom(target.value)}
              className='h-12 w-80 ring-1 ring-mainGrey-200 px-4 py-1 rounded-lg bg-white'
            />
            <button
              className='h-12 w-80 text-[#fefefe] px-4 py-2 rounded-lg bg-mainPurple-500'
              type='submit'
            >
              Criar sala
            </button>
          </form>
          <p className='text-sm flex gap-1 text-[#737380] relative bottom-6'>Quer entrar em uma sala já existente?
            <Link className=' text-red-500' to='/'>
              Click aqui
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
