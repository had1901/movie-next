import React, { ReactNode } from 'react'

function LabelSub({ icon, label }:{ icon: ReactNode, label: string}) {

  return (
    <span className='flex items-start gap-1 font-medium text-md mt-1'>
        <i>{icon}</i>
        <label>{label}</label>
    </span>
  )
}

export default LabelSub