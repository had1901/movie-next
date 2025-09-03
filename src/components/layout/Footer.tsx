'use client'
import { Facebook, Instagram, Youtube } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Threads from "../service/Threads"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function Footer() {
    const pathname = usePathname()

   
    if(pathname.startsWith('/auth')) return null
    return (
        <footer className="bg-(--bg-sub) text-gray-300 py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
                {/* Logo + description */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                    <Image
                        src="/logo-movies.png" // đổi thành logo của bạn
                        alt="Mephim Logo"
                        width={100}
                        height={40}
                        className="object-contain"
                    />
                    </div>
                    <p className="text-sm leading-relaxed max-w-lg bg-(--bg-sub)/40 p-2 rounded-xl backdrop-blur-sm">
                        MOVIESFLIX - Trang web xem phim trực tuyến miễn phí chất lượng cao với giao diện thân thiện, tốc độ tải trang nhanh, cùng kho phim với hơn 30.000+ phim mới, phim hay, luôn cập nhật phim nhanh, hứa hẹn sẽ đem lại phút giây giải trí tuyệt vời cho bạn.
                    </p>
                </div>

                
                </div>

                <div className="">
                    <div className="border-t flex items-center justify-between border-gray-700 mt-8 pt-6 text-sm ">
                    <p>© 2025 MOVIESFLIX</p>
                    <div className="flex items-center gap-6">
                        <Link href="https://facebook.com" target="_blank">
                        <Facebook />
                        </Link>
                        <Link href="https://twitter.com" target="_blank">
                        <Instagram />
                        </Link>
                        <Link href="https://instagram.com" target="_blank">
                        <Youtube />
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
