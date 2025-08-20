'use client'
import React, { ReactNode, useEffect, useState } from 'react'

function ClientWrapper({ children }:{ children: ReactNode }) {
  const [scrolled, setScrolled] = useState<number>(0)

  useEffect(() => {
      const handleCheckScroll = () => {
          const y = window.scrollY
          if (y > 0) {
              setScrolled(y)
              window.removeEventListener('scroll', handleCheckScroll) // gỡ luôn tại đây
          } else {
              setScrolled(0)
          }
      }
      
      window.addEventListener('scroll', handleCheckScroll)

      return () => window.removeEventListener('scroll', handleCheckScroll)
  },[scrolled])

  return (
    <div className={`${scrolled > 0 ? 'bg-[#0e0e0e]/40 backdrop-blur-xl' : ''} fixed z-[999] inset-x-0 top-0 transition`}>
      {children}
    </div>
  )
}

export default ClientWrapper