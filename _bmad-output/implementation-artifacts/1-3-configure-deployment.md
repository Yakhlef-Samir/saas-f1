# Story 1.3: Configure Deployment

Status: review

## Story
**As a** développeur,
**I want** le déploiement automatisé configuré,
**So that** les changements soient déployés automatiquement en production.

## Acceptance Criteria
- Frontend déployé sur Vercel avec preview branches
- Backend déployé sur Render avec auto-deploy
- Variables d'environnement configurées
- CORS configuré entre frontend et backend
- Un push sur `main` déclenche un déploiement automatique
- Le frontend accède au backend en production sans erreurs CORS

## Tasks / Subtasks
- [x] Task 1: Configure Vercel deployment for frontend
  - [x] Créer vercel.json (build Vite, SPA rewrites)
  - [x] Définir VITE_API_BASE_URL (Render backend)
  - [x] Déployer branche main
- [x] Task 2: Configure Render deployment for backend
  - [x] Créer render.yaml (build/start, autoDeploy, healthcheck)
  - [x] Déployer branche main
- [x] Task 3: Setup environment variables
  - [x] DATABASE_URL (Render, asyncpg)
  - [x] REDIS_URL (Upstash)
  - [x] SERVER_HOST, BACKEND_CORS_ORIGINS, SECRET_KEY
- [x] Task 4: Configure CORS between frontend/backend
  - [x] Ajouter domaine Vercel + localhost dans config backend
  - [x] Vérifier appel /health depuis frontend prod
- [x] Task 5: Setup automatic deployment on main push
  - [x] Auto-deploy Render (branch main)
  - [x] Auto-deploy Vercel (branch main)
- [x] Task 6: Verify production CORS access
  - [x] Tester /health depuis frontend déployé → OK

## Implementation Notes
- Frontend (Vercel)
  - Repo: saas-f1 / pitline-corner-frontend
  - vercel.json: build Vite (`npm run build`), output `dist`, rewrite SPA, env `VITE_API_BASE_URL=https://pitline-corner-backend.onrender.com/api/v1`
  - Types Node ajoutés pour tests (tsconfig.app.json) + test ESM-safe (fileURLToPath)
- Backend (Render)
  - Repo: pitline-corner-backend
  - render.yaml: build `pip install -r requirements.txt`, start `uvicorn app.main:app --host 0.0.0.0 --port 8000`, autoDeploy ON, healthCheckPath `/health`
  - Env vars (Render dashboard) : DATABASE_URL asyncpg, REDIS_URL Upstash (rediss), SECRET_KEY (forte), BACKEND_CORS_ORIGINS [Vercel + localhost], SERVER_HOST=https://pitline-corner-backend.onrender.com
  - SERVER_HOST typé str (plus de validation AnyHttpUrl) pour éviter l'erreur Pydantic en prod
- CORS
  - app/core/config.py inclut `https://pitline-corner-frontend.vercel.app` + localhost 3000/5173
  - Frontend appelle backend Render sans erreur CORS (test /health OK)
- Auto-deploy
  - Render: branche main auto
  - Vercel: branche main auto

## Verification
- Backend Render: https://pitline-corner-backend.onrender.com/health → {"status":"ok","message":"Pitline Corner Backend is healthy"}
- Frontend Vercel: build OK après correction test ESM/Node types
- API accessible depuis frontend prod sans CORS errors

## Files Changed (principal)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` → Story 1.3 en review
- `_bmad-output/implementation-artifacts/1-3-configure-deployment.md` (ce fichier)
- `pitline-corner-frontend/vercel.json`
- `pitline-corner-frontend/src/setup.test.ts`
- `pitline-corner-frontend/tsconfig.app.json`
- `pitline-corner-backend/render.yaml`
- `pitline-corner-backend/.env.example`
- `pitline-corner-backend/app/core/config.py`

## Next Steps
- Éventuel monitoring/CI (Story 1.4)
- Ajouter routes métiers backend + intégration frontend
