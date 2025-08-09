/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useMovieLink } from '@/store/store';
import React, { useEffect, useRef } from 'react'
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';


function StreamingPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)
  // const playerRef = useRef<any>(null)
  const movieLink = useMovieLink(state => state.link)
  console.log('Link', movieLink)

  // useEffect(() => {
  //   // const videoElement = videoRef.current
  //   console.log('video', videoRef.current)
  //   console.log('player-init', playerRef.current)

  //   if (videoRef.current && movieLink && !playerRef.current) {
  //     playerRef.current = videojs(videoRef.current, {
  //       controls: true,
  //       autoplay: false,
  //       preload: 'auto',
  //       responsive: true,
  //       fluid: true,
  //       liveui: false,
  //       sources: [
  //         {
  //           src: movieLink,
  //           type: 'application/x-mpegURL',
  //         },
  //       ],
  //     })
  //   }

  //   return () => {
  //     if (playerRef.current) {
  //       console.log('Đã gỡ DOM')
  //       playerRef.current.dispose()
  //       playerRef.current = null
  //     }
  //   }
  // }, [movieLink])

  
  return (
      // <div data-vjs-player className='player-movie'>
      //   <video ref={videoRef} className={` video-js vjs-default-skin`} />
      // </div>
      <div className='aspect-video rounded-2xl overflow-hidden'>
        {movieLink && 
          <iframe 
            src={movieLink} 
            frameBorder="0"
            className='w-full h-full object-cover'
          ></iframe>
        }
      </div>
  )
}

export default StreamingPlayer