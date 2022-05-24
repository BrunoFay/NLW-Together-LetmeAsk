import React, { useContext } from 'react'
import themeContext from '../context/themeContext'

export default function useDarkMode() {
  const { changeThemeMode, isDarkMode } = useContext(themeContext)
  return { changeThemeMode, isDarkMode }
}
