import React from 'react'

function Loading() {
  return (
    <div className='flex h-56 w-full items-center justify-center rounded-lg border border-gray-200 '>
      <div className='animate-pulse rounded-full px-3 py-1 text-center text-[30px] font-medium leading-none text-[#d5451b] '>
        loading...
      </div>
    </div>
  )
}

export default Loading
