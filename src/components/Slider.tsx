/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { MovieHomeResponse } from '@/interface/interface';
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Link from 'next/link';

const bg = 'https://www.themoviedb.org/assets/2/v4/misc/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg'
function Slider({ result }:{ result: MovieHomeResponse }) {

    const [fade, setFade] = useState(true)
    

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(!fade) 
        }, 4000)
    return () => clearInterval(interval)
    }, [fade])

  return (
    <div className={`relative rounded-3xl px-4`}>
        <div 
            className={`bg-bottom-left ${fade ? 'opacity-0' : 'opacity-100 pointer-events-none'} absolute top-0 left-0 right-0 -bottom-[100px] bg-no-repeat bg-cover transition-all duration-2500`} 
            style={{ backgroundImage: `url(${bg})` }}
        ></div>
        <div 
            className={`bg-bottom-right ${fade ? 'opacity-100' : 'opacity-0 pointer-events-none'} absolute top-0 left-0 right-0 -bottom-[100px] bg-no-repeat bg-cover transition-all duration-2500`} 
            style={{ backgroundImage: `url(${bg})` }}
        ></div>
        <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={24}
            slidesPerView={6}
            // autoplay={{ delay: 4000, disableOnInteraction: false }}
            // navigation={{
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev',
            // }}
            // navigation
            // pagination={{ clickable: true }}
            // onSlideChange={() => console.log('slide change')}
            scrollbar={{ draggable: true }}
            className='h-full no-scrollbar !px-[10px]'
            breakpoints={{
                320: {
                    slidesPerView: 1,
                },
                640: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 4,
                },
                1366: {
                    slidesPerView: 6,
                },
            }}
        >
            {result.data.items.map((item, index) => (
                <SwiperSlide key={index} className='h-full'>
                    <Link href={`/detail-movie/${item.slug}`} className='aspect-[2/3] inline-block w-full cursor-pointer'>
                        <div className='relative h-full'>
                            <Image 
                                src={`${result.data.APP_DOMAIN_CDN_IMAGE}/uploads/movies/${item.thumb_url}`} 
                                // width={100} 
                                // height={100} 
                                sizes="auto"
                                fill
                                alt="thumbnail"
                                style={{objectFit: "cover"}}
                                // className='select-none pointer-events-none rounded-3xl object-cover w-full h-full'
                                className='select-none pointer-events-none rounded-3xl object-cover '
                            />
                        </div>
                        <h2 className='text-white font-medium pt-2 px-2 line-clamp-1'>{item.name}</h2>
                        <h3 className='text-white text-[14px] px-2 line-clamp-1'>{item.origin_name}</h3>
                        <div className='flex items-center justify-between absolute top-2 -left-[10px] -right-[10px] z-10'>
                            <span className='text-white font-medium bg-linear-to-bl from-violet-500 to-fuchsia-500 rounded-r-sm text-[12px] px-1 py-[2px] after-mask-left'>{`${item.quality} + ${item.lang}`}</span>
                        </div>
                        <span className='text-white absolute top-2 right-[10px] z-10 font-medium bg-linear-to-bl from-violet-500 to-fuchsia-500 rounded-lg text-[12px] px-2 py-1'>{item.episode_current}</span>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )
}

export default Slider