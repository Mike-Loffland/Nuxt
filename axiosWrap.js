import axios from 'axios'

const $axios = axios.create({
  baseURL: process.env.BASE_URL || 'https://blog-bb78a.firebaseio.com/',
})

export default $axios
