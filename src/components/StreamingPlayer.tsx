/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useLight, useMovieLink } from '@/store/store';
import React, { useEffect, useRef, useState } from 'react'
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';
import ButtonVideoControl from './ButtonVideoControl';


function StreamingPlayer() {
  const movieLink = useMovieLink(state => state.link)
  const reset = useMovieLink(state => state.reset)
  const light = useLight(state => state.light)
  const videoRef = useRef<HTMLIFrameElement>(null)
  const [time, setTime] = useState(0)

  
  const icon1 = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>)
  const icon2 = (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>)

  useEffect(() => {
    return () => reset()
  },[reset])

  
  if(movieLink) {
    return ( 
      <div className={`${light ? 'fixed inset-0 bg-black z-30' : 'bg-black'} rounded-t-2xl mt-3 transition-all duration-200`}>
        <div className={`${light ? 'absolute w-full' : ''} aspect-16/9 w-full h-[80%] mx-auto mt-16 transition-all duration-200`}>
          <iframe 
            ref={videoRef}
            src={movieLink} 
            frameBorder="0"
            allowFullScreen
            className='w-full h-full object-cover'
          ></iframe>
          <div className='absolute top-100% left-0 right-0 flex justify-center gap-10 bg-black/80 backdrop-blur-2xl p-4 rounded-b-2xl font-normal'>
            <ButtonVideoControl title='Yêu thích' icon={icon1} />
            <ButtonVideoControl title='Chế độ rạp phim' icon={icon2} />
            <ButtonVideoControl title='10s' icon={icon2} />
            <ButtonVideoControl title='10s' icon={icon2} />
          </div>
        </div>
      </div>
    )
  }
}

export default StreamingPlayer