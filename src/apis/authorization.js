import { apiHelper } from "../utils/helpers"

export default {
  // 帶入登入所需參數
  signIn({ email, password }) {
    // return a promise
    return apiHelper.post('/signin', {
      email,
      password
    })
  },
  signUp({ name, email, password, passwordCheck }) {
    return apiHelper.post('/signup', {
      name,
      email,
      password,
      passwordCheck
    })
  }
}