'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import Breadcrumb from '@/components/Breadcrumb'
import Content from '@/components/Content'
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import Episode from '@/components/Episode'
import Poster from '@/components/Poster'
import CustomVideo from '@/components/CustomPlayer'
import StreamingPlayer from '@/components/StreamingPlayer'
import { useParams } from 'next/navigation'
import { useLight, useMovieLink } from '@/store/store'
import Link from 'next/link'
import { handleGetMovie } from '@/utils/fetchApi'
import Slider from '@/components/Slider'
import ListMovie from '@/components/ListMovie'
import SwiperCarousel from '@/components/SwiperCarousel'
import MovieCard from '@/components/MovieCard'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL



function DetailMovie() {
    const { slug } = useParams()
    const [movie, setMovie] = useState<any>({})
    const [actors, setActors] = useState<any>({})
    const [poster, setPoster] = useState<any>({})
    const [home, setHome] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const movieLink = useMovieLink(state => state.link)
    const reset = useMovieLink(state => state.reset)
    
    // console.log('Phim', movie)
    // console.log('Home', home)
    // console.log('Poster', poster)

    // Fix: Thêm optional chaining và kiểm tra data tồn tại
    const domainImages = () => {
      return poster?.data?.image_sizes?.backdrop?.w1280 ?? '/'
    }

    // Fix: Kiểm tra đầy đủ trước khi truy cập
    const img = useMemo(() => {
      if (!poster?.data?.images || !Array.isArray(poster.data.images) || poster.data.images.length === 0) {
        return []
      }
      
      return poster.data.images
        .filter((item: any) => {
          if (!item || item.type !== 'backdrop') return false
          if (!item.iso_639_1) return true
          return item.iso_639_1 === 'vi' || item.iso_639_1 === 'en'
        })
        .map((item: any) => item?.file_path)
        .filter(Boolean) // Loại bỏ các giá trị undefined/null
    }, [poster])

    const styleCustomY = {
      maskImage: 'linear-gradient(90deg, transparent 0, rgba(0, 0, 0, 0.2) 15%, #292929 40%, #292929 80%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent 0, rgba(0, 0, 0, 0.2) 15%, #292929 40%, #292929 80%, transparent 100%)',
    }

    useEffect(() => {
      (async () => {
        try{
          setLoading(true)
          const [movieData, actorsData, posterData, homeData] = await Promise.all([
            handleGetMovie(`${BASE_URL}/v1/api/phim/${slug}`),
            handleGetMovie(`${BASE_URL}/v1/api/phim/${slug}/peoples`),
            handleGetMovie(`${BASE_URL}/v1/api/phim/${slug}/images`),
            handleGetMovie(`${BASE_URL}/v1/api/home`)
          ])
          setMovie(movieData || {})
          setActors(actorsData || {})
          setPoster(posterData || {})
          setHome(homeData || {})
        } catch(e) {
          console.log(e)
          // Set empty objects để tránh undefined
          setMovie({})
          setActors({})
          setPoster({})
          setHome({})
        } finally {
          setLoading(false)
        }
      })()
    }, [slug])
    
    if (loading) {
      return (
        <div className='text-white py-3 mx-40'>
          <div className='flex justify-center items-center h-96'>
            <div>Đang tải...</div>
          </div>
        </div>
      )
    }

  return (
    <div className='text-white mx-20'>
      {/* <Breadcrumb breadcrumb={movie?.data?.breadCrumb}/> */}
      {/* <MetaData /> */}
      <section className='relative h-[800px] w-full aspect-video '>
        <div className=''><StreamingPlayer /></div>
        <div className={`${movieLink ? 'hidden' : 'relative w-full h-full'}`} style={styleCustomY}>
          {img.length > 0 && domainImages() !== '/' ? 
          (<Image 
              src={`${domainImages()}${img[Math.floor(Math.random() * Math.min(img.length, 10))]}`} 
              fill 
              sizes='100%' 
              alt={`Poster ${movie?.data?.item?.poster_url || 'movie'}`} 
              className='object-cover w-full h-full'
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, #292929 50%, rgba(0,0,0,0) 100%)",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskImage: "linear-gradient(to bottom, #292929 50%, rgba(0,0,0,0) 100%)",
                maskRepeat: "no-repeat",
                maskSize: "100% 100%"
              }}
              onError={(e) => {
                console.log('Image load error:', e)
              }}
              priority
            />)
          : (<Image 
              src={
                  movie?.data?.APP_DOMAIN_CDN_IMAGE && movie?.data?.item?.poster_url
                  ? `${movie.data.APP_DOMAIN_CDN_IMAGE}/uploads/movies/${movie.data.item.poster_url}`
                  : "/fallback.png"
              }
              fill 
              sizes='100%' 
              alt={`Poster ${movie?.data?.item?.poster_url || 'movie'}`} 
              className='object-cover w-full h-full'
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, #292929 50%, rgba(0,0,0,0) 100%)",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskImage: "linear-gradient(to bottom, #292929 50%, rgba(0,0,0,0) 100%)",
                maskRepeat: "no-repeat",
                maskSize: "100% 100%"
              }}
              onError={(e) => {
                console.log('Image load error:', e)
              }}
              priority
            />)
          }
          <div style={{backgroundImage: `url(/dot.png)`, backgroundRepeat: 'repeat', backgroundSize: '3px'}} className='absolute inset-0 opacity-50 w-full h-full'></div>
        </div>
        
        <div className={`${movieLink ? 'mt-10' : 'absolute top-[75%]'} transition-all duration-500`}>
          <div className='flex flex-wrap px-4 py-8'>
            <div className='w-3/4 max-w-full flex flex-wrap min-w-0 overflow-hidden h-fit border-r-2 border-(--border-color) px-4'>
              <div className='w-full flex gap-1 pb-10'>
                <div className='flex 1 w-[150px] h-[250px] relative mr-6 py-4'>
                  {/* Thumbnail image code here */}
                  <Image 
                    src={
                        movie?.data?.APP_DOMAIN_CDN_IMAGE && movie?.data?.item?.thumb_url
                        ? `${movie.data.APP_DOMAIN_CDN_IMAGE}/uploads/movies/${movie.data.item.thumb_url}`
                        : "/fallback.png"
                    }
                    fill
                    sizes='100%'
                    placeholder="blur"
                    blurDataURL={
                      movie?.data?.APP_DOMAIN_CDN_IMAGE && movie?.data?.item?.thumb_url
                        ? `${movie.data.APP_DOMAIN_CDN_IMAGE}/uploads/movies/${movie.data.item.thumb_url}`
                        : "/fallback.png"
                    }
                    alt='Thumbnail Movie'
                    style={{objectFit: "cover"}}
                    className='rounded-2xl'
                    priority
                  />
                </div>
                <div className={`${movieLink ? '' : 'bg-gradient-to-b from-(--bg-sub) to-transparent backdrop-blur-sm'} flex-2 shrink-0 px-3 py-4 rounded-2xl`}>
                  <h2 className='text-[22px] font-semibold bg-gradient-to-r from-(--bg-main-color) to-white bg-clip-text text-transparent'>
                    {movie?.data?.item?.name || movie?.item?.name || 'Đang tải...'}
                  </h2>
                  <h3>{movie?.data?.item?.origin_name || movie?.item?.origin_name}</h3>
                  
                  <ul className='flex gap-2 mt-4 text-xs'>
                    <li className='flex items-start gap-1 border rounded py-1 px-2 border-(--bg-main-color) '>
                      <span className='text-(--bg-main-color)'>IMDB</span>
                      <span>{movie?.data?.item?.imdb?.vote_average || 'N/A'}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="var(--bg-main-color)" className="size-3.5">
                        <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
                      </svg>
                    </li>
                    <li className='border rounded py-1 px-2 '>{movie?.data?.item?.year || movie?.item?.year}</li>
                    <li className='border rounded py-1 px-2'>
                      {movie?.data?.item?.episode_total == 1 || movie?.item?.episode_total == 1 ? 'Full' : (movie?.data?.item?.episode_total || movie?.item?.episode_total)}
                    </li>
                    <li className='border rounded py-1 px-2'>
                      {`${movie?.data?.item?.lang || movie?.item?.lang} + ${movie?.data?.item?.quality || movie?.item?.quality}`}
                    </li>
                  </ul>
                  
                  <ul className='flex items-center gap-2 mt-3'>
                    {(movie?.data?.item?.category || movie?.item?.category || []).map((item: any, index: number) => (
                      <li key={index} className='bg-(--bg-label) rounded py-1 px-2 text-xs'>{item?.name}</li>
                    ))}
                  </ul>
                  
                  <div className='text-sm mt-6'>
                    <label className='mt-2'>
                      {(movie?.data?.item?.episode_current || movie?.item?.episode_current) === 'Trailer' 
                        ? (<span className='text-[#111111] text-sm bg-(--bg-main-color) py-1 px-2 rounded-md'>Chưa phát hành</span>)
                        : (<span className={`${(movie?.data?.item?.status || movie?.item?.status) === 'completed' ? 'bg-[#23d372]/20 text-[#00df64]' : 'bg-(--bg-main-color) text-[#0e0e0e]'} inline-block text-sm py-[6px] px-3 rounded-md`}>
                            {(movie?.data?.item?.status || movie?.item?.status) === 'completed'
                              ? (<span className='flex items-center gap-2'>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                    <path fillRule="evenodd" d="M15 8c0 .982-.472 1.854-1.202 2.402a2.995 2.995 0 0 1-.848 2.547 2.995 2.995 0 0 1-2.548.849A2.996 2.996 0 0 1 8 15a2.996 2.996 0 0 1-2.402-1.202 2.995 2.995 0 0 1-2.547-.848 2.995 2.995 0 0 1-.849-2.548A2.996 2.996 0 0 1 1 8c0-.982.472-1.854 1.202-2.402a2.995 2.995 0 0 1 .848-2.547 2.995 2.995 0 0 1 2.548-.849A2.995 2.995 0 0 1 8 1c.982 0 1.854.472 2.402 1.202a2.995 2.995 0 0 1 2.547.848c.695.695.978 1.645.849 2.548A2.996 2.996 0 0 1 15 8Zm-3.291-2.843a.75.75 0 0 1 .135 1.052l-4.25 5.5a.75.75 0 0 1-1.151.043l-2.25-2.5a.75.75 0 1 1 1.114-1.004l1.65 1.832 3.7-4.789a.75.75 0 0 1 1.052-.134Z" clipRule="evenodd" />
                                  </svg>
                                  <span>Đã hoàn thành: {movie?.data?.item?.episode_current || movie?.item?.episode_current}</span>
                                </span>)
                              : (<span className='flex items-center gap-2'>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                    <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 0 1 4.25 2h7.5A2.25 2.25 0 0 1 14 4.25v5.5A2.25 2.25 0 0 1 11.75 12h-1.312c.1.128.21.248.328.36a.75.75 0 0 1 .234.545v.345a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-.345a.75.75 0 0 1 .234-.545c.118-.111.228-.232.328-.36H4.25A2.25 2.25 0 0 1 2 9.75v-5.5Zm2.25-.75a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75h-7.5Z" clipRule="evenodd" />
                                  </svg>
                                  <span>{`Đang chiếu: ${movie?.data?.item?.episode_current || movie?.item?.episode_current}`}</span>
                                </span>)
                            }
                          </span>)
                      }
                    </label>
                    <label className='block mt-3'>
                      <span>Thời lượng: </span> 
                      <span className='text-(--bg-main-color) font-semibold rounded'>
                        {movie?.data?.item?.time || movie?.item?.time}
                      </span>
                    </label>
                    <label className='block mt-1'>
                      <span>Tổng: </span> 
                      <span className='text-(--bg-main-color) font-semibold rounded '>
                        {movie?.data?.item?.episode_total || movie?.item?.episode_total}
                      </span>
                    </label>
                  </div>
                </div>
              <div className='flex-2 shrink-0'>
                  <div className={`${movieLink ? 'hidden' : ''} flex items-center px-3 mb-1 h-20 bg-(--bg-sub) backdrop-blur-sm py-4 rounded-2xl`}>
                    <button className='flex flex-1 items-center justify-center gap-2 min-w-[120px] text-(--text-main-yellow) w-fit p-3 rounded-full cursor-pointer'>
                      <i>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                          <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                        </svg>
                      </i>
                      <Link href={'#episodes'} style={{ scrollBehavior: 'smooth' }} className='font-semibold'>Xem ngay</Link>
                    </button >
                    <button className='flex flex-1 items-center justify-center gap-2 min-w-[120px] w-fit p-3 rounded-full cursor-pointer'>
                      <i>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4">
                          <path d="M3.25 4A2.25 2.25 0 0 0 1 6.25v7.5A2.25 2.25 0 0 0 3.25 16h7.5A2.25 2.25 0 0 0 13 13.75v-7.5A2.25 2.25 0 0 0 10.75 4h-7.5ZM19 4.75a.75.75 0 0 0-1.28-.53l-3 3a.75.75 0 0 0-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 0 0 1.28-.53V4.75Z" />
                        </svg>
                      </i>
                      <Link href={'#'}>Trailer</Link>
                    </button>
                    <button className='flex flex-1 items-center justify-center gap-2 min-w-[120px] w-fit p-3 rounded-full cursor-pointer'>
                      <i>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>

                      </i>
                      <Link href={'#'}>Yêu thích</Link>
                    </button>
                    <button className='flex flex-1 items-center justify-center gap-2 min-w-[120px] w-fit p-3 rounded-full cursor-pointer'>
                      <i>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                        </svg>
                      </i>
                     <Link href={'#'}>Chia sẻ</Link>
                    </button>
                  </div>
                  <div className={`${movieLink ? '' : 'bg-gradient-to-b from-(--bg-sub) to-transparent backdrop-blur-sm'} px-3 py-4 rounded-2xl`}>
                      <h3 className='text-lg mb-1'>Giới thiệu</h3>
                      <Content content={movie?.data?.item?.content} />
                  </div>
              </div>
              </div>
              <Episode movie={movie} />

              {/* <ListMovie title='Có thể bạn sẽ thích'>
                <div className='w-full grid grid-cols-6 gap-3 flex-wrap'>
                    {home?.data?.items?.map((item: any, index: number) => (
                          <MovieCard 
                            key={index}
                            item={item} 
                            imgDomain={home?.data?.APP_DOMAIN_CDN_IMAGE} 
                            index={index} 
                            clippath={true} 
                          />
                    ))}
                </div>
              </ListMovie> */}
            </div>

            

            {/* Diễn viên */}
            <div className='w-1/4'>
              <h3 className='text-2xl mb-8 text-center'>Diễn viên</h3>
              <ul className='flex items-center flex-wrap gap-4 px-4'>
                {actors?.success && actors?.data?.peoples?.length > 0 && actors.data.peoples.slice(0,12).map((actor: any, index: number) => (
                  <li key={actor?.tmdb_people_id || index} className='text-center mb-2 flex-1'>
                    <div className='relative w-[80px] h-[80px] mx-auto'>
                      <Image 
                        src={`${actor?.profile_path !== '' ? `${actors?.data?.profile_sizes?.original}/${actor?.profile_path}`: '/avatar-placeholder.jpg'}`}
                        fill
                        sizes='100%'
                        alt='avatar-actor'
                        style={{ objectFit: 'cover'}}
                        className='rounded-full'
                      />
                    </div>
                    <label className='inline-block text-sm py-1'>{actor?.name}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DetailMovie