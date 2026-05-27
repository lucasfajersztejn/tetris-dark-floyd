import mainScreen from '../assets/images/main-screen.png'
import buttonTexture from '../assets/images/button-texture.png'
import { useAuth } from '../context/useAuth'

const HomePage = ({ onStart, onScores, onAuth, onLogout, onAdmin, onProfile }) => {
  const { user } = useAuth()

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: `url(${mainScreen})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60" />

      {/* Usuario logueado */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
        {user?.role === 'admin' && (
          <button
            onClick={onAdmin}
            className="px-4 py-2 border border-red-900 hover:border-red-600 text-red-800 hover:text-red-500 text-sm uppercase tracking-widest rounded transition-colors"
          >
            Admin
          </button>
        )}
        {user ? (
          <>
            <button
              onClick={onProfile}
              className="text-gray-400 hover:text-white text-sm tracking-widest uppercase transition-colors"
            >
              {user.username}
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 border border-gray-700 hover:border-red-800 text-gray-600 hover:text-red-500 text-sm uppercase tracking-widest rounded transition-colors"
            >
              Salir
            </button>
          </>
        ) : (
          <button
            onClick={onAuth}
            className="px-4 py-2 border border-gray-700 hover:border-red-800 text-gray-400 hover:text-red-500 text-sm uppercase tracking-widest rounded transition-colors"
          >
            Login
          </button>
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">

        <h1
          className="text-6xl font-bold tracking-widest uppercase text-center"
          style={{ color: '#C0392B', textShadow: '0 0 30px rgba(192,57,43,0.8)' }}
        >
          Tetris
        </h1>
        <h2 className="text-3xl font-light tracking-[0.5em] uppercase text-gray-300 -mt-6">
          Dark Floyd
        </h2>

        <p className="text-gray-400 text-sm tracking-widest uppercase mt-2">
          Another brick in the wall
        </p>

        <div className="flex flex-col items-center gap-3 mt-8">
          <button
            onClick={onStart}
            className="px-12 py-4 text-white font-bold uppercase tracking-widest text-lg rounded transition-all hover:scale-105 hover:brightness-110"
            style={{
              backgroundImage: `url(${buttonTexture})`,
              backgroundSize: 'cover',
              border: '2px solid #C0392B',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            Jugar
          </button>

          <button
            onClick={onScores}
            className="px-12 py-4 text-gray-400 font-bold uppercase tracking-widest text-lg rounded transition-all hover:scale-105 hover:text-white"
            style={{
              background: 'transparent',
              border: '2px solid #444',
            }}
          >
            Hall of Fame
          </button>
        </div>

        <div className="mt-4 text-gray-600 text-xs tracking-widest uppercase flex gap-8">
          <span>↑ Rotar</span>
          <span>← → Mover</span>
          <span>↓ Bajar</span>
          <span>Space Hard drop</span>
        </div>

      </div>
    </div>
  )
}

export default HomePage