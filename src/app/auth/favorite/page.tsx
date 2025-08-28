import FavoriteClient from '@/components/user/FavoriteClient'
import React from 'react'
import { fetchVerifyRoute } from '@/libs/cookie'
import { redirect } from 'next/navigation'

async function FavoritePage() {
  const user = await fetchVerifyRoute()
  
  if(!user) redirect('/not-found')
  return (
    <FavoriteClient user={user} />
  )
}

export default FavoritePage