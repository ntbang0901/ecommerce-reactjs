import React from 'react'
import { Link } from 'react-router-dom'

function ProductItem({ item }) {
  return (
    <Link
      to={`/chitiet/${item.url_path.replace('/', '-')}`}
      className='flex cursor-pointer flex-col items-start rounded-md bg-slate-100 p-3'
    >
      <img
        className='rounded-md'
        src={item.thumbnail_url}
        width={item.thumbnail_width}
        height={item.thumbnail_height}
        alt=''
      />
      <div>
        <span className='min-h-[32px] text-sm line-clamp-2'>{item.name}</span>
        <p className='flex flex-wrap text-xs'>
          {item?.rating_average}
          <img src='/images/star.svg' alt='star' className='mr-1' />
          {item?.quantity_sold?.text}
        </p>
        <p className='text-red-600'>{item.price} đ</p>
        <div className='flex items-start gap-2 text-[9px] text-[#3e96ff] md:text-[10px] lg:text-[12px]'>
          <span className=' rounded-sm border-[1px] border-[#3e96ff]  p-[2px] '>Free ship</span>
          <span className=' rounded-sm border-[1px] border-[#3e96ff] p-[2px] '>Trả góp</span>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
