'use client'
import { useLight } from '@/store/store'
import React, { MouseEventHandler, ReactNode, SetStateAction, useState } from 'react'

const ButtonVideoControl = ({ 
    title, 
    icon, 
    setTime, 
    onclick 
}:{ 
    title:string, 
    icon?:ReactNode, 
    setTime?:SetStateAction<number>, 
    onclick?:MouseEventHandler
}) => {
    const setLightGlobal = useLight(state => state.setLight)
    const [light, setLight] = useState(false)

    const handleChange = () => {
        setLight(!light)
        setLightGlobal()
    }


  return (
    <button 
        className={`${light ? 'bg-(--bg-main-color)/90 text-(--text-main-color) px-2 py-2 rounded' : ''} cursor-pointer flex items-center gap-1`} 
        onClick={onclick}
    >
        <i>{icon}</i>
        <span>{title}</span>
    </button>
  )
}

export default ButtonVideoControl