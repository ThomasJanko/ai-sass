import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'
import { getApiLimitCount } from '@/database/actions/api-limit';
import React from 'react'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {

  const apiLimitCount = await getApiLimitCount();

  return (
    <div className='h-full relative'>
        <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900'>
            <SideBar apiLimitCount={apiLimitCount} />
        </div>

        <main className='md:pl-72'>
            <NavBar/>
            {children}
        </main>
    </div>
  )
}

export default DashboardLayout