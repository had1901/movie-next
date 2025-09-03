/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { providerGithub, providerGoogle } from '@/libs/firebase'
import { conflictingEmail, loginFireBase, pendingCredential, resetLinkingState } from '@/libs/firebaseAction'
import { AuthProvider, linkWithCredential } from 'firebase/auth'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useAuth, useNotification } from '@/store/store'

import Alert from './Alert'
import LoginForm from './form/LoginForm'
import RegisterForm from './form/RegisterForm'
import { redirect } from 'next/navigation'




function Modal() {
    const [showPopup, setShowPopup] = useState(false)
    const [openFormInput, setOpenFormInput] = useState(false)
    const [isLogin, setIsLogin] = useState(true)

    const user = useAuth(state => state.user)
    const showModal = useAuth(state => state.showModal)
    const setUser = useAuth(state => state.setUser)
    const setShowModal = useAuth(state => state.setShowModal)
    const toast = useNotification(state => state.toast)

    const handleLogin = async (provider: AuthProvider) => {
        const loggedInUser = await loginFireBase(provider, () => {
            console.log('Lỗi rồi, gọi Callback...')
            setShowPopup(true)
            toast('error', 'Đăng nhập không thành công')
        })
        if (loggedInUser) {
          setUser(loggedInUser)
          setShowModal(false)
          toast('success', 'Đăng nhập thành công')
          redirect('/')

        }
    }

    const handleChangeMethod = () => {
      setOpenFormInput(true)
      setIsLogin(!isLogin)
    }

    const backModal = () => {
        setOpenFormInput(false)
        setIsLogin(true)
    }

    useEffect(() => {
      if(!showModal) {
        setOpenFormInput(false)
        setIsLogin(true)
      }
    },[showModal])


    useEffect(() => {
      if(user && pendingCredential) {
        console.log('Có user và đang liên kết')
        const handleLinkAccount = async () => {
          await linkWithCredential(user, pendingCredential)
          toast('success', 'Phương thức mới đã được liên kết với tài khoản hiện có của bạn')
          resetLinkingState()
        }
        handleLinkAccount()
      }
    },[user, toast])


  return (
    <div
        onClick={() => setShowModal(false)}
        className={`${showModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} 
                    fixed inset-0 bg-black/50 text-(--text-main-color) z-[888] transition-all duration-300 `}
        >
          <div
            onClick={(e) => e.stopPropagation()} // Ngăn click trong modal đóng
            className={`absolute inset-0 my-auto mx-6 md:m-auto bg-white backdrop-blur-2xl rounded-xl shadow-2xl p-6 w-auto max-w-[500px] h-fit transform transition-all duration-300 overflow-y-auto 
              ${showModal ? "scale-100 opacity-100" : "scale-35 opacity-0 pointer-events-none"}`}
          >
            {openFormInput && (<button className='flex items-center gap-2 hover:opacity-80 cursor-pointer' onClick={backModal}>
                <i>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                  </svg>
                </i>
                <span className='text-sm'>Quay lại</span>
            </button>)}
            <div onClick={() => setShowModal(false)} className='absolute right-4 top-4 bg-gray-200 hover:bg-gray-300 rounded-full p-2 cursor-pointer'>
              <i>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </i>
            </div>
            <div className='flex justify-center gap-2 items-center mb-2 text-[#f58f89]'>
              <span>&#x2764;</span>

              <Image src={'/logo-movies1.png'} alt='logo' width={80} height={80} className='text-amber-700 bg-[#f58f89] rounded-full overflow-hidden'/>
              <span>&#x2764;</span>
              
            </div>
            <h2 className="text-xl text-[#f58f89] font-semibold text-center mb-6">
              <span>&#x2764;</span>
              <span className='mx-2 inline-block '>{isLogin ? 'Đăng nhập' : 'Đăng ký'}</span>
              <span>&#x2764;</span>
            </h2>

            {openFormInput 
            ? isLogin ? (<LoginForm title='' />) : (<RegisterForm title=''/>)
            : (<div className="flex flex-col gap-3 text-sm">
              <button
                onClick={() => setOpenFormInput(true)}
                className="relative border border-(--bg-sub) rounded-full px-4 py-2 transition 
                opacity-80 hover:opacity-100 hover:bg-[#d4d4d4] hover:border-[#d4d4d4] cursor-pointer"
              >
                <Image src="/user-logo.svg" alt="logo-user" width={20} height={20}/>
                <span className='absolute left-1/2 top-1/2 -translate-1/2'>Sử dụng Email / Password</span>
              </button>

              <button
                onClick={() => handleLogin(providerGoogle)}
                className="relative border border-(--bg-sub) rounded-full px-4 py-2 transition 
                opacity-80 hover:opacity-100 hover:bg-[#d4d4d4] hover:border-[#d4d4d4] cursor-pointer"
              >
                <Image src="/gg-logo.svg" alt="logo-google" width={20} height={20}/>
                <span className='absolute left-1/2 top-1/2 -translate-1/2'>Đăng nhập với Google</span>
              </button>

              <button
                onClick={() => handleLogin(providerGithub)}
                className="relative border border-(--bg-sub) rounded-full px-4 py-2 transition 
                opacity-80 hover:opacity-100 hover:bg-[#d4d4d4] hover:border-[#d4d4d4] cursor-pointer"
              >
                <Image src="/github-logo.svg" alt="logo-github" width={20} height={20}/>
                <span className='absolute left-1/2 top-1/2 -translate-1/2'>Đăng nhập với Github</span>
              </button>
              <p className='text-xs text-yellow-700 text-center mt-6 bg-yellow-100 rounded-xl p-2'>
                Mỗi <strong>email</strong> chỉ được đăng nhập duy nhất vào 1 phương thức, 
                nếu đăng nhập cùng một email với 2 phương thức khác nhau thì tài khoản sẽ được hợp nhất vào một phương thức đăng nhập duy nhất
              </p>
            </div>)
            }

            <div className='text-center text-sm mt-8'>
              <p className=''>
                Bạn chưa có tài khoản?
                <span onClick={handleChangeMethod} className='ml-2 font-semibold underline text-[#f58f89] cursor-pointer'>{isLogin ? 'Đăng ký' : 'Đăng nhập'}</span>  
              </p>
              <p className='mt-2 font-semibold underline text-[#f58f89] cursor-pointer'>Quên mật khẩu</p>
            </div>
            
          </div>

            {/* Modal conform */}
            {/* {showPopup && (
                <div className='fixed inset-0 w-[500px] h-[400px] m-auto bg-gray-400'>
                <ul className='flex flex-col gap-2'>
                    <li className='bg-amber-700 p-2 rounded-md' onClick={() => setMethod('email')}>Email/Password</li>
                    <li className='bg-amber-700 p-2 rounded-md 'onClick={() => setMethod('google')}>Đăng nhập với google</li>
                    <li className='bg-amber-700 p-2 rounded-md' onClick={() => setMethod('github')}>Đăng nhập với Github</li>
                    <li className='bg-amber-700 p-2 rounded-md' onClick={() => setShowPopup(false)}>Đóng</li>
                </ul>
                </div>
            )} */}
    </div>
  )
}

export default Modal