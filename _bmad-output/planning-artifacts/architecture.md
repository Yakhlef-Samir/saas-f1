
---
stepsCompleted: ['step-01-init', 'step-02-context', 'step-03-starter', 'step-04-decisions', 'step-05-patterns', 'step-06-structure', 'step-07-validation', 'step-08-complete']
inputDocuments: ['_bmad-output/planning-artifacts/prd.md']
workflowType: 'architecture'
project_name: 'saas-f1'
user_name: 'Samir'
date: '2026-01-12'
status: 'complete'
completedAt: '2026-01-15'
---

# Architecture Decision Document - Virtual Pit Wall

**Author:** Samir
**Date:** 2026-01-12
**Project:** saas-f1 (Virtual Pit Wall)

_Ce document se construit collaborativement à travers une découverte étape par étape. Les sections sont ajoutées au fur et à mesure que nous travaillons ensemble sur chaque décision architecturale._

---

## Analyse du Contexte Projet

### Vue d'Ensemble des Exigences

**Exigences Fonctionnelles (MVP Phase 1 : 0-6 mois) :**

Le Virtual Pit Wall est une plateforme SaaS B2C d'analyse stratégique post-course Formula 1. Les fonctionnalités essentielles incluent :

1. **Strategy Time Machine** (Killer Feature - Différenciation Critique)
   - Simulateur de scénarios "Et si..." pour pilotes sélectionnés
   - Sélection : pilote, tour d'arrêt, type de pneu
   - Visualisation interactive : position sortie stands vs trafic réel
   - Calcul : temps d'arrêt moyen + temps de sortie stands
   - **Implication Architecturale** : Moteur de simulation stratégique avec algorithmes de calcul complexes, cache pour optimisation performance

2. **Post-Race Analysis Dashboard**
   - Race Rewind interactif : carte circuit avec positions tour-par-tour
   - Live Timing historique : temps au tour, secteurs, écarts par pilote
   - État pneus (gomme, âge, arrêts stands) synchronisé
   - Navigation tour par tour fluide avec barre de lecture
   - **Implication Architecturale** : Gestion d'état complexe pour synchronisation multi-couches de données, visualisations D3.js performantes, chargement progressif des données

3. **Race Library**
   - Catalogue complet : ~24 courses saison 2024 + 5-10 courses emblématiques
   - Recherche et filtrage efficace
   - Intégration FastF1 pour accès données publiques légales
   - **Implication Architecturale** : Service d'ingestion et transformation données FastF1, stockage relationnel optimisé pour requêtes complexes, indexation pour recherche rapide

4. **Authentification & Monétisation**
   - Modèle freemium avec paywall stratégique
   - Tiers utilisateurs : Freemium (limité) / Pro / Elite
   - Intégration Stripe/PayPal pour abonnements
   - Gestion profils et sessions sécurisées
   - **Implication Architecturale** : Service d'authentification/autorisation avec gestion de permissions par tier, intégration paiements tierces, gestion webhooks Stripe

5. **Back-Office Simplifié MVP**
   - Monitoring système via outils SaaS tiers (Datadog/Sentry)
   - Analytics produit via Google Analytics + Mixpanel + Stripe dashboard
   - Support client via Zendesk/Intercom
   - Scripts CLI pour import/validation données courses (FastF1)
   - **Implication Architecturale** : Intégrations légères avec services tiers, pas de back-office custom pour MVP (développé Phase 2)

**Exigences Non-Fonctionnelles Critiques :**

1. **Performance**
   - Simulations complexes (recalcul course complète) : < 5 secondes
   - Simulations simples (position sortie stands) : 2-3 secondes
   - Chargement initial SPA : < 3s desktop, < 5s mobile 4G
   - Navigation Race Rewind : < 500ms entre tours
   - **Impact Architectural** : Cache Redis obligatoire, optimisation algorithmes simulation, lazy loading composants, CDN pour assets statiques

2. **Fiabilité & Disponibilité**
   - Exactitude données : 99.9% (avec disclaimer sources publiques)
   - Uptime production : 99.9% (43min downtime/mois maximum)
   - Source données : FastF1 (données officielles publiques)
   - **Impact Architectural** : Architecture résiliente avec gestion d'erreurs robuste, monitoring proactif, validation données à l'ingestion, fallback manual si FastF1 indisponible

3. **Scalabilité**
   - MVP : 500-1 000 utilisateurs simultanés
   - Architecture horizontalement scalable pour croissance future
   - Gestion pics post-GP (lundi/mardi suivant course)
   - **Impact Architectural** : Cloud-native avec auto-scaling, stateless API design, cache distribué (Redis), load balancing

4. **Accessibilité**
   - Conformité WCAG 2.1 Level AA obligatoire
   - Navigation complète au clavier
   - Contrastes couleurs conformes
   - Textes alternatifs pour visualisations
   - **Impact Architectural** : Tests accessibilité automatisés intégrés CI/CD (axe-core, Lighthouse), support lecteurs d'écran dans composants UI

5. **Support Multi-Plateformes**
   - Navigateurs desktop : Chrome, Firefox, Edge, Safari (2 dernières versions)
   - Navigateurs mobile : Safari iOS, Chrome Android (2 dernières versions) - **CRUCIAL**
   - Responsive design : Mobile (320px+), Tablet (768px+), Desktop (1024px+)
   - **Impact Architectural** : SPA responsive-first, tests cross-browser automatisés, PWA potentiellement pour expérience mobile améliorée

6. **SEO & Discoverabilité**
   - Landing pages et site marketing : SEO critique avec SSR/pré-rendu
   - Pages éducatives publiques : potentiel viral pour acquisition organique
   - Application authentifiée : pas d'optimisation SEO
   - **Impact Architectural** : Architecture hybride SSR (landing) + SPA (app), meta-tags dynamiques, sitemap XML, structured data

### Échelle & Complexité

**Évaluation Globale :**
- **Niveau de Complexité** : **Moyenne à Élevée**
- **Domaine Technique Principal** : Full-Stack Web Application (SPA + REST API + Data Processing)
- **Type de Projet** : SaaS B2C avec modèle freemium
- **Contexte** : Greenfield (nouveau projet sans legacy)
- **Composants Architecturaux Estimés** : 8-10 composants majeurs

**Indicateurs de Complexité :**

| Dimension | Niveau | Justification |
|-----------|--------|---------------|
| **Visualisations Données** | Élevé | D3.js pour graphiques interactifs complexes, synchronisation multi-couches |
| **Logique Métier** | Moyen-Élevé | Moteur simulation stratégique avec algorithmes calcul temps, positions, trafic |
| **Gestion État** | Élevé | State management complexe pour simulations, replay interactif, sessions |
| **Intégrations Externes** | Moyen | FastF1 (données), Stripe/PayPal (paiements), outils SaaS tiers (monitoring, analytics, support) |
| **Performance** | Élevé | Contraintes strictes (< 5s simulations, < 500ms navigation), cache distribué requis |
| **Temps Réel** | Faible (MVP) | Pas de WebSockets/SSE pour MVP - réservé Phase Vision (18+ mois) |
| **Multi-Tenancy** | Faible | Pas de séparation données stricte par tenant, simple gestion tiers utilisateurs |
| **Conformité Réglementaire** | Faible | Pas de RGPD complexe, pas de healthcare/fintech regulations |
| **Volume Données** | Moyen | ~24-34 courses avec télémétrie détaillée, données historiques FastF1 |

### Contraintes Techniques & Dépendances

**Contraintes Architecturales Confirmées :**

1. **Architecture SPA Obligatoire**
   - Justification : Killer features (Strategy Time Machine, Race Rewind) exigent transitions instantanées sans rechargement
   - Frameworks recommandés : React, Vue.js ou Svelte
   - Conséquence : Gestion état complexe, routing client-side, code splitting pour performance

2. **Source Données Unique : FastF1**
   - Contrainte légale : Élimination risque FOM en utilisant uniquement données publiques
   - Pivot stratégique : Post-race/éducatif (pas de live timing pour MVP)
   - Dépendance critique : Fiabilité FastF1 library Python
   - Conséquence : Service backend dédié ingestion/transformation données, validation qualité, fallback manual

3. **Pas de Temps Réel pour MVP**
   - WebSockets/SSE réservés Phase Vision (18+ mois) pour Virtual Pit Wall LIVE
   - MVP utilise données historiques chargées à la demande
   - Conséquence : Architecture simplifiée, polling léger ou push notifications standard suffisants

4. **SEO Hybride**
   - Landing pages et pages éducatives publiques : SEO critique (SSR/pré-rendu)
   - Application authentifiée : sans optimisation SEO
   - Conséquence : Architecture hybride avec routing distinct public/privé

5. **Mobile Crucial**
   - Target user "Data-Driven Enthusiast" utilise second écran (tablette/smartphone) pendant analyse
   - Support mobile non-négociable pour engagement
   - Conséquence : Responsive design mobile-first, adaptations UX spécifiques petits écrans

**Dépendances Technologiques Identifiées :**

- **Frontend** : React/Vue.js + TypeScript + Tailwind CSS + D3.js/Recharts
- **Backend** : Node.js/Express OU Python/FastAPI (à décider selon expertise équipe)
- **Database** : PostgreSQL (données relationnelles) + Redis (cache performances)
- **Build Tool** : Vite (performances dev optimales)
- **Data Source** : FastF1 Python library
- **Payments** : Stripe/PayPal SDK
- **Hosting** : Vercel/Netlify (frontend) + AWS/GCP (backend/DB)
- **Monitoring** : Datadog/Sentry (tiers SaaS)
- **Analytics** : Google Analytics + Mixpanel + Stripe dashboard
- **Support** : Zendesk/Intercom (tiers SaaS)

### Préoccupations Transversales Identifiées

Les concerns suivants affectent plusieurs composants et nécessitent des décisions architecturales cohérentes :

1. **Data Visualization & Interactivité**
   - Impact : Frontend (composants D3.js), API (endpoints données), Cache (optimisation)
   - Décisions requises : Librairie visualisation (D3.js vs Recharts), patterns composants réutilisables, gestion événements interactifs

2. **State Management Complexe**
   - Impact : Frontend (Redux/Zustand/Pinia), simulations, Race Rewind
   - Décisions requises : Architecture state (centralisé vs distribué), persistence état, optimistic UI updates

3. **Stratégie de Cache Multi-Niveaux**
   - Impact : Redis (serveur), LocalStorage (client), HTTP caching (CDN)
   - Décisions requises : Politique invalidation cache, TTL par type données, stratégie warm-up cache

4. **Authentication & Authorization**
   - Impact : API (middleware), Frontend (routing protégé), Database (permissions)
   - Décisions requises : JWT vs sessions, refresh tokens, authorization pattern (RBAC/ABAC), gestion tiers utilisateurs

5. **Payment Processing & Subscription Management**
   - Impact : Backend (webhooks Stripe), Database (état abonnements), Frontend (paywall)
   - Décisions requises : Flow abonnement, gestion webhooks Stripe (succès/échec/annulation), réconciliation paiements

6. **Data Pipeline FastF1**
   - Impact : Service ingestion, Database (schema), API (endpoints données courses)
   - Décisions requises : Fréquence ingestion, validation données, gestion erreurs source, format stockage optimisé

7. **Responsive Design & Mobile-First**
   - Impact : Frontend (tous composants), visualisations (adaptations), UX (simplifications mobile)
   - Décisions requises : Breakpoints, adaptations visualisations complexes pour petits écrans, gestures tactiles

8. **Accessibility (WCAG 2.1 AA)**
   - Impact : Frontend (tous composants), Design System, tests
   - Décisions requises : Bibliothèque composants accessibles, stratégie alt-text pour visualisations, navigation clavier

9. **Monitoring & Observability**
   - Impact : Backend (logging), Infrastructure (métriques), Frontend (error tracking)
   - Décisions requises : Stratégie logging structuré, alertes proactives, distributed tracing si microservices

10. **Error Handling & Resilience**
    - Impact : Frontend (UI errors), API (retry logic), Data pipeline (fallback)
    - Décisions requises : Patterns retry, circuit breakers, graceful degradation, user-facing error messages

---

## Évaluation des Starter Templates

### Domaine Technologique Principal

**Full-Stack Web Application** avec architecture Multi-Repo :
- **Frontend** : SPA React avec visualisations de données interactives
- **Backend** : API REST Python pour ingestion données FastF1 et moteur de simulation

### Préférences Techniques Établies

**Frontend :**
- Framework : React (expérience équipe)
- Langage : TypeScript
- Styling : Tailwind CSS
- Build Tool : Vite
- Déploiement : Vercel

**Backend :**
- Framework : FastAPI (nouveau pour l'équipe - apprentissage)
- Langage : Python 3.11+
- Database : PostgreSQL + Redis
- Conteneurisation : Docker
- Déploiement : Render (free tier → scaling payant)

**Architecture :** Multi-Repo (frontend et backend séparés)

### Options de Starters Évaluées

#### Frontend : Vite + React + TypeScript + Tailwind CSS

**Options Considérées :**

1. **Template Officiel Vite `react-ts` + Tailwind Manuel** ⭐ **SÉLECTIONNÉ**
   - Source : [Vite Official Guide](https://vite.dev/guide/)
   - Avantages : Configuration minimale officielle, contrôle total, documentation exhaustive
   - Stack : React 18+, TypeScript, ESLint, Hot Module Replacement
   - Tailwind ajouté manuellement en 2 commandes

2. **Templates GitHub pré-configurés Tailwind**
   - Exemples : [oluqom/typescript-react-tailwind-vite](https://github.com/oluqom/typescript-react-tailwind-vite), [PDMLab/vite-react-typescript-tailwind-starter](https://github.com/PDMLab/vite-react-typescript-tailwind-starter)
   - Rejeté : Moins de contrôle, maintenance incertaine, configuration opaque

**Rationale du Choix :**
Le template officiel Vite garantit une base stable et maintenue, avec flexibilité maximale pour ajouter les librairies spécifiques au projet (D3.js, Zustand, etc.). L'ajout manuel de Tailwind CSS est trivial et permet de comprendre la configuration.

#### Backend : FastAPI Production-Ready Boilerplate

**Options Considérées :**

1. **benavlabs/FastAPI-boilerplate** ⭐ **SÉLECTIONNÉ**
   - Source : [benavlabs/FastAPI-boilerplate](https://github.com/benavlabs/FastAPI-boilerplate)
   - Documentation : [FastAPI Boilerplate Docs](https://benavlabs.github.io/FastAPI-boilerplate/)
   - Avantages : "Batteries-included", utilisé en production SaaS réelles, documentation claire
   - Stack : FastAPI + SQLAlchemy 2.0 + PostgreSQL + Redis + Pydantic V2 + Docker Compose
   - Modules optionnels : Authentication, Caching, Background Tasks

2. **Official FastAPI Full Stack Template**
   - Source : [Full Stack FastAPI Template](https://fastapi.tiangolo.com/project-generation/)
   - Créé par @tiangolo (créateur FastAPI)
   - Rejeté : Plus complexe (inclut frontend), configuration Traefik overkill pour MVP

3. **teamhide/fastapi-boilerplate**
   - Source : [teamhide/fastapi-boilerplate](https://github.com/teamhide/fastapi-boilerplate)
   - "Real world production" avec permissions system
   - Rejeté : Moins de documentation, architecture plus rigide

**Rationale du Choix :**
benavlabs/FastAPI-boilerplate offre le meilleur équilibre entre fonctionnalités production-ready et simplicité pour une équipe débutant avec Python backend. La documentation détaillée et les modules optionnels permettent un apprentissage progressif.

### Starters Sélectionnés

#### Frontend : Vite React TypeScript + Tailwind CSS

**Commandes d'Initialisation :**

```bash
# 1. Créer le projet React + TypeScript avec Vite
npm create vite@latest virtual-pit-wall-frontend -- --template react-ts

# 2. Naviguer dans le projet
cd virtual-pit-wall-frontend

# 3. Installer les dépendances
npm install

# 4. Installer Tailwind CSS et ses dépendances
npm install -D tailwindcss postcss autoprefixer

# 5. Générer les fichiers de configuration Tailwind
npx tailwindcss init -p

# 6. Configurer Tailwind dans tailwind.config.js
# Ajouter : content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]

# 7. Ajouter les directives Tailwind dans src/index.css
# @tailwind base;
# @tailwind components;
# @tailwind utilities;

# 8. Lancer le serveur de développement
npm run dev
```

**Décisions Architecturales Établies par le Starter :**

**Langage & Runtime :**
- TypeScript 5+ avec configuration stricte
- React 18+ avec hooks et Concurrent Mode
- Node.js 18+ (LTS) requis
- Configuration tsconfig.json optimisée pour React

**Build Tooling :**
- Vite 5+ comme bundler et dev server
- Rollup pour production builds optimisés
- Hot Module Replacement (HMR) pour développement rapide
- Code splitting automatique
- Tree shaking et minification

**Styling Solution :**
- Tailwind CSS 3+ avec PostCSS
- Configuration responsive design intégrée
- Purge CSS automatique pour production
- Utility-first CSS approach

**Code Organization :**
```
src/
├── assets/          # Images, fonts, static files
├── components/      # React components réutilisables
├── pages/           # Page-level components
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── services/        # API calls et services externes
├── types/           # TypeScript type definitions
├── App.tsx          # Root component
└── main.tsx         # Entry point
```

**Development Experience :**
- ESLint avec règles React recommandées
- Support TypeScript natif dans VSCode
- Fast Refresh pour préservation de l'état React
- Import aliases configurables
- Environment variables via `.env` files

**Testing Framework (À Ajouter) :**
- Vitest (compatible Vite) pour unit tests
- React Testing Library pour component tests
- Playwright ou Cypress pour E2E tests

**Librairies Additionnelles à Installer (MVP) :**
```bash
# State Management
npm install zustand

# Data Visualization
npm install d3 @types/d3
# OU
npm install recharts

# Routing
npm install react-router-dom

# API Client
npm install axios

# Forms (si nécessaire)
npm install react-hook-form zod
```

---

#### Backend : benavlabs/FastAPI-boilerplate

**Commandes d'Initialisation :**

```bash
# 1. Cloner le boilerplate
git clone https://github.com/benavlabs/FastAPI-boilerplate.git virtual-pit-wall-backend

# 2. Naviguer dans le projet
cd virtual-pit-wall-backend

# 3. Supprimer l'historique Git d'origine et initialiser nouveau repo
rm -rf .git
git init

# 4. Copier et configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec tes configurations (DB credentials, secrets, etc.)

# 5. Lancer avec Docker Compose (développement)
docker-compose up -d

# 6. Vérifier que l'API fonctionne
# http://localhost:8000/docs (Swagger UI automatique)

# 7. Créer les migrations DB initiales (si modifications du schéma)
docker-compose exec backend alembic revision --autogenerate -m "Initial migration"
docker-compose exec backend alembic upgrade head
```

**Décisions Architecturales Établies par le Starter :**

**Langage & Runtime :**
- Python 3.11+ (dernière version stable)
- FastAPI 0.100+ (framework async moderne)
- Pydantic V2 pour validation données et serialization
- Uvicorn comme ASGI server (production-ready)

**Database & ORM :**
- SQLAlchemy 2.0 avec async support
- PostgreSQL 15+ comme database principale
- Alembic pour migrations de schéma
- Redis pour caching et background tasks (Celery)

**Project Structure :**
```
app/
├── api/
│   ├── dependencies/    # Dependency injection
│   ├── endpoints/       # Route handlers
│   └── middleware/      # Custom middleware
├── core/
│   ├── config.py        # Settings & configuration
│   ├── security.py      # Auth & encryption
│   └── database.py      # DB connection
├── models/              # SQLAlchemy models
├── schemas/             # Pydantic schemas (validation)
├── services/            # Business logic
├── repositories/        # Data access layer
├── utils/               # Utility functions
├── tests/               # Unit & integration tests
└── main.py              # Application entry point
```

**Architecture Pattern :**
- **Layered Architecture** : API → Service → Repository → Model
- **Dependency Injection** : FastAPI's Depends pour testabilité
- **Separation of Concerns** : Business logic isolée des routes
- **Repository Pattern** : Abstraction de l'accès aux données

**Authentication & Security :**
- JWT (JSON Web Tokens) pour authentication
- OAuth2 avec Password Flow
- Password hashing avec bcrypt
- CORS middleware pré-configuré
- Rate limiting support

**API Documentation :**
- Swagger UI automatique (`/docs`)
- ReDoc alternative (`/redoc`)
- OpenAPI 3.0 schema auto-généré

**Development Experience :**
- Docker Compose pour développement local
- Hot reload avec Uvicorn `--reload`
- pytest pour testing avec fixtures
- Black + isort pour code formatting
- mypy pour type checking statique
- pre-commit hooks configurables

**Caching & Background Tasks :**
- Redis intégré pour caching
- Celery pour tasks asynchrones (emails, data processing)
- Support pour job queues

**Database Migrations :**
- Alembic pré-configuré
- Migrations auto-generées depuis models
- Version control pour schéma DB

**Environment Configuration :**
- `.env` files pour configuration
- Pydantic Settings pour validation config
- Séparation dev/staging/production environments

**Monitoring & Logging :**
- Structured logging avec Python logging module
- Prêt pour intégration Sentry/Datadog
- Health check endpoints (`/health`)

**Déploiement Docker :**
```dockerfile
# Dockerfile multi-stage inclus
FROM python:3.11-slim AS base
# ... build optimisé pour production
```

**Librairies Additionnelles à Installer (MVP Virtual Pit Wall) :**
```bash
# FastF1 pour données F1
pip install fastf1

# HTTP client pour FastF1 API calls
pip install httpx

# Data validation supplémentaire
pip install email-validator

# Background tasks avancés (si nécessaire)
pip install celery[redis]
```

---

### Notes d'Implémentation

**📋 Première Story d'Implémentation :**

1. **Frontend Setup**
   - Initialiser projet Vite React TypeScript
   - Configurer Tailwind CSS
   - Installer dépendances de base (Zustand, React Router, Axios)
   - Configurer structure de dossiers
   - Setup Vercel deployment

2. **Backend Setup**
   - Cloner et configurer FastAPI boilerplate
   - Configurer PostgreSQL et Redis (Docker)
   - Tester que `/docs` fonctionne
   - Créer premier endpoint de test
   - Setup Render deployment avec Dockerfile

3. **Integration Test**
   - Frontend appelle backend API de test
   - Vérifier CORS configuré correctement
   - Confirmer que les deux apps communiquent

**🔄 Architecture Multi-Repo :**

- **Frontend Repo** : `virtual-pit-wall-frontend`
  - Deploy automatique sur Vercel via GitHub integration
  - Environment variables pour API backend URL

- **Backend Repo** : `virtual-pit-wall-backend`
  - Deploy automatique sur Render via GitHub integration
  - Environment variables pour DB, Redis, secrets

**🔐 Variables d'Environnement Critiques :**

Frontend (`.env`) :
```
VITE_API_BASE_URL=https://api.virtual-pit-wall.com
```

Backend (`.env`) :
```
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://host:6379
SECRET_KEY=your-secret-key-here
STRIPE_API_KEY=sk_test_...
```

---

## Décisions Architecturales Détaillées

### Analyse de Priorité des Décisions

**Décisions Critiques (Bloquent l'Implémentation) :**
- ✅ Stack Backend : Python 3.11 + FastAPI + FastF1
- ✅ Stack Frontend : React 18 + TypeScript + Vite + Tailwind CSS
- ✅ Database : PostgreSQL 15+ (données) + Redis (cache)
- ✅ Déploiement : Vercel (frontend) + Render (backend)
- ✅ Architecture : Multi-Repo (frontend/backend séparés)

**Décisions Importantes (Façonnent l'Architecture) :**
- ✅ State Management : Zustand
- ✅ Data Visualization : Hybrid (Recharts + D3.js)
- ✅ API Client : Axios + TanStack Query
- ✅ Authorization : RBAC simple (3 tiers)
- ✅ Monitoring : Sentry + UptimeRobot + Analytics

**Décisions Différées (Post-MVP) :**
- ⏸️ TimescaleDB pour télémétrie complète (si volumétrie justifie)
- ⏸️ Elasticsearch pour recherche avancée (si > 1000 courses)
- ⏸️ Environnement staging (develop branch)
- ⏸️ Horizontal scaling backend (si > 1000 users simultanés)
- ⏸️ Backups automatiques PostgreSQL (upgrade à $7/mois avec premiers payants)

---

### 1. Architecture de Données

#### 1.1 Pipeline d'Ingestion FastF1

**Décision : Import Manuel via Script CLI**

**Rationale :** MVP avec ~24 courses/an ne justifie pas l'automatisation complexe. Contrôle total, simplicité debugging, validation manuelle.

**Commande CLI :**
```bash
python manage.py import-race --season 2024 --round 6
```

**Évolution Phase 2 :** Celery Beat pour imports automatiques schedulés

**Impact :** Service d'ingestion, modèles SQLAlchemy

---

#### 1.2 Stratégie de Cache Multi-Niveaux

**Décision : Cache Redis Agressif**

**Configuration :**

```python
# Redis Backend - Cache Primaire
race:{race_id}:full → TTL: Infini
sim:{race_id}:{driver_id}:{lap}:{tire} → TTL: 24h
races:metadata → TTL: 1h

# TanStack Query Frontend - Cache Client
staleTime: 1h (données historiques)
cacheTime: 24h

# HTTP Caching CDN
Cache-Control: public, max-age=3600
```

**Rationale :** Données F1 historiques immuables, performance PRD < 5s/500ms, Redis inclus dans boilerplate

**Impact :** Service cache, endpoints API, composants frontend

---

#### 1.3 Schéma PostgreSQL

**Décision : Modélisation Relationnelle Optimisée**

**Modèles Principaux :**

```python
class Race(Base):
    id, season, round, name, date, circuit_id
    data_imported, imported_at

class Circuit(Base):
    id, name, country, length_km, turns
    track_map_data (JSON)

class Driver(Base):
    id, driver_number, code, first_name, last_name, team

class LapData(Base):
    race_id, driver_id, lap_number, position
    lap_time_seconds, sector_times
    tire_compound, tire_age, gap_to_leader
    # Index: (race_id, driver_id, lap_number)

class PitStop(Base):
    race_id, driver_id, stop_number, lap
    duration_seconds, tire_compound_after

class Telemetry(Base):
    race_id, driver_id, lap_number, distance_meters
    speed_kmh, throttle_percent, brake_active, gear
    # MVP: Échantillonné (1 point/10m) → Réduction 90% volumétrie

class SimulationResult(Base):
    race_id, driver_id, alternative_stop_lap, alternative_tire
    predicted_position, predicted_gap, simulation_metadata
    created_at, user_id
```

**Volumétrie MVP :** ~40K lap records, ~2-3M telemetry points échantillonnés

**Impact :** Migrations Alembic, repositories, services

---

#### 1.4 Validation Données

**Décision : Validation Stricte à l'Import**

```python
def import_race(season, round):
    session = fastf1.get_session(season, round, 'R')
    validation = validate_data(session)  # Check completeness
    if validation.has_errors:
        raise ValidationError()
    race_data = transform_session(session)
    with db.begin():  # Transaction rollback auto si erreur
        save_race(race_data)
    cache.set(f"race:{race.id}:full", race_data)
```

**Logging :** Rapport JSON détaillé (warnings, stats, durée)

**Impact :** Service ingestion, CLI commands

---

### 2. Authentication & Security

#### 2.1 Autorisation RBAC

**Décision : Role-Based Access Control Simple**

```python
class UserTier(Enum):
    FREEMIUM = "freemium"
    PRO = "pro"
    ELITE = "elite"

@require_tier(UserTier.PRO)
async def run_simulation(...):
    pass
```

**Mapping Fonctionnalités :**

| Feature | Freemium | Pro | Elite |
|---------|----------|-----|-------|
| Race Library | ✅ | ✅ | ✅ |
| Race Rewind | ✅ (3/mois) | ✅ Illimité | ✅ |
| Strategy Time Machine | ❌ | ✅ (50/jour) | ✅ Illimité |
| Télémétrie | ❌ | ✅ | ✅ |
| Comparaisons multi-pilotes | ❌ | ❌ | ✅ |

**Impact :** Endpoints API, middleware, modèles

---

#### 2.2 Paywall Frontend

**Décision : Protection API + Indication UI**

```typescript
<button onClick={isLocked ? openUpgrade : openFeature}>
  {isLocked && <LockIcon />}
  Strategy Time Machine
  {isLocked && <span>(Pro Feature)</span>}
</button>

// Backend double-check
@require_tier(UserTier.PRO)
```

**Rationale :** User voit ce qu'il manque (conversion), sécurisé backend

**Impact :** Composants UI, routing, API

---

#### 2.3 Intégration Stripe

**Décision : Webhooks Stripe pour Sync Automatique**

```python
class Subscription(Base):
    user_id, stripe_subscription_id, stripe_customer_id
    tier, status, current_period_end
    cancel_at_period_end

# Webhooks gérés
customer.subscription.created
customer.subscription.updated
customer.subscription.deleted
invoice.payment_succeeded
invoice.payment_failed
```

**Flow :** Frontend → Checkout Session → Stripe → Webhook → Update DB

**Impact :** Endpoints checkout/webhooks, modèles

---

#### 2.4 Rate Limiting

**Décision : Limites Progressives par Tier**

```python
RATE_LIMITS = {
    FREEMIUM: "10/minute" général, "0/day" simulations
    PRO: "60/minute" général, "50/day" simulations
    ELITE: "120/minute" général, illimité simulations
}
```

**Impact :** Middleware, endpoints, Redis

---

#### 2.5 CORS

**Décision : CORS pour Vercel Deployments**

```python
CORS_ORIGINS = [
    "http://localhost:5173",
    "https://virtual-pit-wall.vercel.app",
    "https://www.virtual-pit-wall.com",
    "https://*.vercel.app"  # PR previews
]
```

**Security Headers :** HTTPS forcé, HSTS, X-Frame-Options, X-Content-Type-Options

**Impact :** Middleware CORS, configuration

---

### 3. Architecture Frontend

#### 3.1 State Management

**Décision : Zustand**

```typescript
// stores/authStore.ts
export const useAuthStore = create<AuthStore>(
  persist((set) => ({
    user: null,
    token: null,
    login: async (email, password) => {...}
  }), { name: 'auth-storage' })
)

// stores/raceStore.ts
export const useRaceStore = create<RaceStore>((set) => ({
  currentRace: null,
  loadRace: async (id) => {...}
}))

// stores/replayStore.ts (Race Rewind state)
// stores/simulationStore.ts (Simulations)
// stores/uiStore.ts (UI modals, toasts)
```

**Rationale :** Simple API, performance, moins boilerplate que Redux, TypeScript first-class

**Impact :** Composants React, hooks

---

#### 3.2 Data Visualization

**Décision : Hybrid Recharts + D3.js**

**Recharts (80% - Standards) :**
```typescript
<LineChart data={lapData}>
  <XAxis dataKey="lap" />
  <Line dataKey="lapTime" stroke="#8884d8" />
</LineChart>
```

**D3.js (20% - Killer Features) :**
```typescript
// CircuitMap.tsx (Race Rewind)
// TrafficPredictor.tsx (Strategy Time Machine)
// Custom visualisations interactives
```

**Organisation :**
```
components/
├── charts/ (Recharts - rapide)
└── visualizations/ (D3.js - custom USP)
```

**Rationale :** 80/20 rule, Recharts rapide, D3 pour différenciation, bundle optimisé

**Impact :** Composants viz, pages analyse

---

#### 3.3 API Client

**Décision : Axios + TanStack Query**

```typescript
// Axios avec interceptors JWT
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`
})

// TanStack Query hooks
export const useRace = (id: string) => {
  return useQuery({
    queryKey: ['race', id],
    queryFn: () => api.get(`/races/${id}`),
    staleTime: 1000 * 60 * 60  // 1h - données historiques
  })
}

// Usage
const { data: race, isLoading } = useRace(raceId)
```

**Rationale :** Cache intelligent, loading states auto, deduplication, optimisations pour données statiques F1

**Impact :** Hooks queries/mutations, composants

---

#### 3.4 Routing

**Décision : React Router v6**

```typescript
<Routes>
  <Route path="/" element={<LandingPage />} />
  <Route element={<ProtectedRoute />}>
    <Route path="/races" element={<RaceLibrary />} />
    <Route element={<PaywallRoute tier="pro" />}>
      <Route path="/races/:id/simulate" element={<Simulation />} />
    </Route>
  </Route>
</Routes>
```

**Routes :** /, /login, /signup, /races, /races/:id, /races/:id/simulate, /profile, /settings, /upgrade

**Impact :** App.tsx, routing, navigation

---

### 4. Infrastructure & Déploiement

#### 4.1 CI/CD

**Décision : Auto-Deploy Vercel + Render (Production-Only)**

**Vercel Frontend :**
- Push main → Deploy production
- PR → Deploy preview automatique
- Zero config (détection Vite auto)

**Render Backend :**
```yaml
# render.yaml
services:
  - type: web
    name: virtual-pit-wall-api
    env: docker
    autoDeploy: true
    envVars:
      - key: DATABASE_URL
        fromDatabase: virtual-pit-wall-db
```

**Rationale :** Simplicité maximale, preview deployments pour QA, zéro GitHub Actions custom

**Impact :** Déploiement, repos

---

#### 4.2 Environment Variables

**Décision : Dashboards + `.env.example`**

```bash
# .env.example (commité)
DATABASE_URL=postgresql://...
SECRET_KEY=change-this
STRIPE_API_KEY=sk_test_...

# Production (Render/Vercel dashboards)
# Secrets encrypted, rotation facile
```

**Rationale :** Secrets jamais commités, dashboards = source vérité, 12-factor app

**Impact :** Configuration, sécurité

---

#### 4.3 Monitoring

**Décision : Stack Gratuit**

```
✅ Sentry (backend + frontend) - Errors & Performance
   Free: 5K errors/mois, 10K transactions/mois

✅ Render Logs - Structured logging backend

✅ Vercel Analytics - Web Vitals, performance frontend

✅ UptimeRobot - Uptime monitoring API
   Free: 50 monitors, 5min interval

✅ Google Analytics + Mixpanel - Product analytics
   GA: gratuit, Mixpanel free: 20M events/mois
```

**Health Check :**
```python
@router.get("/health")
async def health():
    db.execute("SELECT 1")
    redis.ping()
    return {"status": "healthy"}
```

**Coût MVP : $0**

**Impact :** Monitoring, alerting, debugging

---

#### 4.4 Database Backups

**Décision : Free Tier + Backups Manuels MVP**

```bash
# scripts/backup-db.sh
DATE=$(date +%Y%m%d)
pg_dump $DATABASE_URL > backup_$DATE.sql
gzip backup_$DATE.sql
# Upload to S3/GCS (5GB free tier)
```

**Fréquence :** Weekly + avant events critiques (imports, deployments)

**Évolution Phase 2 :** Render $7/mois avec backups auto dès premiers payants

**Impact :** Scripts ops, documentation

---

#### 4.5 Scaling Strategy

**Décision : Scaling Progressif**

**MVP (0-6 mois) :**
```
Vercel: Hobby (gratuit)
Render Backend: Free (512MB, 0.1 CPU) → 50-100 users
Render DB: Free (1GB)
Render Redis: Free (25MB)
```

**Phase 2 (6-12 mois) - Premiers Payants :**
```
Vercel: Pro ($20/mois)
Render Backend: Starter ($7/mois, always-on)
Render DB: Starter ($7/mois, backups auto)
Render Redis: Starter ($10/mois)
```

**Phase 3 (12-18 mois) - Growth :**
```
Render Backend: Standard ($25/mois, 2GB RAM)
→ Horizontal scaling si > 1000 concurrent
```

**Triggers Scaling :**
- Backend CPU > 80% sustained → Upgrade
- Response time p95 > 2s → Investigation + scaling
- Concurrent users > 80% capacity → Horizontal scale

**Impact :** Architecture, monitoring, coûts

---

#### 4.6 SSL/HTTPS

**Décision : SSL Automatique**

```
Frontend: virtual-pit-wall.vercel.app (SSL auto)
Custom: www.virtual-pit-wall.com (Let's Encrypt auto)

Backend: api.virtual-pit-wall.com (SSL auto)

TLS: 1.3
Renouvellement: Automatique
HTTPS: Forcé (redirect auto)
```

**DNS :**
```
CNAME www → cname.vercel-dns.com
CNAME api → virtual-pit-wall-api.onrender.com
```

**Impact :** Configuration domaines

---

#### 4.7 CORS Final

**Décision : CORS avec Wildcard Vercel**

```python
CORS_ORIGINS = [
    "http://localhost:5173",
    "https://virtual-pit-wall.vercel.app",
    "https://www.virtual-pit-wall.com",
    "https://*.vercel.app"  # Wildcard pour PR previews
]

# Custom middleware pour wildcard support
@app.middleware("http")
async def cors_wildcard_middleware(request, call_next):
    origin = request.headers.get("origin")
    if matches_allowed_origin(origin):
        response.headers["Access-Control-Allow-Origin"] = origin
```

**Impact :** Middleware CORS

---

### Décisions Architecturales - Résumé Exécutif

**30+ décisions critiques prises couvrant :**

1. **Data Architecture** : FastF1 import CLI, cache Redis agressif, PostgreSQL optimisé, validation stricte
2. **Auth & Security** : RBAC 3 tiers, paywall UI+API, Stripe webhooks, rate limiting, CORS sécurisé
3. **Frontend** : Zustand state, Recharts+D3 hybrid, TanStack Query cache, React Router v6
4. **Infrastructure** : CI/CD auto Vercel+Render, monitoring gratuit Sentry+UptimeRobot, backups manuels MVP, scaling progressif, SSL auto

**Architecture finale :** Multi-repo, serverless-ready, production-ready dès MVP, coût $0 jusqu'à traction démontrée.

**Prochaine étape :** Patterns d'implémentation pour garantir cohérence entre agents AI.

---

## Patterns d'Implémentation & Règles de Cohérence

### Objectif

Ces patterns garantissent que tous les agents IA écrivent du code compatible et cohérent. Chaque agent DOIT suivre ces conventions sans exception.

---

### Conventions de Nommage

#### Base de Données (PostgreSQL)

| Élément | Convention | Exemple |
|---------|------------|---------|
| Tables | snake_case pluriel | `races`, `lap_data`, `pit_stops` |
| Colonnes | snake_case | `driver_id`, `lap_time_seconds` |
| Clés primaires | `id` | `id SERIAL PRIMARY KEY` |
| Clés étrangères | `{table}_id` | `race_id`, `driver_id` |
| Index | `idx_{table}_{columns}` | `idx_lap_data_race_driver` |
| Contraintes | `{table}_{type}_{columns}` | `races_unique_season_round` |

#### API REST (FastAPI)

| Élément | Convention | Exemple |
|---------|------------|---------|
| Endpoints | snake_case pluriel | `/races`, `/pit_stops`, `/lap_data` |
| Paramètres URL | snake_case | `/races/{race_id}/laps/{lap_number}` |
| Query params | snake_case | `?driver_id=1&season=2024` |
| Corps JSON | snake_case | `{ "driver_id": 1, "lap_time": 82.5 }` |

#### Code Frontend (React/TypeScript)

| Élément | Convention | Exemple |
|---------|------------|---------|
| Fichiers composants | PascalCase.tsx | `UserCard.tsx`, `RaceRewind.tsx` |
| Fichiers utilitaires | camelCase.ts | `formatLapTime.ts`, `apiClient.ts` |
| Composants | PascalCase | `function RaceCard() {}` |
| Hooks | camelCase avec use | `useRaceData`, `useSimulation` |
| Variables | camelCase | `const raceId`, `const lapTime` |
| Constantes | SCREAMING_SNAKE | `const API_BASE_URL` |
| Types/Interfaces | PascalCase | `interface RaceData {}` |

#### Code Backend (Python/FastAPI)

| Élément | Convention | Exemple |
|---------|------------|---------|
| Fichiers | snake_case.py | `race_service.py`, `lap_data.py` |
| Classes | PascalCase | `class RaceService:` |
| Fonctions | snake_case | `def get_race_by_id():` |
| Variables | snake_case | `race_id`, `lap_time` |
| Constantes | SCREAMING_SNAKE | `DATABASE_URL` |

**Règle critique :** Les données API arrivent en snake_case et sont utilisées telles quelles côté frontend. Pas de conversion camelCase.

---

### Formats API

#### Réponse Succès (Wrapper Standardisé)

```json
{
  "data": {
    "race_id": 1,
    "name": "Monaco Grand Prix",
    "season": 2024
  },
  "meta": {
    "timestamp": "2026-01-15T10:30:00Z",
    "version": "1.0"
  }
}
```

#### Réponse Liste (avec pagination)

```json
{
  "data": [
    { "race_id": 1, "name": "Bahrain GP" },
    { "race_id": 2, "name": "Saudi Arabia GP" }
  ],
  "meta": {
    "total": 24,
    "page": 1,
    "per_page": 10,
    "timestamp": "2026-01-15T10:30:00Z"
  }
}
```

#### Réponse Erreur

```json
{
  "error": {
    "code": "RACE_NOT_FOUND",
    "message": "La course demandée n'existe pas",
    "detail": "race_id: 999 not found in database"
  }
}
```

**Codes d'erreur standards :**
- `VALIDATION_ERROR` (400) - Données invalides
- `UNAUTHORIZED` (401) - Non authentifié
- `FORBIDDEN` (403) - Permissions insuffisantes
- `NOT_FOUND` (404) - Ressource inexistante
- `RATE_LIMITED` (429) - Limite dépassée
- `INTERNAL_ERROR` (500) - Erreur serveur

---

### Organisation des Tests

#### Frontend

```
src/
├── components/
│   ├── RaceCard.tsx
│   └── RaceCard.test.tsx      # Unit test co-localisé
├── hooks/
│   ├── useRaceData.ts
│   └── useRaceData.test.ts    # Unit test co-localisé
tests/
├── e2e/
│   ├── race-library.spec.ts   # Tests E2E Playwright
│   └── simulation.spec.ts
└── fixtures/
    └── races.json             # Données de test partagées
```

#### Backend

```
app/
├── services/
│   └── race_service.py
tests/
├── unit/
│   └── services/
│       └── test_race_service.py
├── integration/
│   └── test_race_endpoints.py
└── conftest.py                # Fixtures pytest
```

---

### State Management (Zustand)

#### Organisation des Stores

```
src/stores/
├── authStore.ts        # user, token, login/logout
├── raceStore.ts        # currentRace, racesList
├── replayStore.ts      # currentLap, playbackSpeed, isPlaying
├── simulationStore.ts  # simParams, simResults, isSimulating
└── uiStore.ts          # modals, toasts, sidebarOpen
```

#### Pattern avec Sélecteurs

```typescript
// stores/raceStore.ts
interface RaceState {
  currentRace: Race | null
  racesList: Race[]
  isLoading: boolean
  loadRace: (id: string) => Promise<void>
  loadRacesList: () => Promise<void>
}

export const useRaceStore = create<RaceState>((set) => ({
  currentRace: null,
  racesList: [],
  isLoading: false,
  loadRace: async (id) => { /* ... */ },
  loadRacesList: async () => { /* ... */ }
}))

// Sélecteurs exportés
export const selectCurrentRace = (state: RaceState) => state.currentRace
export const selectRacesList = (state: RaceState) => state.racesList
export const selectIsLoading = (state: RaceState) => state.isLoading

// Usage dans composant
const currentRace = useRaceStore(selectCurrentRace)
```

---

### Gestion des Erreurs

#### Frontend (React)

```typescript
// 1. Error Boundary pour erreurs critiques (crash)
<ErrorBoundary fallback={<ErrorPage />}>
  <App />
</ErrorBoundary>

// 2. Toast pour erreurs API (non-bloquant)
const { mutate } = useMutation({
  onError: (error) => {
    toast.error(error.message)
  }
})

// 3. Inline pour erreurs formulaire
{errors.email && <span className="text-red-500">{errors.email}</span>}
```

#### Backend (FastAPI)

```python
# exceptions.py
class AppException(Exception):
    def __init__(self, code: str, message: str, detail: str = None, status: int = 400):
        self.code = code
        self.message = message
        self.detail = detail
        self.status = status

class RaceNotFoundError(AppException):
    def __init__(self, race_id: int):
        super().__init__(
            code="RACE_NOT_FOUND",
            message="La course demandée n'existe pas",
            detail=f"race_id: {race_id}",
            status=404
        )

# handlers.py
@app.exception_handler(AppException)
async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status,
        content={"error": {"code": exc.code, "message": exc.message, "detail": exc.detail}}
    )
```

---

### Loading States

#### Pattern Principal (TanStack Query)

```typescript
function RaceDetails({ raceId }: Props) {
  const { data, isLoading, isError, error } = useRace(raceId)

  if (isLoading) return <Spinner />
  if (isError) return <ErrorMessage error={error} />

  return <RaceContent race={data} />
}
```

#### Actions Globales (Zustand)

```typescript
// Pour login/logout et actions transversales
const isGlobalLoading = useUiStore(selectGlobalLoading)

{isGlobalLoading && <LoadingOverlay />}
```

#### Conventions UI

| Contexte | Composant | Usage |
|----------|-----------|-------|
| Inline | `<Spinner size="sm" />` | Boutons, champs |
| Section | `<Spinner size="md" />` | Cards, listes |
| Page | `<LoadingScreen />` | Chargement initial |
| Overlay | `<LoadingOverlay />` | Actions globales |

---

### Format Date/Heure

#### API (ISO 8601)

```json
{
  "race_date": "2026-03-15T14:00:00Z",
  "created_at": "2026-01-15T10:30:00Z"
}
```

#### Frontend (date-fns)

```typescript
import { format, formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'

// Date complète
format(new Date(race.race_date), 'dd MMMM yyyy', { locale: fr })
// → "15 mars 2026"

// Date relative
formatDistanceToNow(new Date(race.race_date), { locale: fr, addSuffix: true })
// → "dans 2 mois"
```

#### Temps au Tour F1

```typescript
// Stockage DB: DECIMAL en secondes
// 83.456 = 1:23.456

// Formatage affichage
function formatLapTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = (seconds % 60).toFixed(3)
  return mins > 0 ? `${mins}:${secs.padStart(6, '0')}` : secs
}
// 83.456 → "1:23.456"
// 23.456 → "23.456"
```

---

### Logging

#### Backend (Structured JSON)

```python
import structlog

logger = structlog.get_logger()

# Info - Actions métier
logger.info("race_imported", race_id=123, season=2024, duration_ms=1523)

# Warning - Anomalies non-bloquantes
logger.warning("cache_miss", key="race:123", fallback="database")

# Error - Erreurs récupérables
logger.error("external_api_failed", service="fastf1", retry_count=3)
```

**Niveaux de log :**
| Niveau | Usage | Exemple |
|--------|-------|---------|
| DEBUG | Développement uniquement | Query SQL détaillée |
| INFO | Actions métier normales | Course importée, simulation lancée |
| WARNING | Anomalies non-bloquantes | Cache miss, retry réussi |
| ERROR | Erreurs récupérables | API externe down |
| CRITICAL | Erreurs fatales | DB inaccessible |

#### Frontend (Sentry)

```typescript
// Développement
console.log('Debug info:', data)

// Production - capturé par Sentry
Sentry.captureMessage('User action', { extra: { action: 'simulation_started' } })
Sentry.captureException(error)
```

---

### Règles d'Application

**Tous les agents IA DOIVENT :**

1. Utiliser snake_case pour toute interaction avec la DB et l'API
2. Suivre les conventions de nommage React (PascalCase composants)
3. Wrapper toutes les réponses API dans `{ data, meta }` ou `{ error }`
4. Utiliser les sélecteurs Zustand exportés
5. Gérer les erreurs via Error Boundaries + Toasts
6. Formater les dates avec date-fns et locale française
7. Logger en JSON structuré côté backend

**Anti-patterns à éviter :**

- ❌ Mélanger camelCase et snake_case dans l'API
- ❌ Retourner des réponses API sans wrapper
- ❌ Accéder au state Zustand sans sélecteur
- ❌ Utiliser console.log en production
- ❌ Stocker des dates en format autre qu'ISO 8601

---

## Structure Projet & Frontières

### Structure Frontend : `virtual-pit-wall-frontend`

```
virtual-pit-wall-frontend/
├── README.md
├── package.json
├── package-lock.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── tsconfig.node.json
├── .env.example
├── .env.local                    # Ignoré par git
├── .gitignore
├── .eslintrc.cjs
├── .prettierrc
├── index.html
│
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── assets/
│       ├── images/
│       │   ├── circuits/         # Cartes circuits SVG
│       │   └── teams/            # Logos équipes
│       └── fonts/
│
├── src/
│   ├── main.tsx                  # Entry point
│   ├── App.tsx                   # Root component + Router
│   ├── index.css                 # Tailwind directives
│   ├── vite-env.d.ts
│   │
│   ├── api/
│   │   ├── client.ts             # Axios instance + interceptors
│   │   ├── races.ts              # useRaces, useRace hooks
│   │   ├── simulations.ts        # useSimulation mutations
│   │   ├── auth.ts               # useLogin, useRegister
│   │   └── types.ts              # API response types
│   │
│   ├── components/
│   │   ├── ui/                   # Composants UI génériques
│   │   │   ├── Button.tsx
│   │   │   ├── Spinner.tsx
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── LoadingOverlay.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Card.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/               # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── AppLayout.tsx
│   │   │
│   │   ├── auth/                 # Auth components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── PaywallRoute.tsx
│   │   │
│   │   ├── charts/               # Recharts (standard viz)
│   │   │   ├── LapTimeChart.tsx
│   │   │   ├── GapChart.tsx
│   │   │   ├── TireStrategyChart.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── visualizations/       # D3.js (killer features)
│   │   │   ├── CircuitMap.tsx          # Race Rewind map
│   │   │   ├── TrafficPredictor.tsx    # Strategy Time Machine
│   │   │   ├── PositionTimeline.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── race/                 # Race-specific components
│   │   │   ├── RaceCard.tsx
│   │   │   ├── RaceCard.test.tsx
│   │   │   ├── RaceList.tsx
│   │   │   ├── RaceFilters.tsx
│   │   │   ├── DriverCard.tsx
│   │   │   ├── LapDataTable.tsx
│   │   │   └── TireStatus.tsx
│   │   │
│   │   ├── rewind/               # Race Rewind feature
│   │   │   ├── RewindPlayer.tsx
│   │   │   ├── RewindPlayer.test.tsx
│   │   │   ├── RewindControls.tsx
│   │   │   ├── LapSelector.tsx
│   │   │   └── DriverPositions.tsx
│   │   │
│   │   └── simulation/           # Strategy Time Machine
│   │       ├── SimulationForm.tsx
│   │       ├── SimulationForm.test.tsx
│   │       ├── SimulationResults.tsx
│   │       ├── PitStopSelector.tsx
│   │       └── TireSelector.tsx
│   │
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── RaceLibraryPage.tsx
│   │   ├── RaceDetailPage.tsx
│   │   ├── SimulationPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── UpgradePage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── stores/
│   │   ├── authStore.ts
│   │   ├── authStore.test.ts
│   │   ├── raceStore.ts
│   │   ├── replayStore.ts
│   │   ├── simulationStore.ts
│   │   └── uiStore.ts
│   │
│   ├── hooks/
│   │   ├── useRaceData.ts
│   │   ├── useRaceData.test.ts
│   │   ├── useSimulation.ts
│   │   ├── useAuth.ts
│   │   └── useMediaQuery.ts
│   │
│   ├── utils/
│   │   ├── formatLapTime.ts
│   │   ├── formatLapTime.test.ts
│   │   ├── formatDate.ts
│   │   ├── constants.ts
│   │   └── validators.ts
│   │
│   ├── types/
│   │   ├── race.ts
│   │   ├── driver.ts
│   │   ├── simulation.ts
│   │   ├── user.ts
│   │   └── api.ts
│   │
│   └── lib/
│       ├── sentry.ts             # Sentry init
│       └── queryClient.ts        # TanStack Query config
│
├── tests/
│   ├── e2e/
│   │   ├── race-library.spec.ts
│   │   ├── simulation.spec.ts
│   │   ├── auth.spec.ts
│   │   └── playwright.config.ts
│   ├── fixtures/
│   │   ├── races.json
│   │   └── drivers.json
│   └── setup.ts
│
└── .github/
    └── workflows/
        └── ci.yml                # Lint, test, build
```

---

### Structure Backend : `virtual-pit-wall-backend`

```
virtual-pit-wall-backend/
├── README.md
├── pyproject.toml                # Poetry config
├── poetry.lock
├── Dockerfile
├── docker-compose.yml
├── docker-compose.dev.yml
├── .env.example
├── .env                          # Ignoré par git
├── .gitignore
├── .pre-commit-config.yaml
├── alembic.ini
├── render.yaml                   # Render deployment config
│
├── app/
│   ├── __init__.py
│   ├── main.py                   # FastAPI app entry point
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py               # Dependency injection
│   │   │
│   │   ├── endpoints/
│   │   │   ├── __init__.py
│   │   │   ├── health.py         # /health endpoint
│   │   │   ├── auth.py           # /auth/* endpoints
│   │   │   ├── users.py          # /users/* endpoints
│   │   │   ├── races.py          # /races/* endpoints
│   │   │   ├── simulations.py    # /simulations/* endpoints
│   │   │   └── webhooks.py       # /webhooks/stripe
│   │   │
│   │   └── middleware/
│   │       ├── __init__.py
│   │       ├── cors.py
│   │       ├── rate_limit.py
│   │       └── auth.py
│   │
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py             # Pydantic Settings
│   │   ├── security.py           # JWT, password hashing
│   │   ├── database.py           # SQLAlchemy async engine
│   │   └── redis.py              # Redis connection
│   │
│   ├── models/
│   │   ├── __init__.py
│   │   ├── base.py               # SQLAlchemy Base
│   │   ├── user.py               # User, Subscription models
│   │   ├── race.py               # Race, Circuit models
│   │   ├── lap_data.py           # LapData, PitStop models
│   │   ├── telemetry.py          # Telemetry model
│   │   └── simulation.py         # SimulationResult model
│   │
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py               # User Pydantic schemas
│   │   ├── race.py               # Race schemas
│   │   ├── lap_data.py           # LapData schemas
│   │   ├── simulation.py         # Simulation schemas
│   │   ├── auth.py               # Login/Token schemas
│   │   └── common.py             # Pagination, Response wrappers
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   ├── user_service.py
│   │   ├── race_service.py
│   │   ├── simulation_service.py # Strategy Time Machine logic
│   │   ├── ingestion_service.py  # FastF1 data import
│   │   ├── cache_service.py
│   │   └── stripe_service.py
│   │
│   ├── repositories/
│   │   ├── __init__.py
│   │   ├── base.py               # Generic repository
│   │   ├── user_repository.py
│   │   ├── race_repository.py
│   │   ├── lap_data_repository.py
│   │   └── simulation_repository.py
│   │
│   ├── exceptions/
│   │   ├── __init__.py
│   │   ├── base.py               # AppException base
│   │   ├── auth.py               # Auth exceptions
│   │   ├── race.py               # Race exceptions
│   │   └── handlers.py           # Exception handlers
│   │
│   └── utils/
│       ├── __init__.py
│       ├── logging.py            # Structured logging config
│       └── validators.py
│
├── cli/
│   ├── __init__.py
│   └── commands/
│       ├── __init__.py
│       ├── import_race.py        # python -m cli.commands.import_race
│       └── validate_data.py
│
├── migrations/
│   ├── env.py
│   ├── script.py.mako
│   └── versions/
│       └── .gitkeep
│
├── tests/
│   ├── __init__.py
│   ├── conftest.py               # Pytest fixtures
│   │
│   ├── unit/
│   │   ├── __init__.py
│   │   ├── services/
│   │   │   ├── test_simulation_service.py
│   │   │   └── test_race_service.py
│   │   └── utils/
│   │       └── test_validators.py
│   │
│   └── integration/
│       ├── __init__.py
│       ├── test_auth_endpoints.py
│       ├── test_race_endpoints.py
│       └── test_simulation_endpoints.py
│
├── scripts/
│   ├── backup-db.sh
│   ├── seed-data.py
│   └── run-migrations.sh
│
└── .github/
    └── workflows/
        └── ci.yml                # Lint, test, type-check
```

---

### Mapping Fonctionnalités → Structure

| Fonctionnalité | Frontend | Backend |
|----------------|----------|---------|
| **Race Library** | `pages/RaceLibraryPage.tsx`, `components/race/*` | `api/endpoints/races.py`, `services/race_service.py` |
| **Race Rewind** | `components/rewind/*`, `visualizations/CircuitMap.tsx` | `api/endpoints/races.py` (lap data) |
| **Strategy Time Machine** | `pages/SimulationPage.tsx`, `components/simulation/*`, `visualizations/TrafficPredictor.tsx` | `api/endpoints/simulations.py`, `services/simulation_service.py` |
| **Auth & Tiers** | `components/auth/*`, `stores/authStore.ts` | `api/endpoints/auth.py`, `services/auth_service.py` |
| **Payments (Stripe)** | `pages/UpgradePage.tsx` | `api/endpoints/webhooks.py`, `services/stripe_service.py` |
| **Data Import** | - | `cli/commands/import_race.py`, `services/ingestion_service.py` |

---

### Frontières Architecturales

#### API Boundaries

```
Frontend ←→ Backend API
    │
    ├── /auth/*           → AuthService → UserRepository
    ├── /races/*          → RaceService → RaceRepository + Cache
    ├── /simulations/*    → SimulationService → Cache + SimulationRepository
    └── /webhooks/stripe  → StripeService → UserRepository (tier update)
```

#### Data Flow

```
[FastF1 API]
     ↓
[CLI Import Script]
     ↓
[IngestionService] → [PostgreSQL] ← [RaceRepository]
                           ↓
                      [CacheService] → [Redis]
                           ↓
                   [API Endpoints]
                           ↓
                   [Frontend TanStack Query Cache]
                           ↓
                   [Zustand Stores]
                           ↓
                   [React Components]
```

#### Component Boundaries (Frontend)

```
Pages (routes)
   ↓
Feature Components (race/, rewind/, simulation/)
   ↓
Visualization Components (charts/, visualizations/)
   ↓
UI Components (ui/)
```

#### Service Boundaries (Backend)

```
Endpoints (HTTP handlers)
   ↓
Services (business logic)
   ↓
Repositories (data access)
   ↓
Models (SQLAlchemy ORM)
```

---

## Validation de l'Architecture

### Validation de Cohérence ✅

**Compatibilité des Décisions :**

| Stack | Compatibilité | Notes |
|-------|---------------|-------|
| React 18 + Vite + TypeScript | ✅ | Officiellement supporté |
| Tailwind CSS + PostCSS | ✅ | Intégration Vite native |
| Zustand + TanStack Query | ✅ | Complémentaires (state local vs server) |
| FastAPI + SQLAlchemy 2.0 | ✅ | Async support natif |
| PostgreSQL + Redis | ✅ | Standard, bien documenté |
| Vercel + Render | ✅ | Pas de conflits |

**Aucune contradiction détectée** dans les choix technologiques.

**Cohérence des Patterns :**
- snake_case DB → snake_case API → snake_case utilisé en frontend ✅
- Wrapper API `{ data, meta }` cohérent avec exception handlers `{ error }` ✅
- Stores Zustand par domaine alignés avec structure composants ✅

---

### Couverture des Exigences ✅

**Fonctionnalités MVP :**

| Feature PRD | Support Architectural | Fichiers Clés |
|-------------|----------------------|---------------|
| Strategy Time Machine | ✅ | `simulation_service.py`, `TrafficPredictor.tsx` |
| Race Rewind | ✅ | `replayStore.ts`, `CircuitMap.tsx`, `RewindPlayer.tsx` |
| Race Library | ✅ | `race_service.py`, `RaceLibraryPage.tsx` |
| Auth & Tiers RBAC | ✅ | `auth_service.py`, `authStore.ts`, `PaywallRoute.tsx` |
| Paiements Stripe | ✅ | `stripe_service.py`, `webhooks.py`, `UpgradePage.tsx` |
| Import FastF1 | ✅ | `ingestion_service.py`, `cli/commands/import_race.py` |

**Exigences Non-Fonctionnelles :**

| NFR | Support | Comment |
|-----|---------|---------|
| Performance < 5s | ✅ | Cache Redis multi-niveaux, TanStack Query |
| WCAG 2.1 AA | ✅ | À implémenter avec tests axe-core |
| Mobile crucial | ✅ | Tailwind responsive, structure mobile-first |
| 99.9% uptime | ✅ | Sentry monitoring, UptimeRobot |

---

### Préparation à l'Implémentation ✅

**Complétude des Décisions :**
- ✅ 30+ décisions architecturales documentées avec versions
- ✅ Patterns de nommage complets (DB, API, Frontend, Backend)
- ✅ Formats API standardisés avec exemples
- ✅ Gestion erreurs et loading states définis

**Complétude de la Structure :**
- ✅ Arborescence complète frontend (~60 fichiers)
- ✅ Arborescence complète backend (~50 fichiers)
- ✅ Mapping fonctionnalités → fichiers explicite
- ✅ Frontières architecturales documentées

---

### Analyse des Gaps

**Gaps Critiques :** Aucun détecté

**Gaps Importants :**
1. Schema Pydantic détaillé - Les schemas sont listés mais pas les champs exacts
2. Migrations Alembic initiales - À créer lors de l'implémentation

**Gaps Nice-to-Have :**
1. Diagramme C4 ou architecture visuelle
2. ADR (Architecture Decision Records) format formel
3. Scripts de setup automatisés

---

### Checklist de Complétude

**✅ Analyse des Exigences**
- [x] Contexte projet analysé en profondeur
- [x] Échelle et complexité évaluées
- [x] Contraintes techniques identifiées
- [x] Préoccupations transversales mappées

**✅ Décisions Architecturales**
- [x] Décisions critiques documentées avec versions
- [x] Stack technologique entièrement spécifié
- [x] Patterns d'intégration définis
- [x] Considérations performance adressées

**✅ Patterns d'Implémentation**
- [x] Conventions de nommage établies
- [x] Patterns de structure définis
- [x] Patterns de communication spécifiés
- [x] Patterns de processus documentés

**✅ Structure Projet**
- [x] Structure de répertoires complète définie
- [x] Frontières de composants établies
- [x] Points d'intégration mappés
- [x] Mapping exigences vers structure complet

---

### Évaluation de Préparation

**Statut Global : PRÊT POUR IMPLÉMENTATION**

**Niveau de Confiance : ÉLEVÉ**

**Forces de l'Architecture :**
- Stack cohérent et moderne (React/FastAPI/PostgreSQL)
- Patterns clairs pour éviter conflits entre agents IA
- Structure détaillée prête à scaffolder
- Séparation claire frontend/backend (multi-repo)
- Cache multi-niveaux pour performance optimale

**Améliorations Futures (Post-MVP) :**
- TimescaleDB si télémétrie volumineuse
- Environnement staging
- Documentation API OpenAPI enrichie
- Horizontal scaling backend si > 1000 users

---

### Guide de Handoff pour Implémentation

**Directives pour Agents IA :**

1. Suivre toutes les décisions architecturales exactement comme documentées
2. Utiliser les patterns d'implémentation de manière cohérente
3. Respecter la structure projet et les frontières
4. Se référer à ce document pour toute question architecturale

**Première Priorité d'Implémentation :**

```bash
# Frontend
npm create vite@latest virtual-pit-wall-frontend -- --template react-ts

# Backend
git clone https://github.com/benavlabs/FastAPI-boilerplate.git virtual-pit-wall-backend
```

---

## Résumé de Complétion

### Workflow Terminé

**Architecture Decision Workflow :** COMPLÉTÉ ✅
**Étapes Complétées :** 8/8
**Date de Complétion :** 2026-01-15
**Emplacement :** `_bmad-output/planning-artifacts/architecture.md`

### Livrables Finaux

**📋 Document d'Architecture Complet**
- Toutes les décisions architecturales documentées avec versions spécifiques
- Patterns d'implémentation garantissant cohérence entre agents IA
- Structure projet complète avec tous les fichiers et répertoires
- Mapping exigences vers architecture
- Validation confirmant cohérence et complétude

**🏗️ Fondation Prête pour Implémentation**
- 30+ décisions architecturales
- 10+ patterns d'implémentation
- 2 repos (frontend + backend) entièrement spécifiés
- 100% des exigences PRD couvertes

### Séquence d'Implémentation

1. Initialiser les projets avec les starters documentés
2. Configurer environnements de développement
3. Implémenter les fondations architecturales
4. Développer les fonctionnalités en suivant les patterns
5. Maintenir cohérence avec les règles documentées

### Checklist Qualité Finale

**✅ Cohérence Architecture**
- [x] Toutes les décisions fonctionnent ensemble
- [x] Choix technologiques compatibles
- [x] Patterns supportent les décisions
- [x] Structure alignée avec les choix

**✅ Couverture Exigences**
- [x] Toutes les FR supportées
- [x] Toutes les NFR adressées
- [x] Préoccupations transversales gérées
- [x] Points d'intégration définis

**✅ Préparation Implémentation**
- [x] Décisions spécifiques et actionnables
- [x] Patterns préviennent conflits
- [x] Structure complète et non-ambiguë
- [x] Exemples fournis pour clarté

---

**Statut Architecture :** PRÊT POUR IMPLÉMENTATION ✅

**Phase Suivante :** Commencer l'implémentation avec les décisions et patterns documentés.

**Maintenance Document :** Mettre à jour cette architecture lors de décisions techniques majeures pendant l'implémentation.

---
