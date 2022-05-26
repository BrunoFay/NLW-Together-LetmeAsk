import { useContext } from 'react'
import AuthContext from '../context/authContext'

export default function useAuth() {
  const authContext = useContext(AuthContext)
  return authContext

}
