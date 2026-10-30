# Build stage
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
COPY apps/server/package.json ./apps/server/
COPY packages/types/package.json ./packages/types/

RUN npm ci

COPY packages/types ./packages/types
COPY apps/server ./apps/server

RUN npm run build -w @creator-profile/server

# Production stage
FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
COPY apps/server/package.json ./apps/server/
COPY packages/types/package.json ./packages/types/

RUN npm ci --omit=dev -w @creator-profile/server

COPY --from=build /app/apps/server/dist ./apps/server/dist

WORKDIR /app/apps/server
EXPOSE 3001
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
