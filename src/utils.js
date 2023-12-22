import axios from 'axios'
const lget = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    console.error(e)
  }
}
const baseUrl = 'https://mkpbackend-fe1c9f5599b1.herokuapp.com'
const lset = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}
const inst = (auth) => {
  const instance = axios.create()

  if (auth) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + lget('token')
  }

  return instance
}
const checkAuth = () => {
  if (!lget('token')) {
    return false
  }
  const tokenExpiry = lget('token_expiry')
  if (tokenExpiry) {
    const tokenExpiryDate = new Date(tokenExpiry)
    const currentDate = new Date()
    if (tokenExpiryDate < currentDate) {
      return false
    }
  }
  return true
}
export { lget, lset, inst, baseUrl, checkAuth }
