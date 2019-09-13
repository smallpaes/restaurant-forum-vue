import axios from "axios"
import Swal from "sweetalert2"

const baseURL = 'https://intense-ocean-54235.herokuapp.com/api'

const axiosInstance = axios.create({
  baseURL
})

// set request header before sent
axiosInstance.interceptors.request.use(
  config => {
    // retrieve token from localStorage
    const token = localStorage.getItem('token')
    // set token to header if exists
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  err => Promise.reject(err)
)

export const apiHelper = axiosInstance

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})