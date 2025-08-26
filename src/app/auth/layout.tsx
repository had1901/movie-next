import React, { ReactNode } from 'react'
import Sidebar from './_components/Sidebar'
import { redirect } from 'next/navigation'
import { getCookie, verifyRoute } from '@/libs/cookie'



async function AccountLayout({ children }:{ children: ReactNode }) {
  const cookieHeader = await getCookie() as string
  const user = await verifyRoute(cookieHeader)
    
  if(!user) redirect('/')
    
  return (
    <div className='container mx-auto mt-28'>
        <div className="flex text-white gap-2">
            <Sidebar />
            {children}
        </div>
    </div>
  )
}

export default AccountLayout