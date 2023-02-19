import React from 'react'
import { useLocation } from 'react-router-dom'
import Banner from '~/components/Banner'
import Header from '~/components/Header'

function DefaultLayout({ children }) {
  return (
    <div className='relative h-[140vh] '>
      <Header />
      <main className='mt-[100px] h-screen w-screen '>{children}</main>
    </div>
  )
}

export default DefaultLayout
