/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import MovieCard from './MovieCard'
import { createPortal } from 'react-dom'

function SearchResult({ movies, keyword }:{ movies:any, keyword:string }) {
  return createPortal(
    (<div
      className={`${keyword ? 'visible scale-100 opacity-100' : 'scale-0 opacity-0 invisible'} 
        absolute right-10 top-14 origin-top rounded-2xl w-full p-4 
        shadow-2xl bg-[#3a3a3a]/40 backdrop-blur-md text-white transition-all 
        max-w-[500px] max-h-[calc(100vh-200px)] h-full flex flex-col overflow-hidden mt-2`}
    >
      <div className="text-sm mb-4 shrink-0">
        <h2>
          Kết quả tìm kiếm: 
          <strong className="ml-2 text-(--text-main-yellow) text-md">{keyword}</strong>
        </h2>
        <h3 className="text-sm">Tổng: <strong className="text-md">{movies?.data?.items?.length || 0} phim</strong></h3>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        <div className="grid grid-cols-2 gap-3">
          {movies?.data?.items?.map((item: any, index: number) => (
            <MovieCard
              key={index}
              item={item}
              imgDomain={movies.data.APP_DOMAIN_CDN_IMAGE}
              index={index}
              isSearch
            />
          ))}
        </div>
      </div>
    </div>),
    document.body
  )
}

export default SearchResult