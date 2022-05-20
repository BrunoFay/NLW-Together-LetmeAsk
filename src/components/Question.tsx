import React, { Children } from 'react'
import { QuestionProps } from '../types/room'

export default function Question({ author, content, children }: QuestionProps) {
  return (
    <div className='bg-[#fefefe] peer-last:bg-black hover:ring-1 hover:ring-mainPurple-500 transition-shadow flex flex-col gap-4 justify-between h-32 w-[55vw] mb-2 rounded-lg p-6'>
      <p className='font-[Roboto] text-base text-[#29292e]'>{content}</p>
      <footer className='flex justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <img
            className='w-8 h-8 rounded-full'
            src={author.avatar}
            alt={author.name} />
          <span className='font-[Roboto] font-medium text-sm text-[#737380]'>
            {author.name}
          </span>
        </div>
        <div >
          {children}
        </div>
      </footer>
    </div>
  )
}
