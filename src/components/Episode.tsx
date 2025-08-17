'use client'
import { useMovieLink } from '@/store/store'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'

function Episode({ movie }:{ movie: any }) {
    const [currentIndex, setCurrentIndex] = useState<number>(1)
    const [epsIndex, setEpsIndex] = useState<number>(0)
    // const [filmLink, setFilmLink] = useState<string>('')
    const setLink = useMovieLink(state => state.setLink)
    
    // console.log('epsIndex', epsIndex)
    console.log('data', movie)

    const handleGetFilmLink = (index: number, link: string) => {
        setEpsIndex(index)
        setLink(link)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
  return (
    <div id='episodes' className='scroll-mt-24'>
        {movie.data.item.episodes.length > 0 && movie.data.item.episodes.map((ep: any, index: number) => (
            <div key={index}>
                <label className={`${currentIndex === index + 1 ? 'text-(--bg-main-color) border border-(--bg-main-color)' : ''} mr-3 p-2 rounded-md cursor-pointer`} onClick={() => setCurrentIndex(index + 1)}>{ep.server_name}</label>
                {currentIndex === index + 1  && <ul className='grid grid-cols-10 mt-8 gap-2'>
                    {ep.server_data.length > 0 && ep.server_data.map((film: any, index: number) => (
                        <li 
                            key={index} 
                            className={`${epsIndex === index + 1 ? 'text-(--text-main-color) bg-(--bg-main-color)' : 'text-white' } ${film.name === '' && 'hidden'} flex items-center gap-1 justify-center font-medium bg-(--bg-label) py-3 px-4 text-center rounded-md cursor-pointer`}
                            onClick={() => handleGetFilmLink(index + 1, film.link_embed)}
                        >
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                    <path d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267V3.732Z" />
                                </svg>
                            </i>
                            <span className='whitespace-nowrap'>{`${film.name === 'Full' ? film.name : `Tập ${film.name}`}`}</span>
                        </li>
                    ))}
                </ul>}
               
            </div>
        ))}
    </div>
  )
}

export default Episode