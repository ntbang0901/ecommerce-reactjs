import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { getCategories } from '~/apis/category.api'

function Banner() {
  const [menu, setMenu] = useState([])

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    onSuccess: (data) => {
      setMenu(data?.data.menu_block.items)
    }
  })

  if (isLoading)
    return <div className='flex  w-screen items-center justify-center text-2xl text-black'>Loading.....</div>
  return (
    <div className='p-2 font-semibold text-[#141414] md:p-10'>
      <h2 className='mb-5 text-2xl'>{menu.title}</h2>
      <div className='flex flex-wrap items-center gap-4'>
        {menu.map((item) => {
          const string = item.link.split('/c')
          const id = string[1]
          const to = string[0].split('/')[3] + '/' + id
          return (
            <Link
              to={`/${to}`}
              state={{ id }}
              key={item.icon_url}
              className='flex cursor-pointer items-center justify-center space-x-1 rounded-md border border-[gray] p-2'
            >
              <img className='h-7 w-7' src={item.icon_url} alt={item.text} />
              <span>{item.text}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Banner
