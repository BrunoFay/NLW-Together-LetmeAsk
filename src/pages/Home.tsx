import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GoogleIcon from '../assets/images/google-icon.svg'
import Illustration from '../assets/images/illustration.svg'
import LogoComponent from '../components/LogoComponent'
import Modal from '../components/Modal'
import ThemeSwitch from '../components/ThemeSwitch'
import useAuth from '../hooks/useAuth'
import useModal from '../hooks/useModal'
import { database } from '../services/firebase'

const MODAL_INFOS_ENTER_ROOM = {
  title: "Atenção",
  paragraph: "Código da sala invalido, verifique o código!",
  isHomePage: true
}
const MODAL_INFOS_CLOSED_ROOM = {
  title: "Atenção",
  paragraph: "Essa sala já foi encerrada!",
  isHomePage: true
}
export default function Home() {
  const navigate = useNavigate()
  const { singInWithGoogle, user } = useAuth()
  const [roomCode, setRoomCode] = useState('')
  const { openModal, isModalOpen, closeModal } = useModal()
  const [isRoomClosed, setIsRoomClosed] = useState(false)



  async function handleCreateRoom() {
    if (!user) {
      await singInWithGoogle()

    }
    navigate('/rooms/new')
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault()

    if (roomCode.trim() === '') {
      return;
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      openModal()

      return
    }
    if (roomRef.val().endedAt) {
      setIsRoomClosed(true)
      return;
    }
    navigate(`/rooms/${roomCode}`)
  }
  return (
    <main className={`w-[100vw] h-[100vh] flex dark:bg-mainDark-500 `}>
      <section className='md:visible hidden w-[42.25rem] h-[100vh] bg-gradient-to-r from-mainColor-700 to-mainColor-500 md:flex items-center ' >
        <div className='w-[28.688rem] pl-12 flex flex-col gap-1 items-start text-left '>
          <img
            className='py-5'
            src={Illustration}
            alt="ilustração simbolizando perguntas e repostas" />
          <h1 className='font-[Poppins] text-4xl font-bold text-white'>Toda pergunta tem uma resposta.</h1>
          <p className='font-[Roboto] text-2xl font-normal  text-[#f8f8f8] opacity-70'>
            Aprenda e compartilhe conhecimento com outras pessoas
          </p>
        </div>
      </section>
      <section className='flex items-center justify-center  w-[47.75rem]'>
        <div
          className='flex flex-col items-center h-[23.188rem] w-[20.063rem]
            justify-between'>
          <LogoComponent />
          <button
            type='button'
            onClick={handleCreateRoom}
            className='flex justify-center text-white gap-2 rounded-lg w-[20rem] bg-secondaryColor-500 px-6 py-3'>
            <img src={GoogleIcon} alt="logo google dentro de um botão" />
            Criar sala com o Google
          </button>
          <div className='flex items-center gap-3 text-mainGrey-200'>
            <hr className='border-1 border-mainGrey-200 w-16' />
            ou entre em uma sala
            <hr className='border-1 border-mainGrey-200 w-16' />

          </div>
          <form onSubmit={handleJoinRoom} className='flex justify-center flex-col gap-4 '>
            <input
              type='text'
              value={roomCode}
              onChange={({ target }) => setRoomCode(target.value)}
              placeholder='Digite o código da sala'
              className='h-12 w-80 ring-1 ring-mainGrey-200 px-4 py-1 rounded-lg bg-white'
            />
            <button
              className='h-12 w-80 text-[#fefefe] px-4 py-2 rounded-lg bg-mainColor-500'
              type='submit'
            >Entrar na sala
            </button>
          </form>
        </div>
        <Modal
          modalInfos={MODAL_INFOS_ENTER_ROOM}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
        />
        <Modal
          modalInfos={MODAL_INFOS_CLOSED_ROOM}
          isModalOpen={isRoomClosed}
          closeModal={() => { setIsRoomClosed(false) }}
        />
      </section>
      <div className='fixed right-4 top-0'>
        <ThemeSwitch />
      </div>
    </main>
  )
}
