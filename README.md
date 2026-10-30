# Creator Profile Monorepo

A modern, full-stack creator profile application built with React 19, TypeScript, Vite, Node.js, Express, and Docker, organized as an npm workspaces monorepo.

---

## 📁 Project Structure

```
creator-profile/
├── apps/
│   ├── client/                      # Frontend Application (React 19 + TypeScript + Vite)
│   │   ├── public/                  # Static assets (icons.svg, favicon.svg)
│   │   ├── src/
│   │   │   ├── assets/              # Static media & illustrations
│   │   │   ├── components/          # Reusable UI primitives (FilterTabs, LoadingSpinner)
│   │   │   ├── features/            # Feature-driven domain modules
│   │   │   │   └── profile/         # Profile feature (components, hooks, API, barrel export)
│   │   │   ├── styles/              # Global styles & layout
│   │   │   ├── App.tsx              # Root component
│   │   │   └── main.tsx             # Application entry point
│   │   ├── Dockerfile
│   │   ├── Dockerfile.dev
│   │   ├── nginx.conf
│   │   ├── package.json             # @creator-profile/client
│   │   ├── tsconfig.json            # Path alias configured (@/*)
│   │   └── vite.config.ts
│   │
│   └── server/                      # Backend API (Node.js + Express + TypeScript)
│       ├── src/
│       │   ├── config/              # Environment config
│       │   ├── controllers/         # Request handling & HTTP response mapping
│       │   ├── data/                # In-memory mock database (profilesDb)
│       │   ├── middleware/          # Request logger & error handlers
│       │   ├── routes/              # Express routers (/api/profiles)
│       │   ├── services/            # Profile business logic
│       │   ├── utils/               # Logger & utilities
│       │   ├── app.ts               # Express configuration
│       │   └── index.ts             # Server entry point (app.listen)
│       ├── Dockerfile
│       ├── Dockerfile.dev
│       ├── package.json             # @creator-profile/server
│       └── tsconfig.json
│
├── packages/
│   ├── types/                       # Shared TypeScript interfaces between client & server
│   │   ├── src/
│   │   │   └── index.ts             # Profile, Offering, Ratings, Badge, SocialLink
│   │   ├── package.json             # @creator-profile/types
│   │   └── tsconfig.json
│   │
│   └── styles/                      # Shared design tokens & foundation styles
│       ├── src/
│       │   ├── tokens.css           # CSS custom properties (colors, typography, radii)
│       │   ├── reset.css            # Base resets
│       │   └── index.css            # Styles entry point
│       └── package.json             # @creator-profile/styles
│
├── docker-compose.yml               # Multi-container orchestration
├── package.json                     # Root monorepo workspace scripts
└── README.md
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Both Client and Server Concurrently
```bash
npm run dev
```
- **Client**: [http://localhost:5173](http://localhost:5173)
- **Server**: [http://localhost:3001](http://localhost:3001)

### 3. Run Individual Apps
- **Frontend only**: `npm run dev:client`
- **Backend only**: `npm run dev:server`

---

## 🐳 Docker Deployment

To spin up both client and server in containers:
```bash
docker-compose up --build
```

---

## 🛠️ Root Workspace Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts both client (Vite) and server (Express) concurrently |
| `npm run dev:client` | Starts only the frontend Vite dev server |
| `npm run dev:server` | Starts only the backend Express dev server |
| `npm run build` | Builds all packages and apps across the workspace |
| `npm run typecheck` | Runs TypeScript checks across all packages |
| `npm run lint` | Runs Oxlint across the project |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/profiles/:username` | Returns profile metadata, bio, avatar, and badges |
| `GET` | `/api/profiles/:username/offerings` | Returns offerings / digital products / packages |
| `GET` | `/api/profiles/:username/ratings` | Returns aggregate ratings and testimonial reviews |
| `GET` | `/api/profiles/:username/categories` | Returns category filter list |
