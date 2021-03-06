import React, { useState } from 'react'
import CopyImg from '../assets/images/copy.svg'
import useDarkMode from '../hooks/useDarkMode'
import { CodeProps } from '../types/room'

export default function RoomCodeBtn(props: CodeProps) {
  const [isCodeCopied, setIsCodeCopied] = useState<boolean>(false)
  const { isDarkMode } = useDarkMode()
  function copyCodeToClipBoard() {
    navigator.clipboard.writeText(props.code)
    setIsCodeCopied(true)
  }
  return (
    <button
      type='button'
      onClick={copyCodeToClipBoard}
      className='bg-mainColor-500 lg:relative lg:left-8 justify-center items-center flex gap-3 ring-2 ring-mainColor-500 rounded-lg h-10  lg:pl-3 pl-2'

    >
      <img
        className=''
        src={CopyImg}
        alt="copiar codigo da sala" />
      {!isCodeCopied ? (
        <p className={`${isDarkMode ? 'bg-slate-200 text-[#43434d]' : 'bg-white '} 
        dark:bg-slate-200 dark:text-[#43434d] font-[Roboto] px-2 rounded-r-lg font-medium text-sm h-auto py-[0.64rem] w-[110%]`}>
          Sala: {props.code}
        </p>
      ) :
        (
          <p className={`${isDarkMode ? 'bg-slate-300 text-[#43434d] ' : 'bg-white'} dark:bg-slate-200 dark:text-[#43434d] font-[Roboto] px-2 rounded-r-lg font-medium text-sm h-auto py-[0.64rem] w-[110%]`}>
            Copiado !
          </p>
        )
      }
    </button>
  )
}
