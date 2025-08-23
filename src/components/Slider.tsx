/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useRef, useState } from 'react'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay, Parallax, EffectFade, Thumbs  } from "swiper/modules";
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Poster from './Poster';



function Slider({ result, ratio = 'aspect-[2/3]', hasMark=false }:{ result: any, ratio?: string, hasMark?: boolean }) {
    const swiperRef = useRef<any>(null)
    const [currentSlide, setCurrentSlide] = useState(0)
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
    const data = hasMark ? result.data.items : result.data.items.slice(0,15)

    const styleCustomMark = {
        maskImage: 'linear-gradient(90deg, transparent 10px, #292929 10%, #292929 80%, transparent 99%)',
        WebkitMaskImage: 'linear-gradient(90deg, transparent 10px, #292929 10%, #292929 80%, transparent 99%)',
    }
    const handleChangeSlide = (index: number) => {
        swiperRef.current?.slideToLoop(index)
        setCurrentSlide(index)
    }
  return (
    <div className={`relative ${hasMark ? 'h-[420px] md:h-[600px] xl:h-[900px]' : 'h-[300px] md:h-[400px] xl:h-[500px]'} rounded-3xl`}>
        <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Pagination, Navigation, Autoplay, Parallax, EffectFade, Thumbs]}
            thumbs={thumbsSwiper && !thumbsSwiper.destroyed ? { swiper: thumbsSwiper } : undefined}
            slidesPerView={1}
            parallax={true}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            grabCursor
            scrollbar={{ draggable: true }}
            speed={800}
            loop
            className='h-full no-scrollbar'
            onSlideChange={(swiper) => {
                setCurrentSlide(swiper.realIndex)
                if (thumbsSwiper && !thumbsSwiper.destroyed) {
                    // đẩy thumbnail tới vị trí tương ứng
                    thumbsSwiper.slideToLoop(swiper.realIndex) 
                }
            }}
        >
            {data.map((item:any, index:number) => (
                <SwiperSlide key={index} className='h-full' >
                    <Poster data={item} hasMark={hasMark} textSize='24px'/>
                </SwiperSlide>
            ))}
        </Swiper>
        <div 
            className={`absolute left-[100px] right-[100px] ${hasMark ? 'bottom-[0]' : '-bottom-10'}  z-20`} 
            style={hasMark ? styleCustomMark : {}}
        >
            <Swiper 
                modules={[Pagination, Navigation, Thumbs]}
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={10}
                watchSlidesProgress
                // slideToClickedSlide={true}
                grabCursor
                loop
                centeredSlides={hasMark}      
                className='h-full'
                scrollbar={{ draggable: true }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
            >
                {data.map((item:any, index:number) =>  (
                    <SwiperSlide key={index} onClick={() => handleChangeSlide(index)}>
                        <div className={`relative rounded-xl overflow-hidden cursor-pointer border-2 hover:opacity-90 ${hasMark ? 'min-h-24 w-full' : ratio} ${currentSlide === index ? 'border-yellow-400' : 'border-gray-300/20'}`}>
                            <Image 
                                src={`https://img.ophim.live/uploads/movies/${hasMark ? item.poster_url : item.thumb_url}`} 
                                alt="thumbnail-slide" 
                                className='object-cover select-none' 
                                fill 
                                sizes='100%'
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className='swiper-button-prev' name='button'></button>
            <button className='swiper-button-next' name='button'></button>
        </div>
    </div>
  )
}


export default Slider