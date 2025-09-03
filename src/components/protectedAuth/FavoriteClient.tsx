'use client'
import { useAuth } from '@/store/store'
import { handleGetMovie } from '@/utils/fetchApi'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react'
import ListMovie from '../ListMovie'
import MovieCard from '../MovieCard'
import EmptyData from '../EmptyData'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

function FavoriteClient({ user }:{ user: any }) {
    const [listFavorite, setListFavorite] = useState([])
    const [result, setResult] = useState<any>([])
    console.log('aaa', result)
    const handleGetMovieInfo = useCallback(async () => {
          try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/add-favorite`, {
              method: 'GET',
              next: { revalidate : 60 },
              headers: {
                'User': user.uid
              }
            })
    
            if(!res.ok) {
              console.log('Không lấy được thông tin phim')
              return null
            }
            const result = await res.json()
            console.log('Get favorite', result)
            setListFavorite(result.data)
          }catch(e){
            console.log(e)
          }
    },[user?.uid])

    useEffect(() => {
        if(!user?.uid) return
        handleGetMovieInfo()
    },[user?.uid, handleGetMovieInfo])


    useEffect(() => {
        const getListMovieFavorite = async () => {
            const res = await Promise.all(listFavorite.map((item) => handleGetMovie(`${BASE_URL}/v1/api/phim/${item}`)))
            return res
        }
        
        getListMovieFavorite()
            .then((data) => setResult(data))
            .catch((err) => console.log(err))
    },[listFavorite])
    
    return (
        <div className='p-3 lg:p-0'>
          <h1 className='mb-3 text-xl'>Danh sách phim đã thích</h1>
          <div>
            {result.length > 0
            ? (<div className='w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 flex-wrap'>
                    {result?.map((item: any, index: number) => (
                        <MovieCard 
                            key={index}
                            item={item.data.item} 
                            imgDomain={result?.data?.APP_DOMAIN_CDN_IMAGE} 
                            index={index} 
                            clippath={false} 
                        />
                    ))}
                </div>)
            : <EmptyData title='Chưa có phim yêu thích'/>
            }
          </div>
        </div>
    )
    
}

export default FavoriteClient