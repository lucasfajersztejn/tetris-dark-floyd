import { useState } from 'react'
import mainScreen from '../assets/images/main-screen.png'
import buttonTexture from '../assets/images/button-texture.png'
import { useAuth } from '../context/useAuth'
import { getMyScores, deleteMe } from '../services/api'
import { useEffect } from 'react'

const ProfilePage = ({ onBack, onDeleted }) => {
  const { user, logoutUser } = useAuth()
  const [scores, setScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    getMyScores()
      .then(res => setScores(res.data))
      .catch(() => setError('Error cargando scores'))
      .finally(() => setLoading(false))
  }, [])

  const bestScore = scores.length > 0 ? Math.max(...scores.map(s => s.score)) : 0
  const totalGames = scores.length
  const totalLines = scores.reduce((acc, s) => acc + s.lines, 0)
  const maxLevel = scores.length > 0 ? Math.max(...scores.map(s => s.level)) : 0

  const handleDeleteAccount = async () => {
    try {
      await deleteMe()
      logoutUser()
      onDeleted()
    } catch {
      setError('Error eliminando la cuenta')
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start relative pt-12 pb-12"
      style={{
        backgroundImage: `url(${mainScreen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-85" />

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-2xl px-8">

        <h1
          className="text-5xl font-bold uppercase tracking-widest"
          style={{ color: '#C0392B', textShadow: '0 0 30px rgba(192,57,43,0.8)' }}
        >
          Perfil
        </h1>

        <p className="text-gray-400 text-xl tracking-widest uppercase -mt-4">
          {user?.username}
        </p>
        <p className="text-gray-600 text-sm tracking-widest -mt-4">
          {user?.email}
        </p>

        <div className="flex gap-1">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="w-8 h-4 bg-gray-700 border border-gray-600" />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-black bg-opacity-60 border border-gray-700 rounded p-4 text-center">
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Mejor score</p>
            <p className="text-3xl font-bold" style={{ color: '#C0392B' }}>
              {bestScore.toLocaleString()}
            </p>
          </div>
          <div className="bg-black bg-opacity-60 border border-gray-700 rounded p-4 text-center">
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Partidas</p>
            <p className="text-3xl font-bold text-white">{totalGames}</p>
          </div>
          <div className="bg-black bg-opacity-60 border border-gray-700 rounded p-4 text-center">
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Líneas totales</p>
            <p className="text-3xl font-bold text-white">{totalLines}</p>
          </div>
          <div className="bg-black bg-opacity-60 border border-gray-700 rounded p-4 text-center">
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Nivel máximo</p>
            <p className="text-3xl font-bold text-white">{maxLevel}</p>
          </div>
        </div>

        {/* Historial de partidas */}
        <div className="w-full bg-black bg-opacity-60 border border-gray-700 rounded overflow-hidden">
          <p className="text-gray-600 text-xs uppercase tracking-widest px-4 py-3 border-b border-gray-700">
            Últimas partidas
          </p>
          {loading ? (
            <p className="text-gray-600 text-center py-8 text-sm animate-pulse uppercase tracking-widest">
              Cargando...
            </p>
          ) : scores.length === 0 ? (
            <p className="text-gray-600 text-center py-8 text-sm uppercase tracking-widest">
              No hay partidas todavía
            </p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-gray-600 text-xs uppercase tracking-widest py-2 px-4 text-right">Score</th>
                  <th className="text-gray-600 text-xs uppercase tracking-widest py-2 px-4 text-right">Nivel</th>
                  <th className="text-gray-600 text-xs uppercase tracking-widest py-2 px-4 text-right">Líneas</th>
                  <th className="text-gray-600 text-xs uppercase tracking-widest py-2 px-4 text-right">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {scores.map(s => (
                  <tr key={s._id} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                    <td className="py-2 px-4 text-right font-bold" style={{ color: '#C0392B' }}>
                      {s.score.toLocaleString()}
                    </td>
                    <td className="py-2 px-4 text-right text-gray-400">{s.level}</td>
                    <td className="py-2 px-4 text-right text-gray-400">{s.lines}</td>
                    <td className="py-2 px-4 text-right text-gray-600 text-sm">
                      {new Date(s.createdAt).toLocaleDateString('es-ES')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {error && <p className="text-red-500 text-sm uppercase tracking-widest">{error}</p>}

        {/* Botones */}
        <div className="flex gap-4 mt-2">
          <button
            onClick={onBack}
            className="px-10 py-4 text-white font-bold uppercase tracking-widest text-lg rounded transition-all hover:scale-105 hover:brightness-110"
            style={{
              backgroundImage: `url(${buttonTexture})`,
              backgroundSize: 'cover',
              border: '2px solid #C0392B',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            Volver
          </button>

          <button
            onClick={() => setConfirmDelete(true)}
            className="px-10 py-4 text-gray-600 font-bold uppercase tracking-widest text-lg rounded transition-all hover:scale-105 hover:text-red-500"
            style={{ background: 'transparent', border: '2px solid #333' }}
          >
            Eliminar cuenta
          </button>
        </div>

        {/* Confirmación eliminar */}
        {confirmDelete && (
          <div className="w-full bg-black bg-opacity-80 border border-red-900 rounded p-6 text-center flex flex-col gap-4">
            <p className="text-white uppercase tracking-widest">
              ¿Seguro? Tu cuenta se desactivará pero tus scores se conservan.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleDeleteAccount}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest rounded transition-colors"
              >
                Sí, eliminar
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-6 py-2 border border-gray-700 text-gray-500 hover:text-white font-bold uppercase tracking-widest rounded transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default ProfilePage