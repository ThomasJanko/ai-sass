import React from 'react'
import { UserButton } from '@clerk/nextjs'
import MobilNav from './MobilNav'
import { getApiLimitCount } from '@/database/actions/api-limit'
import { checkSubscription } from '@/lib/subscription'

const NavBar = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className='flex items-center p-4'>
      <MobilNav apiLimitCount={apiLimitCount} isPro={isPro} />
      <div className='flex w-full justify-end'>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  )
}

export default NavBar