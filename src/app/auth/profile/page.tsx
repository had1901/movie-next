
import React from 'react'
import ProfileClient from '@/components/protectedAuth/ProfileClient'
import { fetchVerifyRoute } from '@/libs/cookie'
import { redirect } from 'next/navigation'

// https://wallpapers-clan.com/wp-content/uploads/2023/08/attack-on-titan-sad-mikasa-sticker-preview.jpg


async function ProfilePage() {
    const user = await fetchVerifyRoute()
  console.log('ProfilePage run...', user)

    if(!user) redirect('/not-found')
    
    return (
      <ProfileClient user={user} />
    ) 
}


export default ProfilePage