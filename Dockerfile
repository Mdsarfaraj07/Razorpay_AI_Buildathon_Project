# ==========================================
# Stage 1: Build Frontend & Server Bundle
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package definitions
COPY package*.json ./

# Install all dependencies (including devDependencies for esbuild & vite)
RUN npm install

# Copy source files
COPY . .

# Build Vite client and bundle server.ts with esbuild into dist/server.cjs
RUN npm run build

# ==========================================
# Stage 2: Production Minimal Runtime
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package definition and install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy compiled frontend and bundled server from builder stage
COPY --from=builder /app/dist ./dist

# Expose HTTP port (Render & Railway inject dynamic PORT at runtime)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/health || exit 1

# Start production server
CMD ["node", "dist/server.cjs"]
