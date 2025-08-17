'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay, Parallax, EffectFade  } from "swiper/modules"
import 'swiper/css/bundle'
import 'swiper/css/navigation'
import MovieCard from './MovieCard'



function SwiperCarousel({ movies, clippath, slidesPerView = 6 }:{ movies: any, clippath?: boolean, slidesPerView?: number }) {

    const prevRef = useRef(null)
    const nextRef = useRef(null)

  return (
    <div className={`h-full w-full min-w-0 rounded-3xl`}>
            <div className='relative'>
                <Swiper 
                    modules={[Pagination, Navigation]}
                    spaceBetween={14}
                    slidesPerView={slidesPerView} 
                    grabCursor    
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    scrollbar={{ draggable: true }}
                    className='h-full'
                >
                    {movies.data.items.map((item: any, index: number) => (
                        <SwiperSlide key={index}>
                            <MovieCard item={item} imgDomain={movies.data.APP_DOMAIN_CDN_IMAGE} index={index} clippath={clippath} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button ref={prevRef} className='absolute -left-5 bg-[#ebebeb] border w-10 h-10 flex items-center justify-center rounded-full top-1/2 -translate-y-1/2 text-white z-10 cursor-pointer'>
                    <i className='font-bold text-black'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </i>
                </button>
                <button ref={nextRef} className='absolute -right-5 bg-[#ebebeb] border w-10 h-10 flex items-center justify-center rounded-full top-1/2 -translate-y-1/2 text-white z-10 cursor-pointer'>
                    <i className='font-bold text-black'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </i>
                </button>
            </div>
    </div>
  )
}


export default SwiperCarousel