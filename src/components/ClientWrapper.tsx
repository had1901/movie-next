import React, { ReactNode } from 'react'
import StreamingPlayer from './StreamingPlayer'

function ClientWrapper({ children }:{ children: ReactNode }) {

  return (
    <div>{children}</div>
  )
}

export default ClientWrapper