/* eslint-disable @typescript-eslint/no-explicit-any */
import MovieCard from '@/components/MovieCard'
import Pagination from '@/components/Pagination'
import { handleGetMovie } from '@/utils/fetchApi'
import { Metadata } from 'next'
import React from 'react'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

type Props = {
  params: Promise<{ type: string, slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
 
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { type, slug } = await params
    const { page } = await searchParams
    const res = await fetch(`${BASE_URL}/v1/api/${type}/${slug}?page=${page}&limit=48`)
    const result = await res.json()

    return {
      title: result?.data?.seoOnPage?.titleHead || 'Movies',
      description: result?.data?.seoOnPage?.descriptionHead || 'Movies',
      keywords: result?.data?.type_list || ['xem phim', 'phim lẻ', 'phim chiếu rạp', 'hoạt hình'], // hoặc tự define
      openGraph: {
        title: result?.data?.titlePage || '',
        description: result?.data?.seoOnPage?.descriptionHead || 'Movies',
        url: `https://your-domain.com/phim/${slug}`,
        siteName: 'Chill Movies',
        images: [
          {
            url: result?.image || `https://img.ophim.live/${result?.data?.seoOnPage?.og_image[Math.floor(Math.random() * result?.data?.seoOnPage?.og_image?.length)]}`,
            width: 800,
            height: 600,
            alt: result?.title || 'Poster phim',
          },
        ],
        locale: 'vi_VN',
        type: 'video.movie', // nếu là phim, dùng video.movie
      },
      twitter: {
        card: 'summary_large_image',
        title: result?.data?.titlePage || 'Movies',
        description: result?.data?.seoOnPage?.descriptionHead || 'Movies',
        images: [result?.data?.seoOnPage?.og_image],
      },
      metadataBase: new URL('https://your-domain.com'),
    }
}


async function Category({ params, searchParams }: Props) {
  const { type, slug } = await params
  const { page } = await searchParams
  const pageNumber = page || 1
  const { data } = await handleGetMovie(`${BASE_URL}/v1/api/${type}/${slug}?page=${pageNumber}&limit=48`)


  return (
    <div className=' mx-auto mt-14 lg:mt-26 text-white rounded-xl p-6 px-2 lg:px-10'>
      <div className='flex justify-between'>
        <h1 className='text-xl lg:text-2xl font-semibold text-(--text-main-yellow)'>{data && data?.titlePage}</h1>
        <div className='flex items-center text-sm lg:text-base'>
          <span className='text-sm text-(--text-sub-color) mr-2'>Tổng: </span>
          <span>{data && data?.params?.pagination?.totalItems} phim</span>
          </div>
      </div>
      <div className='mt-2 lg:mt-6'>
        <ul className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 gap-1 sm:gap-2 md:gap-3 lg:gap-4'>
            {data?.items && data.items.length > 0 && data.items.map((item: any, index: number) => (
              <li key={item._id}>
                <MovieCard item={item} imgDomain={data.APP_DOMAIN_CDN_IMAGE} index={index}/>
              </li>
            ))}
        </ul>
      </div>
      <div className='mt-4'>
        <Pagination total={data && data?.params?.pagination?.totalItems}/>
      </div>
    </div>
  )
}

export default Category