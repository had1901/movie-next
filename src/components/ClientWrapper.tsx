'use client'
import { auth } from '@/libs/firebase'
import { useAuth, useNotification } from '@/store/store'
import { onAuthStateChanged } from 'firebase/auth'
import React, { ReactNode, useEffect, useLayoutEffect, useState } from 'react'

function ClientWrapper({ children }:{ children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false)
  const setLoading = useAuth(state => state.setLoading)
  const setUser = useAuth(state => state.setUser)
  const user = useAuth(state => state.user)
  const toast = useNotification(state => state.toast)
  const setShowModal = useAuth(state => state.setShowModal)
  
  console.log('User', user)
  
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
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          console.log('Có user', currentUser)
          setShowModal(false)
          toast('pending', 'Đang đăng nhập...')
          if(currentUser){
            toast('success', 'Đã đăng nhập')
            setUser(currentUser)
          } else {
            toast('pending', 'Đã đăng xuất')
          }
      })
      return () => unsubscribe()
  }, [setUser, setShowModal, toast])



  return (
    <div className={`${scrolled ? 'bg-[#0e0e0e]/40 backdrop-blur-xl' : ''} fixed z-30 inset-x-0 top-0 transition`}>
      {children}
    </div>
  )
}

export default ClientWrapper