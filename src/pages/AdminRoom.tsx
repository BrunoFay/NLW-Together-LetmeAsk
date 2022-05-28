import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import EmptyQuestions from '../assets/images/empty-questions.svg'
import LogoComponent from '../components/LogoComponent'
import Modal from '../components/Modal'
import Question from '../components/Question'
import RoomCodeBtn from '../components/RoomCodeBtn'
import RoomTitleAndQuestionNumbers from '../components/RoomTitleAndQuestionNumbers'
import ThemeSwitch from '../components/ThemeSwitch'
import useDarkMode from '../hooks/useDarkMode'
import useModal from '../hooks/useModal'
import useRoom from '../hooks/useRoom'
import { database } from '../services/firebase'
import { Params } from '../types/room'


const MODAL_INFOS_CLOSE_ROOM = {
  title: "Encerrar sala",
  paragraph: "Você tem certeza que deseja encerrar a sala?"
}
const MODAL_INFOS_REMOVE_MESSAGE = {
  title: "Excluir pergunta",
  paragraph: "Tem certeza que você deseja excluir esta pergunta?"
}
export default function AdminRoom() {
  const params = useParams<Params>()
  const roomId = params.id as string
  const { questions, roomTitle } = useRoom(roomId)
  const navigate = useNavigate()
  const { openModal, isModalOpen, closeModal } = useModal()
  const { isDarkMode } = useDarkMode()
  const [isClosedClicked, setIsClosedClicked] = useState(false)
  const [idQuestionToDelete, setIdQuestionToDelete] = useState('')

  function modalCloseRoom() {
    setIsClosedClicked(!isClosedClicked)
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })
    navigate('/')
  }

  function middleDeleteQuestion(questionId: string) {
    setIdQuestionToDelete(questionId)
    openModal()
  }

  async function handleDeleteQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    closeModal()
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true
    })
  }

  async function handleHightLightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true
    })
  }

  return (
    <div className={`flex justify-center h-[100vh] flex-col items-center transition-colors dark:bg-mainDark-500`}>
      <header className='admin-header w-[100vw] flex px-5 border-b-2 pb-4 relative bottom-[8rem] items-center h-20 md:justify-between'>
        <LogoComponent />
        <div className='admin-header-btn flex  w-[30rem] lg:flex-row flex-col justify-evenly gap-8  '>
          <RoomCodeBtn code={`${params.id}`} />
          <button
          type='button'
            onClick={modalCloseRoom}
            className={`${isDarkMode ? 'ring-white text-white hover:ring-mainColor-500' :
              'ring-mainColor-500 text-mainColor-500'} dark:ring-white dark:text-white dark:hover:ring-mainColor-500 ring-1 rounded-lg md:px-6 hover:text-white hover:bg-mainColor-500 transition-colors close-room-btn`}>
            Encerrar sala
          </button>
        </div>
        <ThemeSwitch />
        <Modal
          isModalOpen={(isClosedClicked)}
          closeModal={modalCloseRoom}
          modalInfos={MODAL_INFOS_CLOSE_ROOM} >
          <button
            type="button"
            className="inline-flex justify-center rounded-md border opacity-50 border-transparent bg-[#E73F5D] px-4 py-2 text-sm font-medium text-white hover:opacity-100 focus:opacity-100 "
            onClick={handleEndRoom}
          >
            Sim, encerrar
          </button>
        </Modal>
      </header>
      <main className='admin-main w-min h-[42vh] relative bottom-16 flex items-start gap-6 flex-col'>
        <RoomTitleAndQuestionNumbers
          isDarkMode={isDarkMode}
          roomTitle={roomTitle}
          questions={questions}
        />
        {questions.length > 0 ? questions
          .sort((a, b) => b.likeCount - a.likeCount)
          .sort(x => !x.isAnswered && x.isHighlighted ? -1 : 1)
          .map(q => {
            return (
              <Question
                key={q.id}
                author={q.author}
                content={q.content}
                isAnswered={q.isAnswered}
                isHighlighted={q.isHighlighted}
                removeQuestion={true}
              >
                {!q.isAnswered && (
                  <>
                    <button
                      className='check-btn ring-1 focus:ring-transparent ring-transparent'
                      type='button'
                      onClick={() => handleCheckQuestionAsAnswered(q.id)}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12.0003" cy="11.9998" r="9.00375" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                    </button>
                    <button
                      className='hightlight-btn ring-1 focus:ring-transparent ring-transparent'
                      type='button'
                      onClick={() => handleHightLightQuestion(q.id)}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>

                    </button>
                  </>)}
                <button
                  className='ring-1 focus:ring-transparent ring-transparent'
                  type='button'
                  onClick={() => middleDeleteQuestion(q.id)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5.99988H5H21" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M8 5.99988V3.99988C8 3.46944 8.21071 2.96074 8.58579 2.58566C8.96086 2.21059 9.46957 1.99988 10 1.99988H14C14.5304 1.99988 15.0391 2.21059 15.4142 2.58566C15.7893 2.96074 16 3.46944 16 3.99988V5.99988M19 5.99988V19.9999C19 20.5303 18.7893 21.039 18.4142 21.4141C18.0391 21.7892 17.5304 21.9999 17 21.9999H7C6.46957 21.9999 5.96086 21.7892 5.58579 21.4141C5.21071 21.039 5 20.5303 5 19.9999V5.99988H19Z" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                </button>
                <Modal
                  isModalOpen={isModalOpen}
                  closeModal={closeModal}
                  modalInfos={MODAL_INFOS_REMOVE_MESSAGE} >
                  <button
                    className="inline-flex justify-center rounded-md border opacity-50 border-transparent bg-secondaryColor-500 px-4 py-2 text-sm font-medium text-white hover:opacity-100 focus:opacity-100 "
                    type='button'
                    onClick={() => handleDeleteQuestion(idQuestionToDelete)}
                  >
                    Sim, excluir
                  </button>
                </Modal>
              </Question>
            )
          })
          :
          (<div className='flex mt-10 flex-col items-center self-center gap-5 w-[17.75rem]'>
            <img
              className='h-[9.375rem] w-[9.375rem]'
              src={EmptyQuestions}
              alt="baloes de dialogo vazios coloridos" />
            <h2
              className={`${isDarkMode ? 'text-white' : ''} dark:text-white transition-colors font-[Poppins] text-lg font-semibold`}>
              Nenhuma pergunta por aqui...
            </h2>

          </div>)
        }
        {/* space for the last div not to be pasted */}
        <span className='pt-1 h-8 w-1' />
      </main>
    </div>
  )
}
