import axios from 'axios'

export const getKeywordSearchApi = (q) =>
  axios.get('https://tiki.vn/api/v2/search/suggestion?trackity_id=59290a78-a608-9dd8-8cea-44d739215be1', {
    params: {
      q
    }
  })

export const searchApi = (limit, page, q, params) =>
  axios.get('https://tiki.vn/api/v2/products?include=advertisement&aggregations=2', {
    params: {
      limit,
      page,
      ...params,
      q
    }
  })
