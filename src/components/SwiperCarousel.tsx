'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from "swiper/modules"
import 'swiper/css/bundle'
import 'swiper/css/navigation'
import MovieCard from './MovieCard'



function SwiperCarousel({ movies, clippath, slidesPerView = 2.5, ratio='aspect-[2/3]', isBackdrop=false }:{ movies: any, clippath?: boolean, slidesPerView?: number, ratio?: string, isBackdrop?: boolean }) {
    const swiperRef = useRef<any>(null)
    const prevRef = useRef(null)
    const nextRef = useRef(null)

    useEffect(() => {
        if (
        swiperRef.current &&
        swiperRef.current.params &&
        prevRef.current &&
        nextRef.current
        ) {
        swiperRef.current.params.navigation.prevEl = prevRef.current
        swiperRef.current.params.navigation.nextEl = nextRef.current
        swiperRef.current.navigation.init()
        swiperRef.current.navigation.update()
        }
    }, [])

  return (
    <div className={`h-full w-full min-w-0 `}>
            <div className='relative'>
                <Swiper 
                    modules={[Pagination, Navigation]}
                    spaceBetween={10}
                    slidesPerView={slidesPerView} 
                    grabCursor    
                    scrollbar={{ draggable: true }}
                    className='h-full'
                    // navigation={{
                    //     // nextEl: '.swiper-button-next-slider',
                    //     // prevEl: '.swiper-button-prev-slider',
                    //     nextEl: prevRef?.current,
                    //     prevEl: nextRef?.current,
                    // }}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    breakpoints={{
                    320: {
                        slidesPerView: 2.5, // mobile nhỏ
                    },
                    640: {
                        slidesPerView: 4.5, // tablet
                    },
                    1024: {
                        slidesPerView: 6.5, // desktop
                    },
                    1440: {
                        slidesPerView: 8.5, // màn hình lớn
                    },
                }}
                >
                    {movies?.data?.items?.map((item: any, index: number) => (
                        <SwiperSlide key={index}>
                            <MovieCard 
                                item={item} 
                                imgDomain={movies?.data?.APP_DOMAIN_CDN_IMAGE} 
                                index={index} 
                                clippath={clippath} 
                                ratio={ratio} 
                                isBackdrop={isBackdrop} 
                            />
                        </SwiperSlide>
                    ))}
                    
                </Swiper>
                {/* <button ref={prevRef} className='swiper-button-prev-slider absolute -left-5 bg-[#ebebeb] border w-10 h-10 flex items-center justify-center rounded-full top-1/2 -translate-y-1/2 text-white z-10 cursor-pointer'>
                    <i className='font-bold text-black'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </i>
                </button>
                <button ref={nextRef} className='swiper-button-next-slider absolute -right-5 bg-[#ebebeb] border w-10 h-10 flex items-center justify-center rounded-full top-1/2 -translate-y-1/2 text-white z-10 cursor-pointer'>
                    <i className='font-bold text-black'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </i>
                </button> */}
            </div>
    </div>
  )
}


export default SwiperCarousel