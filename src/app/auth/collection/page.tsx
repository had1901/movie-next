import EmptyData from '@/components/EmptyData'
import React from 'react'

function Collection() {
  return (
    <div>
      <h1 className='mb-3 text-xl'>Phim đã xem</h1>
      <EmptyData title='Chưa có dữ liệu'/>
    </div>
  )
}

export default Collection