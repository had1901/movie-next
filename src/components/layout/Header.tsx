
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SubMenu from '../SubMenu'
import Search from '../Search'
import ClientWrapper from '../ClientWrapper'
import { handleGetMovie } from '@/utils/fetchApi'
import User from '../User'
import Modal from '../Modal'
import MenuMobile from '../mobile/MenuMobile'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL


async function Header() {
    const [categories, countries] = await Promise.all([
        handleGetMovie(`${BASE_URL}/v1/api/the-loai`),
        handleGetMovie(`${BASE_URL}/v1/api/quoc-gia`)
    ])
    console.log('Re-render header')

    const navigations = [
        { label: 'Trang chủ', href: '/' },
        { label: 'Thể loại', href: '#', icon: true, children: 
            categories && categories?.data?.items?.length && categories?.data?.items?.length > 0 && 
                (<SubMenu data={categories.data.items} type='the-loai' />)
        },
        { label: 'Phim bộ', href: '/danh-sach/phim-bo' },
        { label: 'Phim lẻ', href: '/danh-sach/phim-le' },
        { label: 'Phim chiếu rạp', href: '/danh-sach/phim-chieu-rap' },
        { label: 'Hoạt hình', href: '/danh-sach/hoat-hinh' },
        { label: 'Quốc gia', href: '#', icon: true, children: 
            countries && countries?.data?.items?.length && countries?.data?.items?.length > 0 && 
                (<SubMenu data={countries.data.items} type='quoc-gia' />)
        },
    ]

  return (
    <>
        <ClientWrapper>
            <header>
                <div className="container mx-auto px-4 xl:px-0">
                    <div className="flex items-center justify-between gap-3 h-18">
                        <div className='flex items-center'>
                            <MenuMobile navigations={navigations} />
                            <Link href={'/'} className='relative w-[140px] sm:w-[240px] lg:max-w-[250px] xl:max-w-[250px] 2xl:max-w-[350px] aspect-[5/2]'>
                                <Image 
                                    src={'/logo-movies1.png'} 
                                    alt="logo"
                                    fill
                                    className="object-contain h-full"
                                    priority 
                                />
                            </Link>
                        </div>
                        <div className="h-full hidden items-center 2xl:flex">
                            {navigations.map((item, i) => (
                                <Link key={i} href={item.href} className="text-white relative group font-[500] py-4 px-4 inline-block text-[16px]">
                                    <div className='flex items-center gap-2'>
                                        <span>{item.label}</span>
                                        {item.icon && 
                                            (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                            </svg>)
                                        }
                                    </div>
                                    <div className='absolute top-full w-[400px] origin-[10%_0%] scale-75 opacity-0 invisible transition-all duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100'>{item?.children}</div>
                                </Link>
                            ))}
                        </div>
                            
                        <div className='flex items-center gap-6'>

                            <Search />
                            <User />
                        </div>
                    </div>
                </div>
            </header>
        </ClientWrapper>
        <Modal />
    </>
  )
}

export default Header