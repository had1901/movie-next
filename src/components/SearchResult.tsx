/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import MovieCard from './MovieCard'

function SearchResult({ movies, keyword }:{ movies:any, keyword:string }) {
  return (
    <div
  className={`${keyword ? 'visible scale-100 opacity-100' : 'scale-0 opacity-0 invisible'} 
    absolute left-0 top-full origin-top rounded-2xl container mx-auto p-4 
    shadow-2xl bg-[#3a3a3a]/90 backdrop-blur-2xl text-white transition-all 
    w-[500px] h-[800px] flex flex-col overflow-hidden mt-2`}
>
  <div className="text-sm mb-4 shrink-0">
    <h2>
      Kết quả tìm kiếm: 
      <strong className="ml-2 text-(--text-main-yellow) text-md">{keyword}</strong>
    </h2>
    <h3 className="text-sm">Tổng: <strong className="text-md">{movies?.data?.items?.length || 0} phim</strong></h3>
  </div>

  <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
    <div className="grid grid-cols-3 gap-3">
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
</div>
  )
}

export default SearchResult