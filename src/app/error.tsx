'use client'
import React from 'react'

export default function Error({ error }:{ error: Error }) {
  return (
    <div className='text-red-600 text-6xl text-center'>Error {error.message}</div>
  )
}
