import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
})

// Interceptor: agrega el token a cada request automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const register = (data) => api.post('/auth/register', data)
export const login = (data) => api.post('/auth/login', data)
export const getMe = () => api.get('/auth/me')

// Scores
export const getTopScores = () => api.get('/scores')
export const getMyScores = () => api.get('/scores/me')
export const saveScore = (data) => api.post('/scores', data)

// Users (admin)
export const getAllUsers = () => api.get('/users')
export const updateUser = (id, data) => api.put(`/users/${id}`, data)
export const deleteUser = (id) => api.delete(`/users/${id}`)
export const deleteScore = (id) => api.delete(`/scores/${id}`)
export const deleteMe = () => api.delete('/users/me')

export default api