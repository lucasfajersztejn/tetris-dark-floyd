import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { login, register } from '../services/api'
import mainScreen from '../assets/images/main-screen.png'
import buttonTexture from '../assets/images/button-texture.png'

const AuthPage = ({ onSuccess }) => {
  const { loginUser } = useAuth()
  const [mode, setMode] = useState('login')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const data = mode === 'login'
        ? { email: form.email, password: form.password }
        : { username: form.username, email: form.email, password: form.password }

      const res = mode === 'login'
        ? await login(data)
        : await register(data)

      loginUser(res.data.user, res.data.token)
      onSuccess()
    } catch (err) {
      setError(err.response?.data?.message || 'Algo salió mal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${mainScreen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-80" />

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-sm px-8">

        <h1
          className="text-5xl font-bold uppercase tracking-widest text-center"
          style={{ color: '#C0392B', textShadow: '0 0 30px rgba(192,57,43,0.8)' }}
        >
          {mode === 'login' ? 'Entrar' : 'Registro'}
        </h1>

        <div className="flex gap-1 mb-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="w-8 h-4 bg-gray-700 border border-gray-600" />
          ))}
        </div>

        <div className="w-full flex flex-col gap-3">
          {mode === 'register' && (
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black border border-gray-600 text-white rounded focus:outline-none focus:border-red-600 tracking-widest"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-black border border-gray-600 text-white rounded focus:outline-none focus:border-red-600 tracking-widest"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="w-full px-4 py-3 bg-black border border-gray-600 text-white rounded focus:outline-none focus:border-red-600 tracking-widest"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm tracking-widest">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 text-white font-bold uppercase tracking-widest text-lg rounded transition-all hover:scale-105 hover:brightness-110 disabled:opacity-50"
          style={{
            backgroundImage: `url(${buttonTexture})`,
            backgroundSize: 'cover',
            border: '2px solid #C0392B',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
          }}
        >
          {loading ? 'Cargando...' : mode === 'login' ? 'Entrar' : 'Registrarse'}
        </button>

        <button
          onClick={() => {
            setMode(mode === 'login' ? 'register' : 'login')
            setError('')
          }}
          className="text-gray-500 hover:text-gray-300 text-sm uppercase tracking-widest transition-colors"
        >
          {mode === 'login' ? '¿No tenés cuenta? Registrate' : '¿Ya tenés cuenta? Entrá'}
        </button>

      </div>
    </div>
  )
}

export default AuthPage