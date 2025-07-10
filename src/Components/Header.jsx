// we will create FlixGPT header component we have tailwind configured with us

import React from 'react'
import flixgptLogo from '../assets/flixgpt-logo.svg'

const Header = () => {
  return (
    <>
    <div className="flex items-center p-4">
        <img src={flixgptLogo} alt="FlixGPT Logo" className="h-12 w-auto mr-4" />
    </div>
    </>
  )
}

export default Header