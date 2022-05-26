export type IAuthContext = {
  user: IUser | undefined,
  singInWithGoogle: () => Promise<void>
}

export type IUser = {
  id: string,
  name: string,
  avatar: string
}