'use client'
import { useMovieLink } from '@/store/store'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { isArray } from 'util'


const handleSliceArray = (arr: any[], slice: number) => {
        if (!arr?.length) return []
        const result = []
        for(let i = 0; i < arr?.length; i += slice) {
            result.push(arr.slice(i, i + slice))
        }
        return result
    }


function Episode({ movie }:{ movie: any }) {
    const [labelIndex, setLabelIndex] = useState<number>(1)
    const [epsIndex, setEpsIndex] = useState<number | string>(0)
    const [listEpi, setListEpi] = useState<number>(1)
    const [data, setData] = useState<any[]>(handleSliceArray(movie && movie?.data?.item?.episodes[listEpi]?.server_data, 100))
    const [episode, setEpisode] = useState<number | string | null>(null)
    console.log('data', data)
    const setLink = useMovieLink(state => state.setLink)
    const reset = useMovieLink(state => state.reset)

    
    const chunks = handleSliceArray(movie && movie?.data?.item?.episodes[0]?.server_data, 100)
    const handleChangeServer = (index:number) => {
        setLabelIndex(index + 1)
        setEpsIndex(0)
        reset()
        setData(movie?.data?.item?.episodes[index]?.server_data)
    }

    const handleGetEpisodes = (index:number) => {
        setListEpi(index + 1)
        setData(chunks[index])
    }

    const handleGetFilmLink = (index: number, link: string, epi:(number | string)) => {
        setEpsIndex(epi)
        setLink(link)
        setEpisode(epi)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

  return (
    <div id='episodes' className='w-full'>
            {/* Server */}
            <div className='flex relative'>
                {movie?.data?.item?.episodes?.length > 0 && movie?.data?.item?.episodes.map((ep: any, index: number) => (
                    <div key={index} >
                        <label 
                            className={`${labelIndex === index + 1 ? 'text-(--bg-main-color) border-2 border-(--bg-main-color)' : 'border-[#bbb9b9]/30 border'} text-sm mr-3 w-fit px-2 flex items-center justify-center h-[40px] rounded-md cursor-pointer`} 
                            onClick={() => handleChangeServer(index)}
                        >
                            {ep.server_name}
                        </label>
                    </div>
                ))}
            </div>

            {/* Collection episode */}
            <div className='mt-2'>
                {movie?.data?.item?.episodes[0]?.server_data?.length > 100 && 
                <div className='flex flex-wrap gap-2 items-center'>
                    {chunks.length > 0 && chunks.map((epi:any[], index:number) => (
                        <label onClick={() => handleGetEpisodes(index)} key={index} className={`${listEpi === index + 1 ? 'bg-(--bg-main-color) text-(--text-main-color)' : 'bg-(--bg-sub)'} whitespace-nowrap  text-center min-w-[80px] min-h-[30px] leading-[30px] px-2 py-1 rounded-sm text-sm cursor-pointer hover:opacity-80`}>
                            {epi[0].name} - {epi[epi.length - 1].name}
                        </label>
                    ))}
                </div>}
            </div>

            {/* Episodes */}
            <div className='mt-4'>
                {(
                    <ul className='grid [grid-template-columns:repeat(auto-fill,minmax(120px,1fr))] gap-2'>
                    {Array.isArray(data) && data.length > 0 && data.map((film: any, index: number) => (
                        <li 
                            key={index} 
                            className={`${epsIndex === film.name ? 'text-(--text-main-color) bg-(--bg-main-color)' : 'text-white' } ${film.name === '' ? 'hidden' : ''} flex items-center gap-1 justify-center px-2 font-medium bg-(--bg-label) min-h-14 text-center rounded-sm cursor-pointer hover:opacity-80`}
                            onClick={() => handleGetFilmLink(index + 1, film.link_embed, film.name)}
                        >
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                <path d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267V3.732Z" />
                                </svg>
                            </i>
                            <span className='whitespace-nowrap'>{`${film.name === 'Full' ? film.name : `Tập ${film.name}`}`}</span>
                            {/* <span className='whitespace-nowrap'>{`${film.link_embed}`}</span> */}
                        </li>
                    ))}
                    </ul>
                )}
            </div>
    </div>
  )
}

export default Episode