import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useParams } from 'react-router-dom'
import { searchApi } from '~/apis/search.api'
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
  const { q } = queryString
  const page = Number(queryString.page) || 1

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

  if (searchQuery.isLoading)
    return <div className='flex  w-screen items-center justify-center text-2xl text-black'>Loading.....</div>

  return (
    <div>
      <Products
        dataFilter={dataFilter}
        setDataFilter={setDataFilter}
        list={list}
        paging={paging}
        setParams={setParams}
        params={params}
      />
    </div>
  )
}

export default SearchResult
