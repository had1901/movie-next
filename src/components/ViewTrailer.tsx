'use client';

import React, { useState } from 'react'

function ViewTrailer() {
    const [open, setOpen] = useState<boolean>(false)
    const handleOpenView = () => {
      setOpen(true)
    }
  return (
    <div onClick={handleOpenView}>
      
    </div>
  )
}

export default ViewTrailer