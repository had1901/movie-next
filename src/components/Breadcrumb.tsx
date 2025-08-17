
import Link from 'next/link'
import React from 'react'

interface Breadcrumb {
  name: string,
  slug: string,
  position?: number
}


function Breadcrumb({ breadcrumb }:{ breadcrumb: Array<Breadcrumb> }) {
  return (
    <div className=''>
      <ul className='flex items-center'>
        <li>
          <Link href={'/'} className='flex items-center'>
            <span>Trang chủ</span>
            <i>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </i>
          </Link>
        </li>  
        {breadcrumb?.length > 0 && breadcrumb.map((item, index) => (
          <li key={index}>
            <Link href={'/'} className='flex items-center'>
              <span>{item.name}</span>
              <i>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                  <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
              </i>
            </Link>
          </li>
          
        ))}
      </ul>
    </div>
  )
}

export default Breadcrumb