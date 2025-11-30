// src/controllers/authController.js
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({ error: "Faltan datos (user y password)" });
  }

  const expectedUser = process.env.ADMIN_USER;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (user !== expectedUser || password !== expectedPassword) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const payload = {
    username: user,
    role: "admin",
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  return res.json({
    token,
    user: payload,
  });
};

const me = (req, res) => {
  // llega desde verifyToken
  return res.json({
    user: req.user,
  });
};

const cambiarPassword = (req, res) => {
  const { passwordActual, passwordNueva } = req.body;

  if (!passwordActual || !passwordNueva) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (passwordActual !== expectedPassword) {
    return res.status(401).json({ error: "Contraseña actual incorrecta" });
  }

  if (passwordNueva.length < 6) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
  }

  // En un sistema real, aquí actualizarías la contraseña en BD
  // Por ahora solo validamos que sea correcta
  // Para cambiar la contraseña en .env manualmente
  
  return res.json({
    message: "Contraseña cambiada exitosamente",
    nota: "En producción, actualizar ADMIN_PASSWORD en .env"
  });
};

module.exports = { login, me, cambiarPassword };