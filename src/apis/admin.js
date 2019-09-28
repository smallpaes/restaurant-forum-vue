import { apiHelper } from "../utils/helpers"

export default {
  categories: {
    get({ page }) {
      const searchParams = page ? new URLSearchParams({ page }) : 'page=0'
      return apiHelper.get(`/admin/categories?${searchParams.toString()}`)
    },
    create({ name }) {
      return apiHelper.post('/admin/categories', { name })
    },
    update({ categoryId, name }) {
      return apiHelper.put(`/admin/categories/${categoryId}`, { name })
    },
    delete({ categoryId }) {
      return apiHelper.delete(`/admin/categories/${categoryId}`)
    }
  },
  restaurants: {
    create({ formData }) {
      return apiHelper.post('/admin/restaurants', formData)
    },
    get({ page }) {
      const searchParams = new URLSearchParams({ page })
      return apiHelper.get(`/admin/restaurants?${searchParams.toString()}`)
    },
    getDetail({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`)
    },
    update({ restaurantId, formData }) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData)
    },
    delete({ restaurantId }) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`)
    }
  },
  users: {
    get({ page }) {
      const searchParams = new URLSearchParams({ page })
      return apiHelper.get(`/admin/users?${searchParams.toString()}`)
    },
    update({ userId }) {
      return apiHelper.put(`/admin/users/${userId}`)
    }
  }
}