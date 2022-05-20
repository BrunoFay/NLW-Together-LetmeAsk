import React, { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import EmptyQuestions from '../assets/images/empty-questions.svg'
import Logo from '../assets/images/logo.svg'
import Question from '../components/Question'
import RoomCodeBtn from '../components/RoomCodeBtn'
import useAuth from '../hooks/useAuth'
import useRoom from '../hooks/useRoom'
import { database } from '../services/firebase'
import { Params } from '../types/room'

export default function Room() {
  const params = useParams<Params>()
  const { user } = useAuth()
  const [newQuestion, setNewQuestion] = useState('')
  const roomId = params.id as string
  const { questions, roomTitle } = useRoom(roomId, handleSendQuestion)
  async function sendQuestionToDb() {
    const questionFormated = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar,
      }
    }
    await database.ref(`rooms/${params.id}/questions`).push(questionFormated)
  }
  async function handleSendQuestion(e: FormEvent) {
    e.preventDefault()
    if (newQuestion.trim() === '') return
    if (!user) throw new Error('User not found')
    await sendQuestionToDb()
    setNewQuestion('')
  }
  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    (likeId) ? await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
      : await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id
      })
  }

  return (
    <div className='flex justify-center flex-col items-center'>
      <header className='w-[100vw] flex px-40 mt-7 pb-4 border-b-2 items-center  h-20 justify-between'>
        <img
          className='bt-5 h-14'
          src={Logo}
          alt="Letmeask logo" />

        <RoomCodeBtn code={`${params.id}`} />
      </header>
      <main className='w-min mt-9  flex justify-center items-start gap-6 flex-col'>
        <div className='flex gap-4'>
          <h1 className='font-bold text-2xl font-[Poppins]'>Sala {roomTitle}</h1>
          {questions.length > 0 ? (
            <span
              className='rounded-[3rem] px-3 py-1 text-[#f8f8f8] font-[Roboto] font-medium text-sm bg-[#e559f9]'>
              {questions.length} perguntas
            </span>
          ) : null}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            value={newQuestion}
            onChange={({ target }) => setNewQuestion(target.value)}
            className='w-[55vw] h-32 p-2 rounded-lg focus:ring-2 resize-none'
            placeholder='O que você quer perguntar?'
          />

          <div className='flex justify-between items-center'>
            {!user ?
              (<span className='font-[Roboto] font-medium text-sm text-mainGrey-200'>Para enviar uma pergunta,
                {" "}
                <button className='text-mainPurple-500'> faça seu login</button>.
              </span>) :
              (<div className='flex gap-2 items-center '>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className='w-8 h-8 rounded-full'
                />
                <span className='font-[Roboto] font-medium text-sm text-[#737380]'>{user.name}</span>
              </div>)
            }
            <button
              disabled={!user}
              className='px-[1.5rem] rounded-lg disabled:opacity-50 disabled:pointer-events-none py-2 bg-mainPurple-500 text-[#f8f8f8]'>Enviar pergunta
            </button>
          </div>
        </form>

        {questions.length > 0 ? questions.map(q => {
          return (
            <Question key={q.id} author={q.author} content={q.content} >
              <button
                className={q.likeId ? `ring-1 focus:ring-white ring-white liked flex gap-2 items-center ` :
                  `flex gap-2 items-center ring-1 focus:ring-white ring-white`}
                type='button'
                aria-label='botão de like'
                onClick={() => handleLikeQuestion(q.id, q.likeId)}
              >
                {q.likeCount > 0 && <span className='relative top-1'>{q.likeCount}</span>}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

              </button>
            </Question>
          )
        })
          :
          (<div className='flex flex-col items-center self-center gap-1 w-[17.75rem]'>
            <img
              className='h-[9.375rem] w-[9.375rem]'
              src={EmptyQuestions}
              alt="baloes de dialogo vazios coloridos" />
            <h2 className='font-[Poppins] text-lg font-semibold'>Nenhuma pergunta por aqui...  </h2>
            <p className='font-[Roboto] text-sm text-center text-mainGrey-200'>Faça o seu login e seja a primeira pessoa a fazer uma pergunta!
            </p>
          </div>)
        }

      </main>
    </div>
  )
}
