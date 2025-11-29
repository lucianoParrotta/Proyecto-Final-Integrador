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

module.exports = { login, me };
