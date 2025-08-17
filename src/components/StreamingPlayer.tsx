/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useMovieLink } from '@/store/store';
import React, { useEffect, useRef } from 'react'
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';


function StreamingPlayer() {
  const movieLink = useMovieLink(state => state.link)
  console.log('Link', movieLink)

  if(movieLink) {
    return (
     
        <div className='flex aspect-16/9 w-full rounded-2xl h-80% overflow-hidden z-50'>
            <iframe 
              src={movieLink} 
              frameBorder="0"
              className='w-full h-full object-cover'
            ></iframe>
        </div>
    )
  }
}

export default StreamingPlayer