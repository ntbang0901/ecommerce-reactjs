import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useParams } from 'react-router-dom'
import { searchApi } from '~/apis/search.api'
import Loading from '~/components/Loading'
import Products from '~/components/Products'
import useQuerString from '~/hooks/useQuerString'

function SearchResult() {
  const [list, setList] = useState([])
  const [dataFilter, setDataFilter] = useState([])
  const paramss = useParams()
  const [paging, setPaging] = useState({})
  const [params, setParams] = useState({})

  const location = useLocation()
  const queryString = useQuerString()
  console.log(location)
  const { q } = queryString
  const page = Number(queryString.page) || 1

  document.title = `Kết quả tìm kiếm với ${q}`

  const path = location.pathname + `?q=${q}`

  const searchQuery = useQuery({
    queryKey: ['search', page, q, params],
    queryFn: () => searchApi(40, page, q, params),
    onSuccess: (data) => {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 0)
      setList(data.data.data)
      setPaging(data.data.paging)
      setDataFilter(data.data.filters)
    }
  })

  if (searchQuery.isLoading) return <Loading />

  return (
    <div>
      <Products
        dataFilter={dataFilter}
        setDataFilter={setDataFilter}
        list={list}
        paging={paging}
        setParams={setParams}
        params={params}
        path={path}
      />
    </div>
  )
}

export default SearchResult
