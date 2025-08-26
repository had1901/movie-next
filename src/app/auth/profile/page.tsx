/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import ProfileClient from '@/components/user/ProfileClient'
import { redirect } from 'next/navigation'
import { getCookie, verifyRoute } from '@/libs/cookie'

// https://wallpapers-clan.com/wp-content/uploads/2023/08/attack-on-titan-sad-mikasa-sticker-preview.jpg


async function ProfilePage() {
  const cookieHeader = await getCookie() as string
  const user = await verifyRoute(cookieHeader)
  
  if(!user) redirect('/')
  return (
    <ProfileClient user={user} />
  ) 
}


export default ProfilePage