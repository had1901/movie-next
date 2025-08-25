import React, { ReactNode } from 'react'
import Sidebar from './_components/Sidebar'



function AccountLayout({ children }:{ children: ReactNode }) {
  return (
    <div className='container mx-auto mt-28'>
        <div className="flex text-white gap-2">
            {/* Sidebar */}
            <Sidebar />
            {children}
        </div>
    </div>
  )
}

export default AccountLayout