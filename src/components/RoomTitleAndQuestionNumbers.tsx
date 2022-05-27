import React from 'react'
import { RoomTitleComponent } from '../types/room'

export default function RoomTitleAndQuestionNumbers({ isDarkMode, roomTitle, questions }: RoomTitleComponent) {
  return (
    <div className='flex gap-4'>
      <h1 className={`font-bold text-2xl transition-colors font-[Poppins] ${isDarkMode ? 'text-mainGrey-200 '
        : ''} dark:text-mainGrey-200 `}>
        Sala {roomTitle}
      </h1>
      {questions.length > 0 && (
        <span
          className='rounded-[3rem] px-4 py-2 text-[#f8f8f8] font-[Roboto] font-medium text-sm bg-[#e559f9]'>
          {questions.length} perguntas
        </span>
      )}
    </div>
  )
}
