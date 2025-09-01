
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SubMenu from '../SubMenu'
import Search from '../Search'
import ClientWrapper from '../ClientWrapper'
import { handleGetMovie } from '@/utils/fetchApi'
import User from '../User'
import Modal from '../Modal'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

async function Header() {
    const [categories, countries] = await Promise.all([
        handleGetMovie(`${BASE_URL}/v1/api/the-loai`),
        handleGetMovie(`${BASE_URL}/v1/api/quoc-gia`)
    ])
    console.log('Re-render header')
    const navigations = [
        { label: 'Trang chủ', href: '/' },
        { label: 'Thể loại', href: '#', children: () => {
            if(categories && categories?.data?.items?.length && categories?.data?.items?.length > 0) {
                return (
                    <SubMenu data={categories.data.items} type='the-loai'/>
                )
            }
        }},
        { label: 'Phim bộ', href: '/danh-sach/phim-bo' },
        { label: 'Phim lẻ', href: '/danh-sach/phim-le' },
        { label: 'Phim chiếu rạp', href: '/danh-sach/phim-chieu-rap' },
        { label: 'Hoạt hình', href: '/danh-sach/hoat-hinh' },
        { label: 'Quốc gia', href: '#', children: () => {
            if(countries && countries?.data?.items?.length && countries?.data?.items?.length > 0) {
                return (
                    <SubMenu data={countries.data.items} type='quoc-gia' />
                )
            }
        }},
    ]

  return (
    <>
        <ClientWrapper>
            <header>
                <div className="container mx-auto">
                    <div className="flex items-center justify-between gap-6 h-18">
                        <Link href={'/'}>
                            <Image 
                                src={'/logo-movies1.png'} 
                                alt="logo"
                                width={140}
                                height={160}
                                className="h-full w-auto"
                                priority 
                            />
                        </Link>
                        <div className="h-full flex items-center">
                            {navigations.map((item, i) => (
                                <Link key={i} href={item.href} className="text-white relative group font-[500] py-4 px-4 inline-block text-[16px]">
                                    <span>{item.label}</span>
                                    <div className='absolute top-full w-[400px] origin-[10%_0%] scale-75 opacity-0 invisible transition-all duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100'>{item.children?.()}</div>
                                </Link>
                            ))}
                        </div>
        
                        <Search />
                        <User />
                    </div>
                </div>
            </header>
        </ClientWrapper>
        <Modal />
    </>
  )
}

export default Header