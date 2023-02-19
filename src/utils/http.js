import axios from 'axios'

const http = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

export default http
