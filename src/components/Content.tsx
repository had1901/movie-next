'use client';

import React, { useEffect, useRef } from 'react'

function Content({ content }:{ content: string }) {
     const contentRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.innerHTML = content;
        }
    },[content])
  return (
    <p ref={contentRef} className='text-[#c9c9c9] h-full text-sm mb-4 pb-4 text-shadow-heading text-justify overflow-y-auto scroll-none'></p>
  )
}

export default Content