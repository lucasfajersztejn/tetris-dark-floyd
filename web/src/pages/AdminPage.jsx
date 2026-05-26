import { useState, useEffect } from 'react'
import mainScreen from '../assets/images/main-screen.png'
import buttonTexture from '../assets/images/button-texture.png'
import { useAuth } from '../context/useAuth'
import { getAllUsers, updateUser, getTopScores, deleteScore } from '../services/api'

const AdminPage = ({ onBack }) => {
  const { user } = useAuth()
  const [tab, setTab] = useState('users')
  const [users, setUsers] = useState([])
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => { loadData() }, [tab])

  const loadData = async () => {
    setLoading(true)
    setError('')
    try {
      if (tab === 'users') {
        const res = await getAllUsers()
        setUsers(res.data)
      } else {
        const res = await getTopScores()
        setScores(res.data)
      }
    } catch {
      setError('Error cargando datos')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleActive = async (u) => {
    try {
      await updateUser(u._id, { isActive: !u.isActive })
      setUsers(prev => prev.map(x => x._id === u._id ? { ...x, isActive: !x.isActive } : x))
    } catch {
      setError('Error actualizando usuario')
    }
  }

  const handleToggleRole = async (u) => {
    const newRole = u.role === 'admin' ? 'user' : 'admin'
    try {
      await updateUser(u._id, { role: newRole })
      setUsers(prev => prev.map(x => x._id === u._id ? { ...x, role: newRole } : x))
    } catch {
      setError('Error actualizando rol')
    }
  }

  const handleDeleteScore = async (id) => {
    try {
      await deleteScore(id)
      setScores(prev => prev.filter(s => s._id !== id))
    } catch {
      setError('Error eliminando score')
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start relative pt-12 pb-12"
      style={{ backgroundImage: `url(${mainScreen})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black opacity-85" />
      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-4xl px-8">

        <h1
          className="text-5xl font-bold uppercase tracking-widest"
          style={{ color: '#C0392B', textShadow: '0 0 30px rgba(192,57,43,0.8)' }}
        >
          Panel Admin
        </h1>

        <p className="text-gray-600 text-sm uppercase tracking-widest -mt-4">{user?.username}</p>

        <div className="flex gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="w-8 h-4 bg-gray-700 border border-gray-600" />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTab('users')}
            className={`px-6 py-2 text-sm uppercase tracking-widest rounded transition-colors ${tab === 'users' ? 'bg-red-600 text-white' : 'border border-gray-700 text-gray-500 hover:text-white'}`}
          >
            Usuarios
          </button>
          <button
            onClick={() => setTab('scores')}
            className={`px-6 py-2 text-sm uppercase tracking-widest rounded transition-colors ${tab === 'scores' ? 'bg-red-600 text-white' : 'border border-gray-700 text-gray-500 hover:text-white'}`}
          >
            Scores
          </button>
        </div>

        {error && <p className="text-red-500 text-sm uppercase tracking-widest">{error}</p>}

        {tab === 'users' && (
          <div className="w-full bg-black bg-opacity-60 border border-gray-700 rounded overflow-hidden">
            {loading ? (
              <p className="text-gray-600 text-center py-12 uppercase tracking-widest text-sm animate-pulse">Cargando...</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-gray-600 text-xs uppercase tracking-widest py-3 px-4 text-left">Usuario</th>
                    <th className="text-gray-600 text-xs uppercase tracking-widest py-3 px-4 text-left">Email</th>
                    <th className="text-gray-600 text-xs uppercase tracking-widest py-3 px-4 text-center">Rol</th>
                    <th className="text-gray-600 text-xs uppercase tracking-widest py-3 px-4 text-center">Estado</th>
                    <th className="text-gray-600 text-xs uppercase tracking-widest py-3 px-4 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                      <td className="py-3 px-4 text-white tracking-widest">
                        {u.username}
                        {u._id === user._id && <span className="ml-2 text-xs text-gray-600">(tú)</span>}
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-sm">{u.email}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-xs uppercase tracking-widest px-2 py-1 rounded ${u.role === 'admin' ? 'bg-red-900 text-red-300' : 'bg-gray-800 text-gray-400'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-xs uppercase tracking-widest ${u.isActive ? 'text-green-500' : 'text-red-500'}`}>
                          {u.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {u._id !== user._id && (
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => handleToggleRole(u)}
                              className="px-3 py-1 border border-gray-700 hover:border-red-800 text-gray-500 hover:text-red-400 text-xs uppercase tracking-widest rounded transition-colors"
                            >
                              {u.role === 'admin' ? 'Quitar admin' : 'Hacer admin'}
                            </button>
                            <button
                              onClick={() => handleToggleActive(u)}
                              className="px-3 py-1 border border-gray-700 hover:border-red-800 text-gray-500 hover:text-red-400 text-xs uppercase tracking-widest rounded transition-colors"
                            >
                              {u.isActive ? 'Desactivar' : 'Activar'}
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === 'scores' && (
          <div className="w-full bg-black bg-opacity-60 border border-gray-700 rounded overflow-hidden">
            {loading ? (
              <p className="text-gray-600 text-center py-12 uppercase tracking-widest text-sm animate-pulse">Cargando...</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-gray-600 text-xs uppercase tracking-widest py-3 px-4 text-left">Jugador</th>
                    <th className="text-gray-600 text-xs uppercase tracking-widest py-3 px-4 text-right">Score</th>
                    <th className="text-gray-600 text-xs uppercase tracking-widest py-3 px-4 text-right">Nivel</th>
                    <th className="text-gray-600 text-xs uppercase tracking-widest py-3 px-4 text-right">Líneas</th>
                    <th className="text-gray-600 text-xs uppercase tracking-widest py-3 px-4 text-right">Fecha</th>
                    <th className="text-gray-600 text-xs uppercase tracking-widest py-3 px-4 text-center">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map(s => (
                    <tr key={s._id} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                      <td className="py-3 px-4 text-white tracking-widest">{s.username}</td>
                      <td className="py-3 px-4 text-right font-bold text-red-500">{s.score.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right text-gray-400">{s.level}</td>
                      <td className="py-3 px-4 text-right text-gray-400">{s.lines}</td>
                      <td className="py-3 px-4 text-right text-gray-600 text-sm">{new Date(s.createdAt).toLocaleDateString('es-ES')}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleDeleteScore(s._id)}
                          className="px-3 py-1 border border-gray-700 hover:border-red-800 text-gray-500 hover:text-red-400 text-xs uppercase tracking-widest rounded transition-colors"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        <button
          onClick={onBack}
          className="mt-4 px-10 py-4 text-white font-bold uppercase tracking-widest text-lg rounded transition-all hover:scale-105 hover:brightness-110"
          style={{ backgroundImage: `url(${buttonTexture})`, backgroundSize: 'cover', border: '2px solid #C0392B', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
        >
          Volver
        </button>

      </div>
    </div>
  )
}

export default AdminPage