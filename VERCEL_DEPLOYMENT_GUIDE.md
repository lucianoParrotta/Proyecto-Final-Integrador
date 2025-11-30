# 🚀 Guía de Deploy a Vercel - Frontend

**Responsable:** Camilo Dietrich (SGIG-27)

---

## Requisitos Previos

- ✅ Cuenta en [Vercel](https://vercel.com) (preferiblemente conectada con GitHub)
- ✅ Backend deployado en Render o similar (URL pública disponible)
- ✅ API Key generada para autenticación

---

## Paso 1: Preparar el Proyecto Localmente

```bash
# Verificar que todo compila correctamente
cd frontend
npm run build

# Debería generar la carpeta `dist` sin errores
```

---

## Paso 2: Conectar Vercel con GitHub

1. Ir a [https://vercel.com](https://vercel.com)
2. Click en **"New Project"**
3. Seleccionar **"Import Git Repository"**
4. Buscar y seleccionar `Proyecto-Final-Integrador`
5. Click en **"Import"**

---

## Paso 3: Configurar Build Settings

En la pantalla de configuración de Vercel, asegúrate de que esté así:

| Campo | Valor |
|-------|-------|
| **Framework Preset** | Vite |
| **Root Directory** | `frontend` |
| **Build Command** | `npm install --prefix frontend && npm run build --prefix frontend` |
| **Output Directory** | `frontend/dist` |
| **Install Command** | `npm install` |

---

## Paso 4: Configurar Variables de Entorno

1. En Vercel, ir a **Settings > Environment Variables**
2. Agregar las siguientes variables (reemplazar con valores reales):

```
VITE_API_URL = https://your-backend.onrender.com/api
VITE_API_KEY = your-api-key-here
```

**Importante:** Sin el prefijo `VITE_` NO funcionarán en el cliente.

---

## Paso 5: Deploy

1. Click en **"Deploy"**
2. Vercel comenzará automáticamente:
   - Clonación del repositorio
   - Instalación de dependencias
   - Build de la aplicación
   - Despliegue

3. Esperar a que termine (normalmente 2-5 minutos)

---

## Paso 6: Verificar el Deployment

✅ Una vez completado, Vercel proporcionará:
- **URL pública** (ej: `https://proyecto-final-integrador.vercel.app`)
- **Logs de build** (para debugging si algo falla)
- **Analytics** de performance

---

## Actualizaciones Automáticas

Cada vez que hagas push a la rama configurada en Vercel (por defecto `main` o `dev`):

```bash
git push origin feature/SGIG-27-deploy-frontend
# O después de mergear a dev:
git push origin dev
```

✅ Vercel **detecta automáticamente** el push y redeploya

---

## Troubleshooting

### ❌ Error: "Build failed"
1. Revisar los logs en Vercel (pestaña "Build Logs")
2. Reproducir el error localmente: `npm run build --prefix frontend`
3. Verificar que `typescript` compila sin errores

### ❌ Error: "VITE_API_URL is not defined"
```
Solución: Verificar que las variables de entorno están en Settings > Environment Variables
(No en archivos .env locales)
```

### ❌ Página muestra en blanco
1. Abrir DevTools (F12)
2. Revisar Console para errores
3. Verificar que la URL de API es correcta en las variables de entorno

### ❌ API calls fallan (CORS error)
1. Backend debe tener CORS habilitado
2. Verificar que `VITE_API_URL` apunta a la URL pública del backend
3. Revisar headers en las requests (debe incluir `x-api-key`)

---

## Rollback a Versión Anterior

Si algo sale mal después de un deploy:

1. En Vercel Dashboard → pestaña **Deployments**
2. Encontrar el deployment anterior (está arriba del actual)
3. Click en **"..."** → **"Redeploy"**
4. Vercel reconstruye y despliega esa versión

---

## URLs Útiles

- 🔗 **Vercel Dashboard**: https://vercel.com/dashboard
- 📚 **Documentación Vercel**: https://vercel.com/docs
- ⚙️ **Environment Variables**: https://vercel.com/docs/projects/environment-variables

---

## Checklist Final

- [ ] Frontend compila localmente sin errores (`npm run build`)
- [ ] Backend está en producción y accesible
- [ ] Variables `VITE_API_URL` y `VITE_API_KEY` están configuradas en Vercel
- [ ] Primera conexión a Vercel completada
- [ ] Deploy inicial exitoso
- [ ] Página carga correctamente en la URL pública
- [ ] Login funciona correctamente
- [ ] API calls hacia el backend funcionan

---

**¡Listo!** 🎉 Tu frontend está desplegado en Vercel y se actualiza automáticamente con cada push.
