import React, { ReactNode } from 'react'

function ListMovie({ children, title }:{ children: ReactNode, title: string }) {
  return (
    <section className='mt-14 w-full'>
        <h2 className="relative inline-block text-2xl text-(--text-main-yellow) font-bold mb-6 pb-1 after:absolute after:content-[''] after:h-0.5 after:inline-block after:bottom-0 after:right-0 after:left-0 after:bg-(--bg-main-color)">{title}</h2>
        <div className=''>
            {children}
        </div>
    </section>
   
  )
}

export default ListMovie