import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getCategoryFilter, getProducts } from '~/apis/product.api'
import ProductItem from '~/components/ProductItem'
import Products from '~/components/Products'
import useQuerString from '~/hooks/useQuerString'
import FilterSideBarDeskTop from './FilterSideBar/FilterSideBarDeskTop'
import FilterSideBarMobile from './FilterSideBar/FilterSideBarMobile'

const TYPE_FILTER = {
  service: 'Dịch vụ',
  price: 'Giá',
  category: 'Danh mục sản phẩm',
  rating: 'Đánh giá',
  brand: 'Thương hiệu',
  cloth_material: 'Chất liệu',
  fashion_pattern: 'Hoạ tiết',
  shirt_style: 'Kiểu dáng',
  gioi_tinh: 'Giới tính',
  option_color: 'Màu sắc',
  option_size_clothe: 'Kích cỡ',
  seller: 'Nhà cung cấp',
  filter_mobile_rom: 'ROM',
  filter_mobile_camera_sau: 'Camera sau',
  filter_mobile_camera_truoc: 'Camera trước',
  filter_mobile_ram: 'RAM',
  filter_mobile_man_hinh: 'Kích thước màn hình',
  filter_mobile_dungluong_pin: 'Dung lượng pin'
}

function ListProduct() {
  const [list, setList] = useState([])
  const [dataFilter, setDataFilter] = useState([])
  const { key, id } = useParams()
  const [paging, setPaging] = useState({})
  const [params, setParams] = useState({})

  const location = useLocation()
  const queryString = useQuerString()

  const page = Number(queryString.page) || 1

  const productsQuery = useQuery({
    queryKey: ['products', key, page, id, params],
    queryFn: () => getProducts(id, page, 40, key, params),
    onSuccess: (data) => {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 0)
      setList(data.data.data)
      setPaging(data.data.paging)
      setDataFilter(data.data.filters)
    }
  })

  const serviceFilter = dataFilter.filter((item) => item.type === 'service')

  const handleSelectFilter = (data, index) => {
    if (data.type) {
      if (data.values[0].selected) {
        delete params[data.query_name]
      } else {
        params[data.query_name] = data.values[0].query_value
      }
      setParams({ ...params })
    } else {
      if (data.values[index].selected) {
        const string = params[data.query_name].split(',')
        const index = string.indexOf((item) => item === data.values[index].query_value)
        string.splice(index, 1)
        params[data.query_name] = string.join(',')
      } else {
        params[data.query_name] = params[data.query_name]
          ? params[data.query_name] + ',' + data.values[index].query_value
          : data.values[index].query_value
      }
      setParams({ ...params })
    }
  }

  const handleShowmore = (data, index) => {
    dataFilter[index] = data
    setDataFilter([...dataFilter])
  }

  if (productsQuery.isLoading)
    return <div className='flex  w-screen items-center justify-center text-2xl text-black'>Loading.....</div>

  return (
    <Products
      list={list}
      dataFilter={dataFilter}
      paging={paging}
      setDataFilter={setDataFilter}
      params={params}
      setParams={setParams}
    />
    // <div className='text-black'>
    //   {/* mobile */}
    //   <FilterSideBarMobile
    //     serviceFilter={serviceFilter}
    //     dataFilter={dataFilter}
    //     handleSelectFilter={handleSelectFilter}
    //   />

    //   {/* desktop */}
    //   <div className=' space-x-3 p-3 md:flex'>
    //     <FilterSideBarDeskTop
    //       serviceFilter={serviceFilter}
    //       dataFilter={dataFilter}
    //       handleSelectFilter={handleSelectFilter}
    //       handleShowmore={handleShowmore}
    //     />
    //     <div className='basis-4/5 bg-white'>
    //       {list.length > 0 ? (
    //         <div>
    //           <div className=' mt-3 mb-2 flex items-end justify-end gap-2 md:mr-6'>
    //             {/* Help text */}
    //             <span className='text-sm text-gray-700 dark:text-gray-400'>
    //               <span className='font-semibold text-gray-900 '>{paging.current_page}</span> /
    //               <span className='font-semibold text-gray-900 '>{paging.last_page}</span>
    //             </span>
    //             <div className='xs:mt-0 mr-3   inline-flex items-center md:mr-10 '>
    //               {/* Buttons */}
    //               <Link
    //                 to={`${location.pathname}?page=${page > 1 && page - 1}`}
    //                 className='inline-flex items-center rounded-l text-sm font-medium text-gray-400'
    //               >
    //                 <svg
    //                   aria-hidden='true'
    //                   className='mr-2 h-5 w-5'
    //                   fill='currentColor'
    //                   viewBox='0 0 20 20'
    //                   xmlns='http://www.w3.org/2000/svg'
    //                 >
    //                   <path
    //                     fillRule='evenodd'
    //                     d='M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z'
    //                     clipRule='evenodd'
    //                   />
    //                 </svg>
    //               </Link>
    //               <Link
    //                 to={`${location.pathname}?page=${page < paging.last_page && page + 1}`}
    //                 className='inline-flex items-center rounded-r border-0 border-l  text-sm font-medium text-gray-400 '
    //               >
    //                 <svg
    //                   aria-hidden='true'
    //                   className='ml-2 h-5 w-5'
    //                   fill='currentColor'
    //                   viewBox='0 0 20 20'
    //                   xmlns='http://www.w3.org/2000/svg'
    //                 >
    //                   <path
    //                     fillRule='evenodd'
    //                     d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
    //                     clipRule='evenodd'
    //                   />
    //                 </svg>
    //               </Link>
    //             </div>
    //           </div>
    //           <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
    //             {list.map((item, index) => (
    //               <ProductItem key={item.thumbnail_url + index} item={item} />
    //             ))}
    //           </div>
    //           <div className='flex flex-col items-center'>
    //             <span className='text-sm text-gray-700 dark:text-gray-400'>
    //               Showing <span className='font-semibold text-gray-900 '>{paging.current_page}</span> to{' '}
    //               <span className='font-semibold text-gray-900 '> {paging.last_page}</span> of{' '}
    //               <span className='font-semibold text-gray-900 '> {paging.total} </span> Entries
    //             </span>
    //             <div className='xs:mt-0 mt-2 inline-flex'>
    //               <Link
    //                 to={`${location.pathname}?page=${page > 1 && page - 1}`}
    //                 className='rounded-l bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
    //               >
    //                 Prev
    //               </Link>
    //               <Link
    //                 to={`${location.pathname}?page=${page < paging.last_page && page + 1}`}
    //                 className='rounded-r border-0 border-l border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
    //               >
    //                 Next
    //               </Link>
    //             </div>
    //           </div>
    //         </div>
    //       ) : (
    //         <div className=' p-3 text-center text-2xl font-semibold'>Không tìm thấy sản phẩm</div>
    //       )}
    //     </div>
    //   </div>
    // </div>
  )
}

export default ListProduct
