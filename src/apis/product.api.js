import axios from 'axios'
const http = require('~/utils/http')

export const getProducts = (category, page, limit, urlKey) =>
  axios.get('https://tiki.vn/api/personalish/v1/blocks/listings?include=advertisement&is_mweb=1&aggregations=2', {
    params: {
      limit,
      page,
      urlKey,
      category,
      categoryId: category
    }
  })

export const getProduct = (id) => axios.get(`https://tiki.vn/api/v2/products/${id}`)

export const getInfoSeller = (seller_id, spid) =>
  axios.get('https://tiki.vn/api/shopping/v2/widgets/seller?platform=desktop', {
    params: {
      seller_id,
      spid
    }
  })
