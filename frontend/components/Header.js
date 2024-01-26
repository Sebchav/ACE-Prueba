import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="bg-blue-900 p-2 flex justify-center">
        <Image 
            src={"/logo.png"}
            width={80}
            height={80}
            alt='Logo empresa'
        />
    </header>
  )
}

export default Header