import axios from 'axios'
const lget = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))

  } catch (e) {
    console.log(e)
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
export { lget, lset, inst, baseUrl }
