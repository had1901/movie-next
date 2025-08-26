'use client'
import { useAuth } from '@/store/store'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

function FavoriteClient({ user }:{ user: any }) {
    const userContext = useAuth(state => state.user)
    const display = user ?? userContext  
    
    if(display) {
        return (
            <div className='p-8'>
                <h1 className='text-2xl'>Yêu thích</h1>
                <span>{display.displayName}</span>
            </div>
        )
    }
}

export default FavoriteClient