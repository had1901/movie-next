import EmptyData from '@/components/EmptyData'
import ListMovie from '@/components/ListMovie'
import React from 'react'

function Notification() {
  return (
      <div>
          <h1 className='mb-3 text-xl'>Thông báo</h1>
          <EmptyData title='Chưa có thông báo'/>
      </div>
  )
}

export default Notification