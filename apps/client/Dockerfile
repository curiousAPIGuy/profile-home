# Build stage
FROM node:20-alpine AS build
WORKDIR /app

ARG VITE_USE_MOCK_API=false
ARG VITE_API_BASE_URL=/api
ENV VITE_USE_MOCK_API=$VITE_USE_MOCK_API
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY package*.json ./
COPY apps/client/package.json ./apps/client/
COPY packages/types/package.json ./packages/types/
COPY packages/styles/package.json ./packages/styles/

RUN npm ci

COPY packages/types ./packages/types
COPY packages/styles ./packages/styles
COPY apps/client ./apps/client

RUN npm run build -w @creator-profile/client

# Production stage
FROM nginx:alpine
COPY --from=build /app/apps/client/dist /usr/share/nginx/html
COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
