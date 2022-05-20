import React from 'react'
import CopyImg from '../assets/images/copy.svg'
import { CodeProps } from '../types/room'

export default function RoomCodeBtn(props: CodeProps) {
  function copyCodeToClipBoard() {
    navigator.clipboard.writeText(props.code)
  }
  return (
    <button
      onClick={copyCodeToClipBoard}
      className='bg-mainPurple-500 relative left-8 justify-center items-center flex gap-3 ring-2 ring-mainPurple-500 rounded-lg h-10  pl-3'
      
      >
      <img
        className=''
        src={CopyImg}
        alt="copiar codigo da sala" />
      <p className='bg-white font-[Roboto] px-2 rounded-r-lg font-medium text-sm h-auto py-[0.64rem] w-[110%]'>
        Sala #{props.code}</p>
    </button>
  )
}
