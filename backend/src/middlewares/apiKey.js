// backend/src/middlewares/apiKey.js
function apiKeyMiddleware(req, res, next) {
  //Permitir preflight CORS (no viene con x-api-key)
  if (req.method === "OPTIONS") return next();

  const apiKey = req.headers['x-api-key'];

  const validKeys = [
    process.env.API_KEY,       // clave general
    process.env.API_KEY_STATS  // clave exclusiva para /stats 
  ].filter(Boolean); // elimina undefined

  if (!apiKey || !validKeys.includes(apiKey)) {
    return res.status(401).json({ error: "API Key inválida" });
  }

  next();
}

module.exports = apiKeyMiddleware;
