import React, { ReactNode } from 'react'

function HeroMovie({ children, title, styleCustom }:{ children: ReactNode, title: string, styleCustom: string }) {
  return (
    <div className="flex lg:items-center flex-col lg:flex-row gap-x-4 h-full mb-4">
        <div className='mb-2 lg:mb-0 lg:w-1/6 flex flex-row gap-3 items-center lg:items-baseline lg:gap-0 lg:flex-col '>
            <h2 className={`${styleCustom} text-base md:text-xl xl:text-3xl font-semibold bg-gradient-to-r bg-clip-text text-transparent`}>{title}</h2>
            <h3 className='flex items-center text-white gap-4 mt-2 text-sm'>
                <span>Xem tất cả</span>
                <i>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </i>
            </h3>
        </div>
        <div className='flex-1 w-full min-w-0'>{children}</div>
    </div>
  )
}

export default HeroMovie