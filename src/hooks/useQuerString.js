import React from 'react'
import { useSearchParams } from 'react-router-dom'

function useQuerString() {
  const [searchParams] = useSearchParams()
  const searchParamsObject = Object.fromEntries([...searchParams])

  return searchParamsObject
}

export default useQuerString
