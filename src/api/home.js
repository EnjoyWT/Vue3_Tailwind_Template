import { POST } from '@/utils/request'

const API = {
  homeService: '/api/getuser'
}

export const homeService = (data = {}) => POST(API.homeService, data)
