import React from 'react'
import EmptyQuestions from '../assets/images/empty-questions.svg'

export default function Room() {
  return (
    <div>
      <header></header>
      <main>
        <img src={EmptyQuestions} alt="baloes de dialogo vazios coloridos" />
        <h2>Nenhuma pergunta por aqui...</h2>
        <p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
      </main>
    </div>
  )
}
