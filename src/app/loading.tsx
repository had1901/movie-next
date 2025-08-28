import React from 'react'

export default async function LoadingClient() {
  
  return (
    <div className='loading-container bg-black  bg-center fixed h-screen w-full inset-0 z-[9999] flex items-center justify-center'>
      <video src={'/eye.mp4'} autoPlay muted loop className='w-full h-full'></video>
    </div>
  )

}
