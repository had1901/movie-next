
import Link from 'next/link'
import React, { ReactNode } from 'react'

type Props = {
  icon: ReactNode
  label: string
  type: string
  originalURL: string
  slug: string
}

// const convertToEmbedURL = (url: string) => {
//     const match = url.match(/(?:youtu\.be\/|watch\?v=)([\w-]{11})/)
//     return match ? `https://www.youtube.com/embed/${match[1]}` : ''
// }


function ButtonViewDetail({ icon, label, type, originalURL, slug }: Props) {
  
  return (
    <Link href={`/detail-movie/${slug}`} style={{ background: 'var(--bg-main-color)'}} className='flex items-center justify-center gap-3 cursor-pointer w-10 h-10 lg:w-18 lg:h-18 rounded-full hover:bg-[#141414]/60 hover:opacity-80 transition'>
      <i className='text-[#292929]'>
        {icon}
      </i>
    </Link> 
  )
}

export default ButtonViewDetail