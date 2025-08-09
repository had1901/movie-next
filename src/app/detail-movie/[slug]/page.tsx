
/* eslint-disable @typescript-eslint/no-explicit-any */
import Breadcrumb from '@/components/Breadcrumb'
import ButtonViewDetail from '@/components/ButtonViewDetail'
import Content from '@/components/Content'
import LabelSub from '@/components/LabelSub'
import Image from 'next/image'
import React from 'react'
import avatarPlaceholder from '@/public/avatar-placeholder.jpg'
import Episode from '@/components/Episode'
import StreamingPlayer from '@/components/StreamingPlayer'
import Poster from '@/components/Poster'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const handleGetMovieById = async (slug: string): Promise<any> => {
  try {
    const res = await fetch(`${BASE_URL}/v1/api/phim/${slug}`)
    if (!res.ok) throw new Error('Lỗi API Movie')
    return res.json()
  } catch (err) {
    console.error('Lỗi khi gọi API:', err)
    throw err 
  }
}

const handleGetActors = async (slug: string): Promise<any> => {
  try {
    const res = await fetch(`${BASE_URL}/v1/api/phim/${slug}/peoples`)
    if (!res.ok) throw new Error('Lỗi API Actors')
    return res.json()
  } catch (err) {
    console.error('Lỗi khi gọi API:', err)
    throw err 
  }
}

async function DetailMovie({ params }:{ params: Promise<{ slug: string }>}) {
  const { slug } = await params
    const { data } = await handleGetMovieById(slug)
    const actors = await handleGetActors(slug)

    console.log('Phim', data)
    // console.log('Diễn viên', actors)

    

    
  return (
    <div className='text-white py-3'>
      <Breadcrumb breadcrumb={data.breadCrumb}/>

      {/* Player video */}
      <Poster data={data} />

      {/* Information movie */}
      <section className='mt-10'>
        <div className='flex flex-wrap px-4'>
          <div className='w-3/4 flex flex-wrap h-fit border-r-2 border-(--border-color)'>
            <div className='flex pb-10'>
              <div className='flex 1 w-[150px] h-[250px] relative mr-6'>
                <Image 
                  src={`${data.APP_DOMAIN_CDN_IMAGE}/uploads/movies/${data.item.thumb_url}`} 
                  fill
                  sizes='auto'
                  placeholder="blur"
                  blurDataURL={`${data.APP_DOMAIN_CDN_IMAGE}/uploads/movies/${data.item.thumb_url}`}
                  alt='Thumbnail Movie'
                  style={{objectFit: "cover"}}
                  className='rounded-2xl '
                />
              </div>
              <div className='flex-2 shrink-0 px-3'>
                <h2 className='text-[22px] font-semibold bg-gradient-to-r from-(--bg-main-color) to-fuchsia-700 bg-clip-text text-transparent'>{data.item.name}</h2>
                <h3>{data.item.origin_name}</h3>
                <ul className='flex gap-2 mt-4 text-xs'>
                  <li className='flex items-start gap-1 border rounded py-1 px-2 border-(--bg-main-color) '>
                    <span className='text-(--bg-main-color)'>IMDB</span>
                    <span>{data.item.imdb.vote_average}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="var(--bg-main-color)" className="size-3.5">
                      <path fillRule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clipRule="evenodd" />
                    </svg>
                  </li>
                  <li className='border rounded py-1 px-2 '>{data.item.year}</li>
                  <li className='border rounded py-1 px-2'>{`${data.item.episode_total == 1 ? 'Full' : data.item.episode_total}`}</li>
                  <li className='border rounded py-1 px-2'>{`${data.item.lang} + ${data.item.quality}`}</li>
                  {/* <li>{data.item.imdb.vote_count} đánh giá</li> */}
                </ul>
                <ul className='flex items-center gap-2 mt-3'>
                  {data.item.category.map((item: any, index: number) => (
                    <li key={index} className='bg-(--bg-label) rounded py-1 px-2 text-xs'>{item.name}</li>
                  ))}
                </ul>
                <div className='text-sm mt-6'>
                  <label className='mt-2'>
                    {data.item.episode_current === 'Trailer' 
                      ? (<span className='text-[#111111] text-sm bg-(--bg-main-color) py-1 px-2 rounded-md'>Chưa phát hành</span>)
                      : (<span className={`${data.item.status === 'completed' ? 'bg-[#23d372]/20 text-[#00df64]' : 'bg-(--bg-main-color) text-[#0e0e0e]'} inline-block text-sm py-[6px] px-3 rounded-md`}>
                          {data.item.status === 'completed'
                            ? (<span className='flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                  <path fillRule="evenodd" d="M15 8c0 .982-.472 1.854-1.202 2.402a2.995 2.995 0 0 1-.848 2.547 2.995 2.995 0 0 1-2.548.849A2.996 2.996 0 0 1 8 15a2.996 2.996 0 0 1-2.402-1.202 2.995 2.995 0 0 1-2.547-.848 2.995 2.995 0 0 1-.849-2.548A2.996 2.996 0 0 1 1 8c0-.982.472-1.854 1.202-2.402a2.995 2.995 0 0 1 .848-2.547 2.995 2.995 0 0 1 2.548-.849A2.995 2.995 0 0 1 8 1c.982 0 1.854.472 2.402 1.202a2.995 2.995 0 0 1 2.547.848c.695.695.978 1.645.849 2.548A2.996 2.996 0 0 1 15 8Zm-3.291-2.843a.75.75 0 0 1 .135 1.052l-4.25 5.5a.75.75 0 0 1-1.151.043l-2.25-2.5a.75.75 0 1 1 1.114-1.004l1.65 1.832 3.7-4.789a.75.75 0 0 1 1.052-.134Z" clipRule="evenodd" />
                                </svg>
                                <span>Đã hoàn thành: {data.item.episode_current}</span>
                              </span>)
                            : (<span className='flex items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                  <path fillRule="evenodd" d="M2 4.25A2.25 2.25 0 0 1 4.25 2h7.5A2.25 2.25 0 0 1 14 4.25v5.5A2.25 2.25 0 0 1 11.75 12h-1.312c.1.128.21.248.328.36a.75.75 0 0 1 .234.545v.345a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-.345a.75.75 0 0 1 .234-.545c.118-.111.228-.232.328-.36H4.25A2.25 2.25 0 0 1 2 9.75v-5.5Zm2.25-.75a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75h-7.5Z" clipRule="evenodd" />
                                </svg>
                                <span>{`Đang chiếu: ${data.item.episode_current}`}</span>
                              </span>)
                          }
                        </span>)
                    }
                  </label>
                  <label className='block mt-3'>
                    <span>Thời lượng: </span> 
                    <span className='text-(--bg-main-color) font-semibold rounded'>{data.item.time}</span>
                  </label>
                  <label className='block mt-1'>
                    <span>Tổng: </span> 
                    <span className='text-(--bg-main-color) font-semibold rounded '>{data.item.episode_total}</span>
                  </label>
                  
                </div>
              </div>
              <div className='flex-2 shrink-0 px-3'>
                <Content content={data.item.content} />
              </div>
            </div>
            <div className='pt-10 border-t-2 border-(--border-color) w-full'>
              <Episode data={data} />
            </div>
          </div>
          <div className='w-1/4'>
            <h3 className='text-2xl mb-8 text-center'>Diễn viên</h3>
            <ul className='flex items-center flex-wrap gap-4 px-4'>
              {actors.success && actors.data.peoples.length > 0 && actors.data.peoples.map((actor: any, index: number) => (
                <li key={actor.tmdb_people_id || index} className='text-center mb-2 flex-1'>
                  <div className='relative w-[80px] h-[80px] mx-auto'>
                    <Image 
                      src={`${actor.profile_path !== '' ? `${actors.data.profile_sizes.original}/${actor.profile_path}`: '/avatar-placeholder.jpg'}`}
                      fill
                      sizes='auto'
                      alt='avatar-actor'
                      style={{ objectFit: 'cover'}}
                      className='rounded-full'
                    />
                  </div>
                  <label className='inline-block text-sm py-1'>{actor.name}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

    </div>
  )
}

export default DetailMovie