import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Mystery_Quest, Emilys_Candy } from "next/font/google";
import "./globals.css";
import { unstable_ViewTransition as ViewTransition } from 'react';
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Script from 'next/script'

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// })

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// })

const robotoFont = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
})

const nosiferFont = Emilys_Candy({
  weight: ["400"],
  variable: "--font-nosifer",
  subsets: ["latin"],
  display: 'swap'
})



export const metadata: Metadata = {
  title: 'Chill Movies',
  description: 'Trang web xem phim trực tuyến với kho phim khổng lồ',
  keywords: ['blog', 'nextjs', 'seo', 'tutorial'],
  authors: [{ name: 'Anh Đức', url: 'https://yourdomain.com' }],
  creator: 'Anh Đức',
  publisher: 'Your Company',

  openGraph: {
    title: 'Chill Movies',
    description: 'Trang web xem phim trực tuyến với kho phim khổng lồ',
    url: 'https://yourdomain.com',
    siteName: 'Chill Movies',
    images: [
      {
        url: 'https://yourdomain.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Preview Chill Movies',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'My Blog - Learn Next.js',
    description: 'Hướng dẫn Next.js, SEO, và web dev',
    creator: '@your_twitter',
    images: ['https://yourdomain.com/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  alternates: {
    canonical: 'https://yourdomain.com',
    languages: {
      'vi-VN': 'https://yourdomain.com/vi',
      'en-US': 'https://yourdomain.com/en',
    },
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  metadataBase: new URL('https://yourdomain.com'),
}

export default function RootLayout({ children, params }: Readonly<{ children: React.ReactNode, params: { slug?: string }}>) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <Script
          id="ad-script"
          type='text/javascript' 
          src='https://pl27471772.profitableratecpm.com/3f/90/95/3f90956328c9d854501640734391bb15.js'
          strategy="afterInteractive" 
        />
      </head>
      <body className={`${robotoFont.variable} ${nosiferFont.variable} antialiased dark:bg-[#292929]`}>
        <Header />
        <ViewTransition key={params?.slug || 'root'}>
          {children}
        </ViewTransition>
      </body>
    </html>
  )
}
