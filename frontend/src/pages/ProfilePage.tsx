import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, token } = useAuth();
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [editando, setEditando] = useState(false);
  const [nuevoPassword, setNuevoPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // --- Estado no autenticado (por si se entra directo a /perfil) ---
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-8 text-center max-w-md w-full">
          <h1 className="text-2xl font-semibold text-slate-800 mb-3">
            No autenticado
          </h1>
          <p className="text-slate-500 mb-6">
            Por favor inicia sesión primero para acceder a tu perfil.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full px-3 py-2 rounded-md bg-slate-900 text-sm font-medium text-white hover:bg-slate-800 transition"
          >
            Ir a Login
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCambiarPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (nuevoPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (nuevoPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

      const response = await fetch(`${apiUrl}/auth/cambiar-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_API_KEY || 'test-key',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          passwordActual: '',
          passwordNueva: nuevoPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error al cambiar contraseña');
      }

      setSuccess('Contraseña cambiada exitosamente');
      setNuevoPassword('');
      setConfirmPassword('');
      setEditando(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
    }
  };

  const loginDate = new Date(user.loginTime);
  const formattedLoginTime = loginDate.toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="space-y-6">
      {/* Header igual que Dashboard / Productos */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Mi Perfil</h1>
        <p className="text-slate-500 text-sm">
          Gestiona tu cuenta y configuración.
        </p>
      </div>

      {/* Alertas */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg px-4 py-3">
          {success}
        </div>
      )}

      {/* Información de usuario */}
      <section className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Información de Cuenta
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Detalles básicos de tu perfil.
            </p>
          </div>
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white text-xl font-semibold">
              {user.user.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="grid gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Usuario
            </label>
            <input
              type="text"
              value={user.user}
              disabled
              className="w-full px-3 py-2 rounded-md border border-slate-200 bg-slate-50 text-sm text-slate-700"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Última sesión
            </label>
            <input
              type="text"
              value={formattedLoginTime}
              disabled
              className="w-full px-3 py-2 rounded-md border border-slate-200 bg-slate-50 text-sm text-slate-700"
            />
          </div>
        </div>
      </section>

      {/* Seguridad / cambio de contraseña */}
      <section className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 md:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Seguridad</h2>
            <p className="text-slate-500 text-sm mt-1">
              Administra tu contraseña de acceso.
            </p>
          </div>
        </div>

        {!editando ? (
          <button
            onClick={() => setEditando(true)}
            className="px-3 py-2 rounded-md bg-slate-900 text-sm font-medium text-white hover:bg-slate-800 inline-flex items-center justify-center"
          >
            Cambiar contraseña
          </button>
        ) : (
          <form onSubmit={handleCambiarPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Nueva contraseña
              </label>
              <input
                type="password"
                value={nuevoPassword}
                onChange={(e) => setNuevoPassword(e.target.value)}
                placeholder="Ingresa tu nueva contraseña"
                className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Confirmar contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirma tu nueva contraseña"
                className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="px-3 py-2 rounded-md bg-emerald-600 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Guardar cambios
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditando(false);
                  setNuevoPassword('');
                  setConfirmPassword('');
                }}
                className="px-3 py-2 rounded-md border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Sesión */}
      <section className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 md:p-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Sesión</h2>
        <p className="text-slate-500 text-sm mb-4">
          Cierra tu sesión actual en el sistema.
        </p>
        <button
          onClick={() => setShowConfirmLogout(true)}
          className="px-3 py-2 rounded-md bg-red-500 text-sm font-medium text-white hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </section>

      {/* Modal de confirmación de logout */}
      {showConfirmLogout && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full overflow-hidden border border-slate-200">
            <div className="bg-red-500 text-white px-5 py-4">
              <h2 className="text-lg font-semibold">¿Cerrar sesión?</h2>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-slate-700">
                ¿Estás seguro de que deseas cerrar tu sesión actual?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmLogout(false)}
                  className="flex-1 px-3 py-2 rounded-md border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-3 py-2 rounded-md bg-red-500 text-sm font-medium text-white hover:bg-red-600"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
