'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton({ type }:{ type:string }) {
    const { pending } = useFormStatus()
    console.log('status', status)
    
  return (
    <button 
        type='submit' 
        disabled={pending}
        className=" w-full py-2 mt-6 bg-gray-200 rounded-lg hover:bg-gray-300 transition cursor-pointer"
    >
        {type === 'login' ? 
        pending ? 'Đang đăng nhập...' : 'Đăng nhập' : 
        pending ? 'Đang xử lý...' : 'Đăng ký'}
    </button>
  )
}

export default SubmitButton