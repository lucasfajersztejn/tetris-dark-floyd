import { createContext, useState, useEffect } from 'react'
import { getMe } from '../services/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getMe()
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const loginUser = (userData, token) => {
    localStorage.setItem('token', token)
    setUser(userData)
  }

  const logoutUser = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}