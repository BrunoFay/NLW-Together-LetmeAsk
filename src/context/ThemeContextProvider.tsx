import React, { PropsWithChildren, useState } from 'react'
import ThemeContext from './themeContext'


export default function ThemeContextProvider(props: PropsWithChildren<{}>) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  function changeThemeMode() {
    setIsDarkMode(!isDarkMode)
  }
  const valueToProvide = { isDarkMode,changeThemeMode }
  return (
    <ThemeContext.Provider value={valueToProvide}>
      {props.children}
    </ThemeContext.Provider>
  )
}