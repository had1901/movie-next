import React, { ReactNode, Suspense } from 'react'
import Sidebar from './_components/Sidebar'
import { redirect } from 'next/navigation'
import { fetchVerifyRoute, getCookie } from '@/libs/cookie'
import Particles from '@/components/service/Particles'
import GalaxyBackground from '@/components/service/GalaxyBackground'
import SolarSystem from '@/components/service/SolarSystem'



async function AccountLayout({ children }:{ children: ReactNode }) {
  console.log('Layout Auth')
  
  return (
    <>
      <div className='fixed inset-0'>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={300}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
      <div className='container mx-auto mt-28'>
          <div className="flex text-white gap-2">
              <Sidebar />
              <div className='relative flex-1 px-8'>
                <Suspense fallback={<div>Đang tải...</div>}>
                  {children}
                </Suspense>
              </div>
          </div>
      </div>
    </>
  )
}

export default AccountLayout