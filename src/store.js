import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from "./apis/users"
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      },
        state.isAuthenticated = true
      // save the token
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const { data, statusText } = await userAPI.getCurrentUser()
        // error handling
        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        // call setCurrentUser() to update state
        commit('setCurrentUser', {
          id: data.id,
          name: data.name,
          email: data.email,
          image: data.image,
          isAdmin: data.isAdmin
        })
        return true
      } catch (error) {
        commit('revokeAuthentication')
        return false
      }
    }
  }
})
