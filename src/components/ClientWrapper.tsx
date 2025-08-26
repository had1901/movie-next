/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { setCookie } from '@/libs/cookie'
import { auth } from '@/libs/firebase'
import { useAuth, useNotification } from '@/store/store'
import { getIdToken, onAuthStateChanged } from 'firebase/auth'
import React, { ReactNode, useEffect, useLayoutEffect, useState } from 'react'

function ClientWrapper({ children }:{ children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false)
  const setUser = useAuth(state => state.setUser)
  const setLoading = useAuth(state => state.setLoading)
  const toast = useNotification(state => state.toast)
  const setShowModal = useAuth(state => state.setShowModal)
  
  useEffect(() => {
    const handleCheckScroll = () => {
      const y = window.scrollY > 30
      setScrolled((prev) => {
        if(prev !== y) return y
        return prev
      })
    }
    window.addEventListener('scroll', handleCheckScroll)
    handleCheckScroll()

    return () => window.removeEventListener('scroll', handleCheckScroll)
  }, [])

  

  useLayoutEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          console.log('Có user', currentUser)
          setShowModal(false)

          if(currentUser){
            const token = await getIdToken(currentUser, true)
            await setCookie(token)
            setUser(currentUser)
            toast('success', 'Đã đăng nhập')

          } else {
            toast('pending', 'Đã đăng xuất')
          }
          setLoading(false)
      })
      return () => unsubscribe()
  }, [setUser, setShowModal, setLoading, toast])



  return (
    <div className={`${scrolled ? 'bg-[#0e0e0e]/40 backdrop-blur-xl' : ''} fixed z-30 inset-x-0 top-0 transition`}>
      {children}
    </div>
  )
}

export default ClientWrapper