import React, { PropsWithChildren, useEffect, useState } from 'react'
import AuthContext from './authContext'
import { firebase, auth } from '../services/firebase'
import { IUser } from '../interfaces/Iauth'


export default function AuthContextProvider(props: PropsWithChildren<{}>) {
  const [user, setUser] = useState<IUser>()
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user
        if (!displayName || !photoURL) {
          throw new Error('User must have a display name or a photo url')
        }
        setUser({ name: displayName, avatar: photoURL, id: uid })
      }
    })
    return () => unsubscribe()
  }, [])

  async function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    const result = await auth.signInWithPopup(provider)
    if (result.user) {
      const { displayName, photoURL, uid } = result.user
      if (!displayName || !photoURL) {
        throw new Error('User must have a display name or a photo url')
      }
      setUser({ name: displayName, avatar: photoURL, id: uid })
    }

  }
  const valueToProvide = {
    singInWithGoogle,
    user,
  }
  return (
    <AuthContext.Provider value={valueToProvide}>
      {props.children}
    </AuthContext.Provider>
  )
}
