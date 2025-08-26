import React from 'react'

export default async function LoadingClient() {
  
  return (
    <div className='bg-black bg-center fixed inset-0 z-[9999] flex items-center justify-center' style={{ viewTransitionName: 'none' }}>
      <video src={'/eye.mp4'} autoPlay muted loop className='w-full h-full'></video>
    </div>
  )

}
