/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { debounce } from '@/utils/debouce'
import React, { ChangeEvent, useEffect, useState } from 'react'
import SearchResult from './SearchResult'
import { usePathname } from 'next/navigation'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

function Search() {
    const [search, setSearch] = useState<string>('')
    const [result, setResult] = useState<any>({})
    const pathname = usePathname()

    const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value) 
        setSearch(e.target.value)
    },800)


    useEffect(() => {
        if(search) {
            document.body.style.overflow = 'hidden'
            const handleFetchAPI = async () => {
                try{
                    const res = await fetch(`${BASE_URL}/v1/api/tim-kiem?keyword=${search}`)
                    const result = await res.json()
                    console.log(result)
                    if(result) setResult(result)
                }catch(e){
                    console.log(e)
                }
            }
            handleFetchAPI()
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    },[search])


    useEffect(() => {
        if(pathname) setSearch('')
    },[pathname])
  return (
    <div className="flex relative text-white ">
        <input 
            type="search" 
            placeholder="Search..."
            className="bg-(--bg-opacity) outline-none border-none rounded-[14px] py-2 pl-7 pr-2 min-w-[300px] text-[15px]"
            onChange={handleSearch}
            name='search'
        />
        <div className="absolute top-1/2 left-2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        </div>
        <SearchResult movies={result} keyword={search} />
    </div>
  )
}

export default Search