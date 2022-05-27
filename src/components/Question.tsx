import React from 'react'
import useDarkMode from '../hooks/useDarkMode'
import { QuestionProps } from '../types/room'

export default function Question({
  key,
  author,
  content,
  children,
  isAnswered = false,
  isHighlighted = false
}: QuestionProps) {
  const { isDarkMode } = useDarkMode()
  return (
    <div key={key}
      className={` 
      ${isHighlighted && !isAnswered ? 'highlighted' : ''}
       ${isAnswered ? 'answered hover:ring-current' : ''}
      ${isDarkMode ? 'bg-slate-100' : 'bg-[#fefefe]'} dark:bg-slate-100
    peer-last:bg-black hover:ring-2 hover:ring-mainColor-500 transition-shadow flex flex-col gap-4 justify-between
      lg:w-[55vw]  w-[90vw] rounded-lg p-5 `}>
      <p className='font-[Roboto] text-base  max-h-[6rem] text-[#29292e]  break-all overflow-auto w-auto  '>{content}
      </p>
      <footer className='flex justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <img
            className='w-8 h-8 rounded-full'
            src={author.avatar}
            alt={author.name} />
          <span
            className={`${isDarkMode ? 'text-zinc-700' : 'text-[#737380]'} dark:text-zinc-700 font-[Roboto] font-medium text-sm `}>
            {author.name}
          </span>
        </div>
        <div className='flex gap-4' >
          {children}
        </div>
      </footer>
    </div>
  )
}
