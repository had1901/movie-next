'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

function MenuMobile({ navigations }:{ navigations: any }) {
    const [show, setShow] = useState(false)
    const [showSubmenu, setShowSubmenu] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const pathname = usePathname()
    
    const handleOpenMenu = (e:any) => {
        e.preventDefault()
        e.stopPropagation()
        setShow(true)
    }

    const handleToggleSubMenu = (e:any, index:number) => {
        setShowSubmenu(!showSubmenu)
        setCurrentIndex(index)
    }

    const handleClose = (item?:any) => {
        if(!item.icon) {
            setShow(false)
            setShowSubmenu(false)
        }
    }

    useEffect(() => {
        setShow(false)
        setShowSubmenu(false)
        setCurrentIndex(0)
    }, [pathname])

  return (
    <div className="h-full flex items-center text-white" >
        <div className='2xl:hidden cursor-pointer' onClick={handleOpenMenu}>
            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </div>
        <div className={`${show ? 'translate-x-0' : '-translate-x-full'} fixed left-0 top-0 h-screen bg-black/90 z-50 py-14 px-4 transition-all ease-in-out duration-300 `}>
            <div className='flex flex-col'>
                {navigations.map((item:any, index:number) => (
                    <Link key={index} href={item?.href} className="relative font-[500] py-4 px-4 inline-block text-[16px] border-b-[1px] border-b-(--bg-sub)" onClick={() => handleClose(item)}>
                        <div className='flex items-center gap-2' onClick={(e) => handleToggleSubMenu(e,index)}>
                            <span>{item.label}</span>
                            {item.icon && 
                                (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>)
                            }
                        </div>
                        <div className={`${showSubmenu && currentIndex === index ? 'max-h-[500px]' : 'max-h-0'} w-full transition-all duration-500 ease-in-out overflow-hidden`}>{item?.children}</div>
                    </Link>
                ))}
            </div>
            <i className='absolute right-6 top-6 cursor-pointer' onClick={handleClose}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </i>
       </div>
    </div>
  )
}

export default MenuMobile