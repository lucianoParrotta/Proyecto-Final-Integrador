import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  user: string;
  loginTime: string;
}

const ProfilePage: React.FC = () => {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [editando, setEditando] = useState(false);
  const [nuevoPassword, setNuevoPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar datos del usuario del localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUsuario(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
      // Simulación de cambio de contraseña
      // En un caso real, esto iría a un endpoint backend
      setSuccess('Contraseña cambiada exitosamente');
      setNuevoPassword('');
      setConfirmPassword('');
      setEditando(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
    }
  };

  if (!usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Mi Perfil</h1>
          <p className="text-gray-600">Gestiona tu cuenta y configuración</p>
        </div>

        {/* Alertas */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {/* Información de Usuario */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Información de Cuenta</h2>
              <p className="text-gray-600 mt-1">Detalles de tu perfil</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                {usuario.user.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={usuario.user}
                disabled
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Última sesión
              </label>
              <input
                type="text"
                value={new Date(usuario.loginTime).toLocaleString()}
                disabled
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Cambiar Contraseña */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Seguridad</h2>
              <p className="text-gray-600 mt-1">Administra tu contraseña</p>
            </div>
          </div>

          {!editando ? (
            <button
              onClick={() => setEditando(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Cambiar Contraseña
            </button>
          ) : (
            <form onSubmit={handleCambiarPassword}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  value={nuevoPassword}
                  onChange={(e) => setNuevoPassword(e.target.value)}
                  placeholder="Ingresa tu nueva contraseña"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirma tu nueva contraseña"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditando(false);
                    setNuevoPassword('');
                    setConfirmPassword('');
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-lg transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Cerrar Sesión */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Sesión</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
