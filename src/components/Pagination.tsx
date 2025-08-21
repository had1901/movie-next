'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function Pagination({ total }:{ total: number }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const currentPage = Number(searchParams.get('page')) || 1
  const currentLimit = Number(searchParams.get('limit')) || 24
  const timeOutId = useRef<number | null>(null)
  const [page, setPage] = useState(currentPage)
  const [limit, setLimit] = useState(currentLimit)

  const totalPage = Math.ceil(total / 48)

  const handlePrevPage = () => {
    if(page > 0) {
      setPage(prev => prev - 1)
    }
  }
  const handleNextPage = () => {
    if(page <= total) {
      setPage(prev => prev + 1)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value)
    // Cho phép empty string để user có thể xóa hết
    setPage(inputValue)
  }

const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
  // Khi blur, nếu empty thì set về 0
    if (e.target.value === "") {
      setPage(1)
    }
  }

  // Khi `page` thay đổi thì update URL
  useEffect(() => {

    if (timeOutId.current) {
      clearTimeout(timeOutId.current)
    }
    if(page) {
      timeOutId.current = window.setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', page.toString())
        router.push(`?${params.toString()}`)
      },500)
    }
    return () => {
      if (timeOutId.current) {
        clearTimeout(timeOutId.current)
      }
    }
    
  }, [page])

  useEffect(() => {
    if(page === 0) {
      setPage(totalPage)
    }
    if(page > totalPage) {
      setPage(1)
    } 
  },[page, totalPage])


  return (
    <div className="flex items-center justify-center gap-4 py-6">
      {/* Nút Previous */}
      <button 
        onClick={handlePrevPage}
        className="w-14 h-14 rounded-full bg-[#141414] text-white flex items-center justify-center hover:bg-[#3a3b4e] cursor-pointer">
        ←
      </button>

      {/* Phần số trang */}
      <div className="flex items-center gap-2 rounded-full p-4 bg-[#141414] text-white text-sm">
        <span>Trang</span>
        <input
          type="number"
          className="w-10 text-center bg-transparent border border-gray-500 rounded-md px-1 py-0.5 focus:outline-none"
          value={page}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span>/ {totalPage}</span>
      </div>

      {/* Nút Next */}
      <button 
        onClick={handleNextPage}
        className="w-14 h-14 rounded-full bg-[#141414] text-white flex items-center justify-center hover:bg-[#3a3b4e] cursor-pointer">
        → 
      </button>
    </div>
  )
}

export default Pagination