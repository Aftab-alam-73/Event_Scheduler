
import React, { Suspense } from 'react'


const Availabiltylayout = ({children}) => {
  return (
    <div className='mx-auto'><Suspense fallback={<div>Loading availability....</div>}>
        {children}
        </Suspense></div>
  )
}

export default Availabiltylayout