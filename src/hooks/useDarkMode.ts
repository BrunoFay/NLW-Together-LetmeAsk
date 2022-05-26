import { useContext, useEffect } from 'react'
import themeContext from '../context/themeContext'

export default function useDarkMode() {
  const { changeThemeMode, isDarkMode } = useContext(themeContext)
  useEffect(() => {
    changeBodyColor()
  }, [isDarkMode])
  function changeBodyColor() {
    const body = document.querySelector('body') as any
    (isDarkMode) ? body.style.backgroundColor = '#0D1117' : body.style.backgroundColor = '#f8f8f8'

  }
  return { changeThemeMode, isDarkMode }
}
