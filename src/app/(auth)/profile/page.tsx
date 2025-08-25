'use client'
import React from 'react'
import { ImageUp } from "lucide-react"
import Image from 'next/image'
import InputRadio from '../_components/InputRadio'
import { useAuth } from '@/store/store'



function Profile() {
  const user = useAuth(state => state.user)

  return (
    <section className=' p-8 rounded-2xl'>
        <div className="flex items-center text-white"> 
          {/* Content */}
          <main className="w-[500px]">
            <h2 className="text-xl font-semibold mb-6">Tài khoản</h2>
            <p className="opacity-80 mb-8 text-sm">Cập nhật thông tin tài khoản</p>
    
            <form className="max-w-xl space-y-6">
              <div>
                <label className="block mb-1 text-sm">Email / Số điện thoại</label>
                <input
                  type="email"
                  value={user && user.email}
                  readOnly
                  className="w-full rounded-md px-3 py-2 bg-[#222] border border-gray-700 text-sm"
                />
              </div>
    
              <div>
                <label className="block mb-1 text-sm">Tên hiển thị</label>
                <input
                  type="text"
                  defaultValue={user && user.displayName}
                  className="w-full rounded-md px-3 py-2 bg-[#222] border border-gray-700 text-sm"
                />
              </div>
    
              <div>
                <label className="block mb-2 text-sm">Nhân vật</label>
                <div className="flex gap-4 text-sm">
                  <InputRadio />
                </div>
              </div>
    
              <button
                type="submit"
                className="bg-(--bg-main-color) hover:opacity-80 text-black font-medium px-6 py-2 rounded-md transition cursor-pointer"
              >
                Cập nhật
              </button>
            </form>
    
            <p className="mt-6 text-sm opacity-80">
              Đổi mật khẩu, nhấn vào{" "}
              <a href="#" className="text-(--bg-main-color) hover:underline">
                đây
              </a>
            </p>
          </main>
    
          {/* Avatar */}
          <div className="relative ml-10 ">
            <Image
                width={150}
                height={150}
                alt='avatar'
                src={user && user.photoURL || 'https://wallpapers-clan.com/wp-content/uploads/2023/08/attack-on-titan-sad-mikasa-sticker-preview.jpg'}
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg inline-block object-cover"
            />
            <button className="absolute flex items-center opacity-0 hover:opacity-100 justify-center cursor-pointer inset-0 bg-[#222]/50 text-xs px-2 py-1 rounded-full transition duration-100">
              <ImageUp />
            </button>
          </div>
        </div>
    </section>
  )
}
// https://wallpapers-clan.com/wp-content/uploads/2023/08/attack-on-titan-sad-mikasa-sticker-preview.jpg
export default Profile