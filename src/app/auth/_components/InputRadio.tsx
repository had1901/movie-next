'use client'
import React, { useState } from 'react'

const inputRadioList = [
  {
    value: 'doraemon',
    name: 'Doraemon'
  },
  {
    value: 'nobita',
    name: 'Nobita'

  },
  {
    value: 'shizuka',
    name: 'Shizuka'
  },
  {
    value: 'suneo',
    name: 'Suneo'
  },
  {
    value: 'chaien',
    name: 'Chaien'
  },
]
function InputRadio() {
    const [gender, setGender] = useState("doraemon")

  return (
        <>
            {inputRadioList.map((item, index) => (
                <label key={index} className="flex items-center gap-1 cursor-pointer">
                    <input
                        type="radio"
                        name="gender"
                        value={item.value}
                        checked={gender === item.value}
                        onChange={() => setGender(item.value)}
                        className='inline-block pt-[2px] pl-1'
                    />
                    <span className='inline-block pt-[2px] pl-1'>{item.name}</span>
                </label>
            ))}
        </>
  )
}

export default InputRadio