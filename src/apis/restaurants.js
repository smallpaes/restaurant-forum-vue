import { apiHelper } from "../utils/helpers"

// get JWT from localStorage
const getToken = () => localStorage.getItem('token')

export default {
  getRestaurants({ page, categoryId }) {
    // create query string object
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/restaurants?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getRestaurant({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getFeeds() {
    return apiHelper.get('/restaurants/feeds', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTopRestaurants() {
    return apiHelper.get('/restaurants/top', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getDashboard({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}/dashboard`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}