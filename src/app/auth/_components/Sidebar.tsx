'use client'
import { clearCookie } from '@/libs/cookie'
import { logoutFireBase } from '@/libs/firebaseAction'
import { useAuth, useNotification } from '@/store/store'
import { Bell, Heart, Infinity, LogOut, Plus, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import React, { Suspense, useState } from 'react'



const menuItems = [
    { label: "Tài khoản", href: '/auth/profile',icon: <User size={18} /> },
    { label: "Yêu thích", href: '/auth/favorite', icon: <Heart size={18} /> },
    { label: "Đã xem", href: '/auth/collection',icon: <Plus size={18} /> },
    { label: "Thông báo", href: '/auth/notification',icon: <Bell size={18} /> },
]

function Sidebar() {
    const pathname = usePathname()
    const [active, setActive] = useState(pathname)
    const user = useAuth(state => state.user)
    const setUser = useAuth(state => state.setUser)
    const toast = useNotification(state => state.toast)
    const loading = useAuth(state => state.loading)
    
    const handleLogout = async () => {
        await logoutFireBase()
        await clearCookie()
        setUser(null)
        toast('pending', 'Đã đăng xuất')
        redirect('/')
    }

    // if(user) {
      return (
        <aside className="w-full lg:w-80 bg-(--bg-sub)/40 backdrop-blur-xs p-5 lg:p-8 flex flex-col justify-between overflow-hidden rounded-2xl">
                <div>
                  <h2 className="text-lg font-semibold text-center lg:text-start mb-6">Quản lý tài khoản</h2>
                  <nav className="flex lg:flex-col justify-around lg:justify-start space-y-0">
                    {menuItems.map((item, i) => (
                      <Link
                        href={item.href}
                        key={i}
                        title={item.label}
                        onClick={() => setActive(item.href)}
                        className={`${active === item.href ? 'text-(--text-main-yellow) opacity-100' : ''} flex items-center gap-2 flex-col 
                        lg:flex-row flex-1 justify-center lg:justify-start opacity-80 whitespace-nowrap text-xs lg:text-sm
                        lg:border-t-1 lg:border-t-[#e0e0e02f] py-4 cursor-pointer hover:opacity-100 transition `}
                      >
                        <span>{item.icon}</span>
                        <span className=''>{item.label}</span>
                      </Link>
                    ))}
                    <button
                        className="flex items-center justify-center lg:justify-start flex-col lg:flex-row flex-1 gap-2 text-xs lg:text-sm 
                                    whitespace-nowrap opacity-80 lg:border-t-1 lg:border-t-[#e0e0e02f] py-4 cursor-pointer hover:opacity-100 transition"
                        onClick={handleLogout}
                      >
                        <LogOut size={18} className="cursor-pointer opacity-80 hover:opacity-100 text-red-400 hover:text-(--text-main-yellow)"  />
                        <span className=''>Đăng xuất</span>
                      </button>
                  </nav>
                </div>
        
                
                  {loading 
                  ? (<div>Đang tải...</div>) 
                  : (<div className="flex items-center justify-center lg:justify-start gap-3 border-t border-gray-700 overflow-hidden pt-4">
                      <Image
                        width={120}
                        height={120}
                        alt='avatar'
                        src={user && user.photoURL || 'https://wallpapers-clan.com/wp-content/uploads/2023/08/attack-on-titan-sad-mikasa-sticker-preview.jpg'}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex flex-col text-sm">
                        <span className="font-medium flex items-center gap-1">
                          {user && user.displayName} <Infinity size={14} />
                        </span>
                        <span className="opacity-80 text-xs line-clamp-1">{user && user.email}</span>
                      </div>
                      
                    </div>)
                  }
              </aside>
      )
    // }
}

export default Sidebar