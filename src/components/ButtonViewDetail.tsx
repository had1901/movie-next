'use client'
import Link from 'next/link'
import React, { ReactNode, useState } from 'react'


function ButtonViewDetail({ icon, label, type, originalURL }: { icon: ReactNode, label: string, type: string, originalURL: string }) {
  const [isOpen, setIsOpen] = useState(false)

  const convertToEmbedURL = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|watch\?v=)([\w-]{11})/)
    return match ? `https://www.youtube.com/embed/${match[1]}` : ''
  }

  const trailerURL = convertToEmbedURL(originalURL)

  const handleMoveEpisodes = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Link href='#episodes' onClick={handleMoveEpisodes} style={{ backgroundImage: 'var(--bg-main-gradient)'}} className='flex items-center gap-3 cursor-pointer py-3 px-4 rounded-full hover:bg-[#141414]/60 transition'>
      <i>
        {icon}
      </i>
      <label className='text-xl font-medium cursor-pointer'>{label}</label>
      <div className={`${isOpen && type === 'view-trailer' ? 'block' : 'hidden'} fixed bg-[#111111]/70 inset-0 z-20`}>
        
      </div>
      <div className={`${isOpen && type === 'view-trailer' ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-0'} fixed flex items-center justify-center transition-all duration-400 inset-y-[15%] inset-x-[20%] overflow-hidden z-30`}>
          {trailerURL && isOpen 
          ? (<iframe
              src={trailerURL}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-2xl"
            />)
          : !trailerURL && (<p className="text-white text-center py-2 text-xl w-full h-fit">Không tìm thấy video trailer</p>)
          }
      </div>
    </Link> 
  )
}

export default ButtonViewDetail