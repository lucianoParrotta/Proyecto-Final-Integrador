// src/routes/auth.js
const express = require("express");
const router = express.Router();

const { login, me } = require("../controllers/authController");
const verifyToken = require("../middlewares/auth");

// Login (solo requiere API Key)
router.post("/login", login);

// Perfil /me (requiere API Key + JWT)
router.get("/me", verifyToken, me);

module.exports = router;
