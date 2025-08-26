'use client'
import { logoutFireBase } from '@/libs/firebaseAction'
import { useAuth, useNotification } from '@/store/store'
import { Bell, Heart, Infinity, LogOut, Plus, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'



const menuItems = [
    { label: "Tài khoản", href: 'profile',icon: <User size={18} /> },
    { label: "Yêu thích", href: 'favorite', icon: <Heart size={18} /> },
    { label: "Phim đã xem", href: 'collection',icon: <Plus size={18} /> },
    { label: "Thông báo", href: 'notification',icon: <Bell size={18} /> },
]

function Sidebar() {
    const [active, setActive] = useState('profile')
    const user = useAuth(state => state.user)
    const setUser = useAuth(state => state.setUser)
    const toast = useNotification(state => state.toast)
    
    const handleLogout = async () => {
        await logoutFireBase()
        setUser(null)
        toast('pending', 'Đã đăng xuất')
    }

    // if(user) {
      return (
        <aside className="w-80 bg-(--bg-sub) p-8 flex flex-col justify-between rounded-2xl">
                <div>
                  <h2 className="text-lg font-semibold mb-6">Quản lý tài khoản</h2>
                  <nav className="flex flex-col space-y-0">
                    {menuItems.map((item, i) => (
                      <Link
                        href={item.href}
                        key={i}
                        onClick={() => setActive(item.href)}
                        className={`${active === item.href ? 'text-(--text-main-yellow) opacity-100' : ''} flex items-center gap-2 opacity-80 border-t-1 border-t-[#e0e0e02f] py-4 cursor-pointer 
                        hover:opacity-100 transition text-sm`}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                    <button
                        className="flex items-center gap-2 opacity-80 border-t-1 border-t-[#e0e0e02f] py-4 cursor-pointer 
                        hover:opacity-100 transition text-sm"
                        onClick={handleLogout}
                      >
                        <LogOut size={18} className="cursor-pointer opacity-80 hover:opacity-100 hover:text-(--text-main-yellow)"  />
                        Đăng xuất
                      </button>
                  </nav>
                </div>
        
                {/* <div className="flex items-center gap-3 border-t border-gray-700 pt-4">
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
                    <span className="opacity-80 text-xs">{user && user.email}</span>
                  </div>
                  
                </div> */}
              </aside>
      )
    // }
}

export default Sidebar