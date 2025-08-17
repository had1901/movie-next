'use client'
import React from 'react'

export default function Error({ error }:{ error: Error }) {
  return (
    <div className='fixed inset-0 bg-black text-white text-6xl text-center'>
       {error.message}
       {/* <video src={'/error.mp4'} autoPlay muted loop className='w-full h-full'></video> */}
    </div>
  )
}
