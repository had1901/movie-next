/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth, useNotification } from '@/store/store'
import { logoutFireBase } from '@/libs/firebaseAction'


const modals = [
  {
    icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          ),
    name: 'Phim yêu thích', 
    href: '/favorite'

  },
  {
    icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
          ),
    name: 'Tài khoản',
    href: '/profile'
  },
  {
    icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clipRule="evenodd" />
          </svg>
          ),
    name: 'Đăng xuất',
    render: (callback: () => void) => callback()
  },
  
]



function User() {
  const setShowModal = useAuth(state => state.setShowModal)
  const user = useAuth(state => state.user)
  const setUser = useAuth(state => state.setUser)
  const loading = useAuth(state => state.loading)
  const toast = useNotification(state => state.toast)
  const reset = useNotification(state => state.reset)
  
  const handleLogout = async () => {
    await logoutFireBase()
    setUser(null)
  }


  if (loading) {
    return <div className='text-center text-md text-white'>Đang tải...</div>;
  }

  return (
    <div className='text-white'>

      {user 
      ? (<div className='relative group '>
          <Image src={user.photoURL || 'https://avatar.iran.liara.run/public/7'} alt="avatar" width={36} height={36} className='rounded-full cursor-pointer' />
          <div className='absolute left-0 right-0 top-full p-3 bg-[#494949]/80 backdrop-blur-2xl 
                          rounded-md w-[200px] h-auto transition duration-200 origin-top-left 
                          pointer-events-none opacity-0 scale-85 group-hover:opacity-100 
                          group-hover:scale-100 group-hover:pointer-events-auto'>
            <h2 className=' text-center line-clamp-2 font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#ff5e69] to-[#ffd694] rounded-sm'>
              <span>&#x2764;</span>
              <span className='mx-2 inline-block'>{user.displayName} </span>
              <span>&#x2764;</span>
            </h2>
            <ul className='pt-2 text-sm'>
              {modals.map((modal:any, index:number) => (
                <li key={index}>
                  <Link href={modal.href || '#'} className='flex items-center gap-2 py-3' onClick={() => modal.render(handleLogout)}>
                    <i>
                      {modal.icon}
                    </i>
                    <span>{modal.name}</span>
                  </Link>
                </li>

              ))}
            </ul>
          </div>
        </div>)
      : (<button onClick={() => setShowModal(true)} className="px-4 py-2 bg-(--bg-main-color) text-(--text-main-color) text-sm rounded-full hover:opacity-85 transition shadow cursor-pointer">
          Đăng nhập
        </button>)
      }
    </div>
  )
}

export default User