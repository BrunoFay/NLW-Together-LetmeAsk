import { ReactNode } from "react";

export type CodeProps = {
  code: string;
}
export type Params = {
  id: string;
}
export type FirebaseQuestion = Record<string, {
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean,
  likes: Record<string, {
    authorId: string
  }>
}>

export type QuestionType = {
  id: string,
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean,
  likeCount: number,
  likeId: string | undefined
}
export type QuestionProps = {
  removeQuestion?: boolean
  key?: string
  content: string,
  author: {
    name: string,
    avatar: string
  }
  children?: ReactNode,
  isAnswered?: boolean,
  isHighlighted?: boolean,
}
export type ModalType = {
  isModalOpen: boolean,
  closeModal: () => void,
  children?: ReactNode,
  modalInfos: { title: string, paragraph: string, isHomePage?: boolean },
  isHomePage?: boolean
}
export type RoomTitleComponent = {
  isDarkMode:boolean
  roomTitle:string
  questions:QuestionType[]
}