import React, { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Illustration from '../assets/images/illustration.svg'
import LogoComponent from '../components/LogoComponent'
import ThemeSwitch from '../components/ThemeSwitch'
import useAuth from '../hooks/useAuth'
import useDarkMode from '../hooks/useDarkMode'
import { database } from '../services/firebase'

export default function NewRoom() {
  const [newRoom, setNewRoom] = useState('')
  const { user } = useAuth()
  const navigate = useNavigate()
  const { isDarkMode } = useDarkMode()
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
    navigate(`/rooms/admin/${firebaseRoom.key}`)
  }

  return (
    <main className={`w-[100vw] h-[100vh] flex dark:bg-mainDark-500`}>
      <section
        className='w-[42.25rem] md:visible hidden h-[100vh] bg-gradient-to-r from-mainColor-700 to-mainColor-500  md:flex items-center ' >
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
          <LogoComponent />
          <h2 className={`${isDarkMode ? 'text-mainGrey-200' : 'text-zinc-800'} dark:text-mainGrey-200 text-2xl font-bold relative top-3  font-[Poppins]`}>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom} className='flex justify-center flex-col gap-4 '>
            <input
              type='text'
              placeholder='Nome da sala'
              value={newRoom}
              onChange={({ target }) => setNewRoom(target.value)}
              className='h-12 w-80 ring-1 ring-mainGrey-200 px-4 py-1 rounded-lg bg-white'
            />
            <button
              className='h-12 w-80 text-[#fefefe] px-4 py-2 rounded-lg bg-mainColor-500'
              type='submit'
            >
              Criar sala
            </button>
          </form>
          <p className={`${isDarkMode ? 'text-mainGrey-200' : 'text-[#737380]'} dark:text-mainGrey-200 text-sm flex gap-1  relative bottom-6`}>
            Quer entrar em uma sala já existente?
            <Link className=' text-red-500' to='/'>
              Click aqui
            </Link>
          </p>
        </div>
      </section>
      <div className='fixed right-4  top-0'>
        <ThemeSwitch />
      </div>
    </main>
  )
}
