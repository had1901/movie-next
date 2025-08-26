/* eslint-disable @typescript-eslint/no-explicit-any */
import FavoriteClient from '@/components/user/FavoriteClient'
import React from 'react'
import PrivateRoute from '../_components/PrivateRoute'
import { getCookie, verifyRoute } from '@/libs/cookie'
import { redirect } from 'next/navigation'

async function FavoritePage() {
  const cookieHeader = await getCookie() as string
  const user = await verifyRoute(cookieHeader)
  
  if(!user) redirect('/')

  return (
    <FavoriteClient user={user} />
  )
}

export default FavoritePage