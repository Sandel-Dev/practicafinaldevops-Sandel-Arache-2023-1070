# ─── Etapa 1: Instalar dependencias ────────────────────────────────────────
FROM node:18-alpine AS deps

WORKDIR /app

# Copiar manifiestos primero (cache layer)
COPY package*.json ./

# Instalar solo dependencias de produccion
RUN npm ci --only=production

# ─── Etapa 2: Imagen final optimizada ──────────────────────────────────────
FROM node:18-alpine AS runner

WORKDIR /app

# Crear usuario sin privilegios para seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copiar dependencias desde etapa anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar codigo fuente
COPY src/ ./src/
COPY package.json ./

# Usar usuario sin privilegios
USER appuser

# Exponer puerto de la aplicacion
EXPOSE 3000

# Health check para Docker/Render
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Comando de inicio
CMD ["node", "src/app.js"]
