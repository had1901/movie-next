'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const navigations = [
  { label: 'Trang chủ', href: '/' },
  { label: 'Thể loại', href: '/' },
  { label: 'Phim bộ', href: '/' },
  { label: 'Phim lẻ', href: '/' },
  { label: 'Quốc gia', href: '/' },
]
function Header() {
    const [scrolled, setScrolled] = useState(0)
    const [theme, setTheme] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") || "light"
        }
        return "light"
    })
    
    useEffect(() => {
        const handleCheckScroll = () => {
            const y = window.scrollY
            if (y > 50) {
                setScrolled(y)
                window.removeEventListener('scroll', handleCheckScroll) // gỡ luôn tại đây
            } else {
                setScrolled(0)
            }
        }
        
        window.addEventListener('scroll', handleCheckScroll)

        return () => window.removeEventListener('scroll', handleCheckScroll)
    },[scrolled])

    useEffect(() => {
        localStorage.setItem("theme", theme)

        // Cập nhật class dark
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    },[theme])
  return (
    <header className={`${scrolled > 50 ? 'bg-[#0e0e0e]/40 backdrop-blur-xl' : 'bg-[#0e0e0e]'} shadow-2xl sticky z-20 top-0 transition`}>
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-6 h-16">
                <Link href={'/'}>
                    <Image 
                        src={'/logo.png'} 
                        alt="logo"
                        width={100}
                        height={100}
                        className="h-full w-auto"
                        priority 
                    />
                </Link>
                <div className="h-full flex items-center">
                    {navigations.map((item, i) => (
                    <Link key={i} href={item.href} className="text-white font-[500] py-4 px-4 inline-block text-[18px]">{item.label}</Link>
                    ))}
                </div>

                <div className="flex relative ">
                    <input 
                    type="search" 
                    placeholder="Search..."
                    className="bg-white outline-none border-none rounded-[14px] py-2 pl-7 pr-2 min-w-[300px] text-[15px]"
                    />
                    <div className="absolute top-1/2 left-2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    </div>
                </div>
                <div className="h-full">
                    <select value={theme} onChange={(e) => setTheme(e.target.value)} className='text-white border-amber-100'>
                        <option value="light">Sáng</option>
                        <option value="dark">Tối</option>
                    </select>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header