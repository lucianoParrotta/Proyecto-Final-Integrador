const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
};

module.exports = { login };
