/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
function MovieCard({ item, imgDomain, index, clippath = false }:{ item: any, imgDomain: string, index: number, clippath?: boolean }) {
  const clip = `${index % 2 !== 0 && clippath 
                ? 'polygon(5.761% 100%, 94.239% 100%, 94.239% 100%, 95.174% 99.95%, 96.06% 99.803%, 96.887% 99.569%, 97.642% 99.256%, 98.313% 98.87%, 98.889% 98.421%, 99.357% 97.915%, 99.706% 97.362%, 99.925% 96.768%, 100% 96.142%, 100% 3.858%, 100% 3.858%, 99.913% 3.185%, 99.662% 2.552%, 99.263% 1.968%, 98.731% 1.442%, 98.08% .984%, 97.328% .602%, 96.488% .306%, 95.577% .105%, 94.609% .008%, 93.6% .024%, 5.121% 6.625%, 5.121% 6.625%, 4.269% 6.732%, 3.468% 6.919%, 2.728% 7.178%, 2.058% 7.503%, 1.467% 7.887%, .962% 8.323%, .555% 8.805%, .253% 9.326%, .065% 9.88%, 0 10.459%, 0 96.142%, 0 96.142%, .075% 96.768%, .294% 97.362%, .643% 97.915%, 1.111% 98.421%, 1.687% 98.87%, 2.358% 99.256%, 3.113% 99.569%, 3.94% 99.803%, 4.826% 99.95%, 5.761% 100%)' 
                : clippath && 'polygon(94.239% 100%, 5.761% 100%, 5.761% 100%, 4.826% 99.95%, 3.94% 99.803%, 3.113% 99.569%, 2.358% 99.256%, 1.687% 98.87%, 1.111% 98.421%, .643% 97.915%, .294% 97.362%, .075% 96.768%, 0 96.142%, 0 3.858%, 0 3.858%, .087% 3.185%, .338% 2.552%, .737% 1.968%, 1.269% 1.442%, 1.92% .984%, 2.672% .602%, 3.512% .306%, 4.423% .105%, 5.391% .008%, 6.4% .024%, 94.879% 6.625%, 94.879% 6.625%, 95.731% 6.732%, 96.532% 6.919%, 97.272% 7.178%, 97.942% 7.503%, 98.533% 7.887%, 99.038% 8.323%, 99.445% 8.805%, 99.747% 9.326%, 99.935% 9.88%, 100% 10.459%, 100% 96.142%, 100% 96.142%, 99.925% 96.768%, 99.706% 97.362%, 99.357% 97.915%, 98.889% 98.421%, 98.313% 98.87%, 97.642% 99.256%, 96.887% 99.569%, 96.06% 99.803%, 95.174% 99.95%, 94.239% 100%)'}`
  return (
    <Link href={`/detail-movie/${item.slug}`} className='aspect-[2/3] inline-block w-full cursor-pointer' scroll={false}>
        <div 
          className='relative h-full rounded-3xl overflow-hidden ' 
          style={{ clipPath: `${clippath ? clip : ''}`}}>
            <Image 
                src={`${imgDomain}/uploads/movies/${item.thumb_url}`} 
                sizes="auto"
                fill
                alt="thumbnail"
                className='select-none pointer-events-none object-cover shadow-2xl '
            />
            {/* <div className='flex items-center justify-between absolute top-2 -left-[8px] -right-[10px] z-10'>
                <span className='text-white font-medium bg-linear-to-bl from-violet-500 to-fuchsia-500 rounded-r-sm text-[12px] px-1 py-[2px] after-mask-left'>{`${item.quality} + ${item.lang}`}</span>
            </div>
            <span className={`${item.episode_current === 'Trailer' ? 'text-(--text-main-yellow)' : 'text-white'} absolute top-2 right-[10px] z-10 font-medium bg-linear-to-bl from-violet-500 to-fuchsia-500 rounded-lg text-[12px] px-2 py-1`}>{item.episode_current}</span> */}
        </div>
        <h2 className='text-white font-medium text-center pt-2 px-2 line-clamp-1'>{item.name}</h2>
        <h3 className='text-(--text-sub-color) text-[14px] text-center px-2 line-clamp-1'>{item.origin_name}</h3>
    </Link>
  )
}

export default MovieCard