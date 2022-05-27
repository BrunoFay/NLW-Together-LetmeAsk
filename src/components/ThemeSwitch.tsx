import { Switch } from '@headlessui/react';
import { BsSun } from 'react-icons/bs';
import { FiMoon } from 'react-icons/fi';
import useDarkMode from '../hooks/useDarkMode';

export default function ThemeSwitch() {
  const { changeThemeMode, isDarkMode } = useDarkMode()

  return (
    <div className="themeSwitch py-16">
      <Switch
        checked={isDarkMode}
        onChange={changeThemeMode}
        className={`${!isDarkMode ? 'bg-gray-700' : 'bg-white'}
        dark:bg-white relative inline-flex h-[2rem] w-[5rem] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${!isDarkMode ? 'translate-x-0 bg-white' : 'translate-x-10 bg-black'}
          dark:bg-black pointer-events-none  h-[1.7rem] flex items-center justify-center w-[2rem] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
        >
          {isDarkMode ? (<BsSun className='text-white text-lg' />) : <FiMoon className='text-black' />}
        </span>
      </Switch>
    </div>
  )
}
