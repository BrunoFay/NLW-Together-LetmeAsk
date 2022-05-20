import { ReactNode } from "react";
import Question from "../components/Question";

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
}
export type QuestionProps ={
content:string,
author:{
  name:string,
  avatar:string
}
children?:ReactNode
}