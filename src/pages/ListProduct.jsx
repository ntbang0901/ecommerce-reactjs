import { useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useParams } from 'react-router-dom'
import { getCategoryFilter, getProducts } from '~/apis/product.api'
import ProductItem from '~/components/ProductItem'
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

  const queryString = useQuerString()

  const page = Number(queryString.page) || 1

  const productsQuery = useQuery({
    queryKey: ['products', key, page, id],
    queryFn: () => getProducts(id, page, 40, key),
    onSuccess: (data) => {
      setList(data.data.data)
      setDataFilter(data.data.filters)
    }
  })

  const serviceFilter = dataFilter.filter((item) => item.type === 'service')

  const handleSelectFilter = (data, index) => {
    if (data.type) {
      if (data.status) {
        data.status = false
      } else {
        data.status = true
      }
      dataFilter[index] = data
    } else {
      if (data.status) {
        data.status = false
      } else {
        data.status = true
      }
    }
    dataFilter.values[index] = data
    setDataFilter([...dataFilter])
  }

  const handleShowmore = (data, index) => {
    dataFilter[index] = data
    setDataFilter([...dataFilter])
  }

  console.log(productsQuery)

  if (productsQuery.isLoading)
    return <div className='flex  w-screen items-center justify-center text-2xl text-black'>Loading.....</div>

  return (
    <div className='text-black'>
      {/* mobile */}
      <FilterSideBarMobile
        serviceFilter={serviceFilter}
        dataFilter={dataFilter}
        handleSelectFilter={handleSelectFilter}
      />

      {/* desktop */}
      <div className=' space-x-3 p-3 md:flex'>
        <FilterSideBarDeskTop
          serviceFilter={serviceFilter}
          dataFilter={dataFilter}
          handleSelectFilter={handleSelectFilter}
          handleShowmore={handleShowmore}
        />
        <div className='basis-4/5'>
          <div className='grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5'>
            {list.map((item, index) => (
              <ProductItem key={item.thumbnail_url + index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListProduct
