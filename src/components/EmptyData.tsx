import React from 'react'

function EmptyData({ title='Không có dữ liệu' }:{ title: string }) {
  return (
    <div className='relative left-0 w-full py-10 rounded-2xl text-center backdrop-blur-xs bg-(--bg-sub)/40 text-white z-50'>
      <h2>{title}</h2>
    </div>
  )
}

export default EmptyData