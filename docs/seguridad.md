## Seguridad Global — Proyecto Inventario

Este documento describe los mecanismos de seguridad implementados en el backend del proyecto Sistema de Gestión de Inventario.

## 2.2.1 — Middleware API_KEY
**Descripción**

Se implementó un middleware que verifica la presencia de una API Key válida en cada solicitud entrante.

La API Key debe viajar en el header:

x-api-key: <API_KEY>

La clave se define en el archivo .env:

API_KEY=mi_api_key_segura

Código del middleware (middlewares/apiKey.js)
```js
function apiKeyMiddleware(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "API Key inválida" });
  }

  next();
}

module.exports = apiKeyMiddleware;
```

**Rutas protegidas**

Todas las rutas bajo /api/* pasan por este middleware.

## 2.2.2 — Autenticación Básica (Login con JWT)

El proyecto utiliza un flujo de login con usuario y contraseña, definido en .env:
```ini
ADMIN_USER=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=jwt_super_secreto
```
**Endpoint de Login:**
```bash
POST /api/auth/login
```

**Body de ejemplo:**
```json
{
  "user": "admin",
  "password": "admin123"
}
```
**Respuesta correcta:**
```json
{
  "token": "<JWT_GENERADO>"
}
```
**Token en cada request**
Debe enviarse en:

Authorization: Bearer <token>
x-api-key: mi_api_key_segura

## 2.2.3 — Manejo Global de Errores

Todos los errores pasan a través del middleware errorHandler.js.

**Código**
```js
module.exports = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Error del servidor"
  });
};
```
**Ubicación en app.js**

Se coloca al final de todas las rutas.
```js
app.use(errorHandler);
```
## 2.2.4 — Documentación Postman

**Se incluye la colección:**

Seguridad_Global.postman_collection.json

**Contiene:**

Login

Rutas protegidas con:

API KEY

JWT

Ejemplos de errores

Respuestas estándar

Headers preconfigurados

El archivo permite probar toda la API sin configuración adicional.

## 2.2.5 — Protección de Rutas

El cliente envía API KEY → habilita acceso a la API.

El usuario hace login → recibe un JWT.

**Ejemplo de headers necesarios:**

x-api-key: mi_api_key_segura
Authorization: Bearer eyJh...
Content-Type: application/json