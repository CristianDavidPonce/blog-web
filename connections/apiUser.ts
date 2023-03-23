import axios from 'axios'

const apiUser = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
})

export default apiUser
