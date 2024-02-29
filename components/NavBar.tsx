import React from 'react'
import { UserButton } from '@clerk/nextjs'
import MobilNav from './MobilNav'

const NavBar = () => {
  return (
    <div className='flex items-center p-4'>
      <MobilNav />
      <div className='flex w-full justify-end'>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  )
}

export default NavBar