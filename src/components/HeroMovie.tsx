import React, { ReactNode } from 'react'

function HeroMovie({ children, title, styleCustom }:{ children: ReactNode, title: string, styleCustom: string }) {
  return (
    <div className="flex items-center gap-x-4 h-full mb-4">
        <div className='w-1/6'>
            <h2 className={`${styleCustom} text-3xl font-semibold bg-gradient-to-r bg-clip-text text-transparent`}>{title}</h2>
            <h3 className='flex items-center text-white gap-4 mt-2 text-sm'>
                <span>Xem tất cả</span>
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </i>
            </h3>
        </div>
        <div className='flex-1 min-w-0'>{children}</div>
    </div>
  )
}

export default HeroMovie