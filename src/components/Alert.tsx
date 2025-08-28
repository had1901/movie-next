'use client'
import { useNotification } from '@/store/store'
import React from 'react'

type AlertProps = {
  message?: string
  status?: 'success' | 'warning' | 'error' | 'pending',
  children: React.ReactNode
}

function Alert({ children }: AlertProps) {
  const show = useNotification(state => state.show)
  const status = useNotification(state => state.status)
  const message = useNotification(state => state.message)

  const renderStatus = () => {
    switch(status) {
      case 'pending': 
        return 'bg-[#3ca4e0]'
      case 'success': 
        return 'bg-[#2aa562]'
      case 'warning': 
        return 'bg-[#dca519]'
      case 'error': 
        return 'bg-[#df4346]'
      default: 
        return ''
    }
  }

  return (
    <>
      <div className={`${status && renderStatus()} ${show ? 'opacity-100 translate-y-6' : 'opacity-0 translate-y-0 pointer-events-none'} 
        absolute top-0 left-0 right-0 mx-auto transition duration-400 w-fit h-10 text-sm font-semibold 
        flex items-center justify-center text-white rounded-xl shadow-2xl py-[6px] text-md text-center px-4 z-[9999]`}>
        {message}
      </div>
      {children}
    </>
  )
}

export default Alert