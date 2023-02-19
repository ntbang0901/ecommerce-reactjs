import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import purify from 'dompurify'
import { getInfoSeller, getProduct } from '~/apis/product.api'
import useQuerString from '~/hooks/useQuerString'

function DetailProduct() {
  const params = useParams()
  const [product, setProduct] = useState(null)
  const [infoSeller, setInfoSeller] = useState(null)
  const [showMoreDesc, setShowMoreDesc] = useState(false)
  const queryClient = useQueryClient()

  const { spid } = useQuerString()

  const string = params.name.split('-p')

  const sp_id = string[string.length - 1].slice(0, -5)

  console.log(sp_id)

  const productQuery = useQuery({
    queryKey: ['productDetail', sp_id],
    queryFn: () => getProduct(sp_id),
    onSuccess: (data) => {
      setProduct(data.data)
    }
  })

  const seller_id = productQuery?.data?.data?.current_seller.id

  const infoSellerQuery = useQuery({
    queryKey: ['infoSeller', seller_id],
    queryFn: () => getInfoSeller(seller_id),
    onSuccess: (data) => {
      setInfoSeller(data.data.data.seller)
    }
  })

  const discount = Math.floor(((product?.original_price - product?.price) / product?.original_price) * 100)

  if (infoSellerQuery.isLoading)
    return <div className='flex  w-screen items-center justify-center text-2xl text-black'>Loading.....</div>

  return (
    <div className='text-black  md:container lg:mx-[200px]'>
      <div className='mt-3 flex flex-col gap-4 bg-white md:flex-row'>
        <div className='flex flex-col items-center justify-center p-3 md:basis-1/3'>
          <img className='cursor-pointer' width={444} height={444} src={product?.thumbnail_url} alt='aaa' />
          <div className='mt-3 grid hidden w-[444px] grid-cols-5  gap-3 md:grid'>
            {product?.images.slice(0, 4).map((image) => (
              <img key={image.thumbnail_url} src={image.thumbnail_url} alt={product?.name} />
            ))}
            <div className='flex items-center text-[11px]'>
              <span className='px-4 text-center'> xem thêm {product?.images.length - 4} ảnh</span>
            </div>
          </div>
          <div className='hidden md:block'>
            <p>Chia sẽ nhận xu </p>
            <img
              src='https://salt.tikicdn.com/cache/750x750/ts/product/17/a4/8c/fa2f565ad5baf30b9e39f3dca142d8fb.jpg.webp'
              alt='aaa'
            />
          </div>
        </div>
        <div className='py-4 px-3 md:basis-2/3 '>
          <div>
            {product?.brand && <p className='text-sm'>Thương hiệu : {product?.brand?.name}</p>}
            <span className='text-2xl'>{product?.name}</span>
            <div className='flex gap-2'>
              <div>
                <div className='flex'>
                  <span>{product?.rating_average}</span>
                  <img src='/images/star.svg' alt='star' />
                </div>
              </div>
              <span>(Xem {product?.review_count} đánh giá)</span>
              <span>{product?.quantity_sold.text}</span>
            </div>
          </div>
          <div className='flex flex-col xl:flex-row '>
            <div className='space-y-5 lg:basis-2/3'>
              <div className='flex items-center space-x-2 md:block'>
                <span className='text-[32px] font-semibold text-[#ff424e]'>{product?.price} đ</span>
                <span className='text-[14px]  line-through'>{product?.original_price} đ</span>
                <span className='border-[1px] border-[#ff424e] bg-[#ff424e]/20 text-[#ff3845]'>-{discount}%</span>
              </div>
              <div>
                <button className=''>
                  <a
                    className=' block rounded-md bg-[#ff3845]  px-12 py-3 text-center text-lg font-semibold text-white'
                    href='https://www.facebook.com'
                    target='_blank'
                    rel='noreferrer'
                  >
                    Mua ngay
                  </a>
                </button>
              </div>
            </div>
            <div className='p-4 shadow-md'>
              <div className='space-y-2'>
                <div className='flex items-center space-x-3'>
                  <img width={42} height={42} className='rounded-full' src={infoSeller?.icon} alt='logo_seller' />
                  <span>{infoSeller?.name}</span>
                </div>
                <div className='flex items-center gap-4'>
                  {infoSeller?.info.map((item) => (
                    <div key={item.type} className='flex flex-col  items-center justify-center'>
                      <span>{item.type === 'review' ? item.title + ' sao' : item.title}</span>
                      <span className='text-[14px]'>
                        {item.type === 'review' ? item.sub_title + ' đánh giá' : item.sub_title}
                      </span>
                    </div>
                  ))}
                </div>
                <div className='flex items-center  justify-center gap-4'>
                  <div className='flex items-center justify-center'>
                    <button className='rounded-sm border-[1px] border-[#3e96ff] px-2 py-1 text-sm text-[#3e96ff]'>
                      Xem shop
                    </button>
                  </div>
                  <div className='flex items-center justify-center'>
                    <button className='rounded-sm border-[1px] border-[#3e96ff] px-2 py-1 text-sm text-[#3e96ff]'>
                      Theo dỏi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`mt-3  bg-white p-3`}>
        <div className='mb-4 text-lg font-semibold underline'>Thông tin chi tiết</div>
        <div
          className={`${!showMoreDesc ? 'h-[200px] overflow-hidden' : ''}`}
          dangerouslySetInnerHTML={{ __html: purify.sanitize(product?.description) }}
        />
        <div className='flex items-center justify-center'>
          <button
            onClick={() => setShowMoreDesc(!showMoreDesc)}
            className='z-10 mt-5 rounded-sm border-[1px] border-[#3e96ff] px-2 py-1 text-sm text-[#3e96ff]'
          >
            {!showMoreDesc ? 'Xem thêm' : 'Thu gọn'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetailProduct
