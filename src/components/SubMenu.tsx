/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import React from 'react'

function SubMenu({ data, type }: { data: any, type: string }) {
  return (
    <div>
        <ul className="relative grid grid-cols-3 rounded-xl p-3 text-sm text-white z-30 overflow-hidden">
          <div className="absolute inset-0 bg-[#494949]/80 backdrop-blur-2xl z-[-1] rounded-xl" />
          {data.map((item:any, index:number) => (
            <li key={index} className="h-10 hover:opacity-70">
              <Link href={`/${type}/${item.slug}`} className="w-full h-full flex items-center whitespace-nowrap cursor-pointer">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
    </div>
  )
}

export default SubMenu