function apiKeyMiddleware(req, res, next) {
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
