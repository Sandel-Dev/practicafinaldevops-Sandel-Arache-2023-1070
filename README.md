# 🚀 Práctica Final DevOps — CI/CD con GitHub Actions

App web "Hola Mundo" con Node.js, Docker y pipeline CI/CD completo.

## 📁 Estructura del proyecto

```
mi-app-hola-mundo/
├── src/
│   └── app.js                        # Aplicación Express
├── tests/
│   └── app.test.js                   # Pruebas unitarias (Jest + Supertest)
├── .github/
│   └── workflows/
│       └── ci-cd.yml                 # Pipeline GitHub Actions
├── Dockerfile                        # Imagen Docker multi-stage
├── .dockerignore
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Requisitos previos

- Node.js 18+
- Docker Desktop
- Cuenta en [GitHub](https://github.com)
- Cuenta en [Docker Hub](https://hub.docker.com)
- Cuenta en [Render](https://render.com)

---

## 🏃 Ejecución local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Ejecutar la aplicación

```bash
npm start
# Visita: http://localhost:3000
```

### 3. Ejecutar pruebas unitarias

```bash
npm test
```

### 4. Construir y correr con Docker

```bash
# Build de la imagen
docker build -t hola-mundo-app .

# Correr el contenedor
docker run -p 3000:3000 hola-mundo-app

# Visita: http://localhost:3000
```

---

## 🔑 Configurar Secrets en GitHub

Ve a tu repositorio → **Settings → Secrets and variables → Actions → New repository secret**

| Secret | Descripción |
|--------|-------------|
| `DOCKERHUB_USERNAME` | Tu usuario de Docker Hub |
| `DOCKERHUB_TOKEN` | Access Token de Docker Hub (Account Settings → Security → New Access Token) |
| `RENDER_SERVICE_ID` | ID del servicio en Render (del deploy hook URL) |
| `RENDER_API_KEY` | API Key de Render (del deploy hook URL) |
| `RENDER_APP_NAME` | Nombre de tu app en Render (ej: `mi-app-hola-mundo`) |

---

## ☁️ Configurar Render

1. Crea una cuenta en [render.com](https://render.com)
2. **New → Web Service → Deploy an existing image**
3. Imagen: `TU_USUARIO/hola-mundo-app:latest`
4. Puerto: `3000`
5. Copia el **Deploy Hook URL** y extrae:
   - `RENDER_SERVICE_ID` → parte después de `/srv-` hasta el `?`
   - `RENDER_API_KEY` → valor del parámetro `?key=`

---

## 🔄 Pipeline CI/CD

Cada `git push` a `main` ejecuta automáticamente:

```
Push → 🧪 Tests → 🐳 Docker Hub → 🚀 Render (producción)
```

1. **Test**: Instala dependencias y ejecuta las pruebas unitarias
2. **Docker**: Si los tests pasan, construye y sube la imagen a Docker Hub
3. **Deploy**: Si el push a Docker fue exitoso, lanza el deploy en Render

---

## 🌐 Endpoints

| Ruta | Descripción |
|------|-------------|
| `GET /` | Responde con `{ message: "Hola Mundo!", status: "ok" }` |
| `GET /health` | Health check: `{ status: "healthy" }` |

---

## 📋 Comandos de referencia

```bash
# Ver logs del contenedor Docker
docker logs <container_id>

# Detener contenedor
docker stop <container_id>

# Ver imagenes locales
docker images

# Eliminar imagen local
docker rmi hola-mundo-app

# Push manual a Docker Hub
docker tag hola-mundo-app TU_USUARIO/hola-mundo-app:latest
docker push TU_USUARIO/hola-mundo-app:latest
```
