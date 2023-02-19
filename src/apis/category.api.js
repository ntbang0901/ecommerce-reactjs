import axios from 'axios'
const http = require('~/utils/http')

export const getCategories = () => axios.get('https://api.tiki.vn/raiden/v2/menu-config?platform=desktop')
