import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <div className='flex items-center justify-center h-screen text-center text-white'>
      <div>
        <h2 className=''>Không tìm thấy trang này</h2>
        <Link href="/" className='flex items-center justify-center gap-2 p-2 rounded-md text-md bg-[#3ca4e0] mt-3'>
          <ArrowLeft />
          Quay về rang chủ
        </Link>
      </div>
    </div>
  )
}

export default NotFound