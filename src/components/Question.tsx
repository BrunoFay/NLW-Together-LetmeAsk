import React, { Children } from 'react'
import useDarkMode from '../hooks/useDarkMode'
import { QuestionProps } from '../types/room'

export default function Question({
  author,
  content,
  children,
  isAnswered = false,
  isHighlighted = false
}: QuestionProps) {
  const { isDarkMode } = useDarkMode()
  return (
    <div
      className={` ${isHighlighted && !isAnswered ? 'highlighted' : ''} ${isAnswered ? 'answered' : ''}
      ${isDarkMode ? 'bg-slate-300' : 'bg-[#fefefe]'} dark:bg-slate-300
    peer-last:bg-black hover:ring-1 hover:ring-mainPurple-500 transition-shadow flex flex-col gap-4 justify-between h-32 w-[55vw] mb-2 rounded-lg p-6
    `}>
      <p className='font-[Roboto] text-base text-[#29292e]'>{content}</p>
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
