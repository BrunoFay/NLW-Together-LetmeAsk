import React from 'react'
import EmptyQuestions from '../assets/images/empty-questions.svg'
import Logo from '../assets/images/logo.svg'

export default function Room() {
  return (
    <div className='flex justify-center flex-col items-center'>
      <header className='w-[100vw] flex px-40 mt-7 pb-4 border-b-2 items-center  h-20 justify-between'>
        <img
          className='bt-5'
          src={Logo}
          alt="Letmeask logo" />
        <div>codigo da sala</div>
      </header>
      <main className='w-min mt-9  flex justify-center items-start gap-6 flex-col'>
        <div>
          <h1 className='font-bold text-2xl font-[Poppins]'>Sala React Q&A</h1>
        </div>
        <form>
          <textarea
            className='w-[55vw] h-32 p-2 rounded-lg focus:ring-2 resize-none'
            placeholder='O que você quer perguntar?'
          />

          <div className='flex justify-between items-center'>
            <span className='font-[Roboto] font-medium text-sm text-mainGrey-200'>Para enviar uma pergunta,
              {" "}
              <button className='text-mainPurple-500'> faça seu login</button>.
            </span>
            <button className='px-[1.5rem] rounded-lg disabled:opacity-50 disabled:pointer-events-none py-2 bg-mainPurple-500 text-[#f8f8f8]'>Enviar pergunta</button>
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
