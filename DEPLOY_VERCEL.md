# Deploy en Vercel - Guía

## Pasos para desplegar el Frontend en Vercel

### 1. Preparar el proyecto
```bash
npm install
npm run build --prefix frontend
```

### 2. Crear cuenta en Vercel
- Ir a https://vercel.com
- Registrarse con GitHub (recomendado)
- Autorizar acceso al repositorio

### 3. Desplegar el Frontend
- En Vercel, clickear "New Project"
- Seleccionar el repositorio `Proyecto-Final-Integrador`
- Configurar:
  - **Framework Preset**: Vite
  - **Root Directory**: `frontend`
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`

### 4. Configurar Variables de Entorno
En Vercel, ir a **Settings > Environment Variables** y agregar:

```
VITE_API_URL = https://tu-backend-url.onrender.com/api
VITE_API_KEY = tu-api-key
```

### 5. Deploy
- Click en "Deploy"
- Vercel automáticamente:
  - Clonará el repositorio
  - Instalará dependencias
  - Ejecutará el build
  - Desplegará en una URL pública

### 6. Verificar el Deployment
- La URL estará disponible en el dashboard de Vercel
- Formato típico: `https://proyecto-final-integrador.vercel.app`

---

## Variables de Entorno Necesarias

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL del backend en producción | `https://tu-backend.onrender.com/api` |
| `VITE_API_KEY` | API Key para autenticación | `your-api-key` |

---

## Actualizar Deployment

Cada vez que hagas push a la rama `dev` (o la rama configurada en Vercel):
1. Vercel detecta automáticamente el push
2. Inicia un nuevo build
3. Si es exitoso, despliega la nueva versión

---

## Rollback (volver a versión anterior)

Si algo sale mal después de un deploy:
1. En Vercel Dashboard
2. Ir a "Deployments"
3. Seleccionar el deployment anterior
4. Click en "Redeploy"

---

## Troubleshooting

### Error: "Cannot find module"
- Verificar que todas las dependencias están en `package.json`
- Ejecutar `npm install` localmente

### Error: "VITE_API_URL is not defined"
- Verificar que las variables de entorno están configuradas en Vercel
- Usar el prefijo `VITE_` para variables de cliente

### Build falla
- Verificar el build log en Vercel
- Ejecutar `npm run build` localmente para reproducir el error

