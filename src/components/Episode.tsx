'use client'
import { useMovieLink } from '@/store/store'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react'
import { isArray } from 'util'


const handleSliceArray = (arr: any[], size: number) => {
        if (!arr?.length) return []
        if (arr.length <= size) return [arr]
        const result = []
        for(let i = 0; i < arr?.length; i += size) {
            result.push(arr.slice(i, i + size))
        }
        return result
    }


function Episode({ movie }:{ movie: any }) {
    const servers = movie?.data?.item?.episodes ?? []

    const [serverIndex, setServerIndex] = useState(0)
    const [chunkIndex, setChunkIndex] = useState<number>(0)
    const [activeEpName, setActiveEpName] = useState<string | number | null>()

    // const [data, setData] = useState<any[]>(movie && movie?.data?.item?.episodes[chunkIndex]?.server_data)

    console.log('servers', servers)
    const setLink = useMovieLink(state => state.setLink)
    const reset = useMovieLink(state => state.reset)

    const serverData: any[] = useMemo(() => {
        return servers[serverIndex]?.server_data ?? []
    },[servers, serverIndex])

    const chunks = useMemo(() => handleSliceArray(serverData, 100), [serverData])
    console.log('chunks', chunks)

    const visibleEpisodes = chunks[chunkIndex] ?? []

    console.log('visibleEpisodes', visibleEpisodes)
    const handleChangeServer = (index:number) => {
        setServerIndex(index + 1)
        setChunkIndex(0)
        setActiveEpName(null)
        reset()
    }

    const handleSelectChunk  = (index:number) => {
        setChunkIndex(index)
        setActiveEpName(null)
    }

    const handlePickEpisode  = (index: number, link: string, epi:(number | string)) => {
        setActiveEpName(epi)
        setLink(link)
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
                            className={`${serverIndex === index ? 'text-(--bg-main-color) border-2 border-(--bg-main-color)' : 'border-[#bbb9b9]/30 border'} text-sm mr-3 w-fit px-2 flex items-center justify-center h-[40px] rounded-md cursor-pointer`} 
                            onClick={() => handleChangeServer(index)}
                        >
                            {ep.server_name}
                        </label>
                    </div>
                ))}
            </div>

            {/* Collection episode */}
            <div className='mt-2'>
                {serverData.length > 100 && 
                    <div className='flex flex-wrap gap-2 items-center'>
                        {chunks.length > 0 && chunks.map((epi:any[], index:number) => (
                            <label onClick={() => handleSelectChunk(index)} key={index} className={`${chunkIndex === index ? 'bg-(--bg-main-color) text-(--text-main-color)' : 'bg-(--bg-sub)'} whitespace-nowrap  text-center min-w-[80px] min-h-[30px] leading-[30px] px-2 py-1 rounded-sm text-sm cursor-pointer hover:opacity-80`}>
                                {epi[0].name} - {epi[epi.length - 1].name}
                            </label>
                        ))}
                </div>}
            </div>

            {/* Episodes */}
            <div className='mt-4'>
                <ul className='grid [grid-template-columns:repeat(auto-fill,minmax(120px,1fr))] gap-2'>
                    {visibleEpisodes.length > 0 && visibleEpisodes.map((film: any, index: number) => (
                        <li 
                            key={index} 
                            className={`${activeEpName === film.name ? 'text-(--text-main-color) bg-(--bg-main-color)' : 'text-white' } ${film.name === '' ? 'hidden' : ''} flex items-center gap-1 justify-center px-2 font-medium bg-(--bg-label) min-h-14 text-center rounded-sm cursor-pointer hover:opacity-80`}
                            onClick={() => handlePickEpisode (index + 1, film.link_embed, film.name)}
                        >
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                <path d="M3 3.732a1.5 1.5 0 0 1 2.305-1.265l6.706 4.267a1.5 1.5 0 0 1 0 2.531l-6.706 4.268A1.5 1.5 0 0 1 3 12.267V3.732Z" />
                                </svg>
                            </i>
                            <span className='whitespace-nowrap'>{`${film.name === 'Full' ? film.name : `Tập ${film.name}`}`}</span>
                        </li>
                    ))}
                </ul>
            </div>
    </div>
  )
}

export default Episode