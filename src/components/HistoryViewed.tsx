/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

function HistoryViewed() {
    const [movies, setMovies] = useState<any>([])
    console.log(movies)
        console.log(movies?.data?.APP_DOMAIN_CDN_IMAGE)
    
    useEffect(() => {
        const itemSlug = localStorage.getItem('_films')
        const arrParse: string[] = itemSlug ? JSON.parse(itemSlug) : []

        console.log(arrParse)

        const handleFetch = async () => {
            const results = await Promise.all(
                    arrParse.map(slug =>
                        fetch(`${BASE_URL}/v1/api/phim/${slug}`).then(res => res.json())
                    )
                )
            setMovies(results)
        }
        handleFetch()
    },[])

  return (
    <div className='relative bg-gradient-to-t from-black to-transparent rounded-2xl overflow-hidden mt-10'>
        <div className=' px-6 py-8'>
            <h2 className='text-2xl font-bold mb-3 text-white'>Phim đã xem</h2>
            <Swiper 
                modules={[Pagination, Navigation]}
                spaceBetween={10}
                slidesPerView={6} 
                grabCursor    
                scrollbar={{ draggable: true }}
                className='h-full'
                navigation={{
                    // nextEl: '.swiper-button-next-slider',
                    // prevEl: '.swiper-button-prev-slider',
                }}
            >
                {movies.length > 0 && movies.map((movie: any, index: number) => (
                    <SwiperSlide key={index}>
                        <MovieCard 
                            item={movie.data.item} 
                            imgDomain={movies?.data?.APP_DOMAIN_CDN_IMAGE} 
                            index={index} 
                            // clippath={clippath} 
                            // ratio={ratio} 
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            
        </div>
    </div>
)

}

export default HistoryViewed