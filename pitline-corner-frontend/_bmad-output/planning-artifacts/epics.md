---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
inputDocuments: ['_bmad-output/planning-artifacts/prd.md', '_bmad-output/planning-artifacts/architecture.md']
workflowType: 'epics'
project_name: 'Pitline Corner'
user_name: 'Samir'
date: '2026-01-15'
status: 'complete'
---

# Pitline Corner - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Pitline Corner (Virtual Pit Wall), decomposing the requirements from the PRD and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

| ID | Requirement |
|----|-------------|
| FR1 | Strategy Time Machine - Simulateur "Et si..." avec sélection pilote/tour/pneu |
| FR2 | Strategy Time Machine - Visualisation position sortie stands vs trafic réel |
| FR3 | Strategy Time Machine - Calcul temps d'arrêt moyen + temps sortie stands |
| FR4 | Race Rewind - Carte circuit interactive avec positions tour-par-tour |
| FR5 | Race Rewind - Live Timing historique (temps au tour, secteurs, écarts) |
| FR6 | Race Rewind - Visualisation état pneus (gomme, âge, arrêts stands) |
| FR7 | Race Rewind - Navigation tour par tour avec barre de lecture |
| FR8 | Race Library - Catalogue complet ~24 courses saison 2024 |
| FR9 | Race Library - 5-10 courses emblématiques saisons antérieures |
| FR10 | Race Library - Recherche et filtrage efficace |
| FR11 | Authentification - Inscription freemium/payante |
| FR12 | Authentification - Gestion profils utilisateurs |
| FR13 | Authentification - Sessions sécurisées (JWT) |
| FR14 | Monétisation - Modèle freemium avec paywall sur Strategy Time Machine |
| FR15 | Monétisation - Tiers utilisateurs (Freemium/Pro/Elite) |
| FR16 | Monétisation - Intégration Stripe pour abonnements |
| FR17 | Back-Office - Scripts CLI pour import données FastF1 |
| FR18 | Back-Office - Monitoring via Sentry |

### Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR1 | Performance - Simulations complexes < 5 secondes |
| NFR2 | Performance - Simulations simples 2-3 secondes |
| NFR3 | Performance - Chargement initial < 3s desktop, < 5s mobile |
| NFR4 | Performance - Navigation Race Rewind < 500ms |
| NFR5 | Fiabilité - Exactitude données 99.9% |
| NFR6 | Fiabilité - Uptime 99.9% |
| NFR7 | Scalabilité - 500-1000 utilisateurs simultanés |
| NFR8 | Accessibilité - WCAG 2.1 Level AA |
| NFR9 | Browser Support - Chrome, Firefox, Edge, Safari (2 dernières versions) |
| NFR10 | Mobile Support - Safari iOS, Chrome Android (2 dernières versions) |
| NFR11 | Responsive - Mobile (320px+), Tablet (768px+), Desktop (1024px+) |
| NFR12 | SEO - Landing pages optimisées SSR |

### Additional Requirements (from Architecture)

**Project Setup:**
- Starter Template Frontend: Vite React TypeScript (`npm create vite@latest -- --template react-ts`)
- Starter Template Backend: benavlabs/FastAPI-boilerplate
- Architecture: Multi-repo (frontend + backend séparés)
- Déploiement: Vercel (frontend) + Render (backend)
- Database: PostgreSQL + Redis

**Implementation Patterns:**
- Conventions: snake_case DB/API, PascalCase composants React
- Format API: Wrapper `{ data, meta }` / `{ error }`
- State Management: Zustand avec sélecteurs exportés
- Data Fetching: TanStack Query
- Visualisations: D3.js + Recharts
- Dates: date-fns avec locale française
- Logging: JSON structuré (structlog)
- Tests: Co-localisés (unit) + dossier e2e séparé

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 5 | Strategy Time Machine - Simulateur "Et si..." |
| FR2 | Epic 5 | Strategy Time Machine - Visualisation trafic |
| FR3 | Epic 5 | Strategy Time Machine - Calcul temps |
| FR4 | Epic 4 | Race Rewind - Carte circuit |
| FR5 | Epic 4 | Race Rewind - Live Timing |
| FR6 | Epic 4 | Race Rewind - État pneus |
| FR7 | Epic 4 | Race Rewind - Navigation |
| FR8 | Epic 3 | Race Library - Courses 2024 |
| FR9 | Epic 3 | Race Library - Courses historiques |
| FR10 | Epic 3 | Race Library - Recherche/filtrage |
| FR11 | Epic 2 | Auth - Inscription |
| FR12 | Epic 2 | Auth - Profils |
| FR13 | Epic 2 | Auth - Sessions JWT |
| FR14 | Epic 6 | Monétisation - Paywall |
| FR15 | Epic 6 | Monétisation - Tiers |
| FR16 | Epic 6 | Monétisation - Stripe |
| FR17 | Epic 3 | Back-Office - Import FastF1 |
| FR18 | Epic 6 | Back-Office - Monitoring |

**Couverture : 18/18 FRs (100%)**

## Epic List

### Epic 1: Project Foundation
**Objectif :** Établir les fondations techniques permettant le développement rapide des fonctionnalités utilisateur.

- Setup frontend (Vite + React + TypeScript + Tailwind)
- Setup backend (FastAPI boilerplate + PostgreSQL + Redis)
- Configuration déploiement (Vercel + Render)
- CI/CD et monitoring de base (Sentry)

**Note :** Utilise les starter templates définis dans l'Architecture.

---

### Epic 2: Authentification & Profils
**Objectif :** Permettre aux utilisateurs de créer un compte, se connecter, et gérer leur profil.

**FRs couverts :** FR11, FR12, FR13

- Inscription freemium/payante
- Connexion/déconnexion sécurisée (JWT)
- Gestion du profil utilisateur
- Routes protégées frontend

---

### Epic 3: Race Library
**Objectif :** Permettre aux utilisateurs de parcourir et rechercher les courses F1 disponibles.

**FRs couverts :** FR8, FR9, FR10, FR17

- Catalogue des ~24 courses 2024
- 5-10 courses emblématiques historiques
- Recherche et filtrage (saison, circuit, pilote)
- Scripts CLI import données FastF1

---

### Epic 4: Race Rewind
**Objectif :** Permettre aux utilisateurs de revivre une course tour par tour avec des visualisations interactives.

**FRs couverts :** FR4, FR5, FR6, FR7

- Carte circuit interactive avec positions
- Live Timing historique (temps, secteurs, écarts)
- Visualisation état pneus (gomme, âge)
- Navigation tour par tour avec barre de lecture

---

### Epic 5: Strategy Time Machine
**Objectif :** Permettre aux utilisateurs de tester des scénarios "Et si..." et visualiser l'impact stratégique des décisions.

**FRs couverts :** FR1, FR2, FR3

- Simulateur "Et si..." (pilote/tour/pneu)
- Visualisation position sortie stands vs trafic réel
- Calcul temps d'arrêt + temps sortie
- Interface de simulation intuitive

---

### Epic 6: Monétisation & Abonnements
**Objectif :** Permettre la conversion freemium vers payant et la gestion des abonnements.

**FRs couverts :** FR14, FR15, FR16, FR18

- Modèle freemium avec paywall sur Strategy Time Machine
- Gestion tiers (Freemium/Pro/Elite)
- Intégration Stripe pour paiements
- Page tarification et checkout

---

## Epic 1: Project Foundation

**Objectif :** Établir les fondations techniques permettant le développement rapide des fonctionnalités utilisateur.

**NFRs concernés :** NFR3, NFR6, NFR7, NFR9-11

### Story 1.1: Setup Frontend Project

**As a** développeur,
**I want** un projet frontend React configuré avec les bonnes pratiques,
**So that** je puisse développer rapidement les fonctionnalités utilisateur.

**Acceptance Criteria:**

**Given** le starter template Vite React TypeScript
**When** j'initialise le projet frontend
**Then** le projet contient :
- React 18+ avec TypeScript 5+ (strict mode)
- Vite 5+ configuré
- Tailwind CSS 3+ avec configuration responsive
- ESLint + Prettier configurés
- Structure dossiers selon architecture.md
**And** `npm run dev` lance le serveur de développement sans erreurs
**And** `npm run build` compile sans erreurs
**And** `npm run lint` passe sans erreurs

---

### Story 1.2: Setup Backend Project

**As a** développeur,
**I want** un projet backend FastAPI configuré avec base de données,
**So that** je puisse exposer des APIs pour le frontend.

**Acceptance Criteria:**

**Given** le boilerplate benavlabs/FastAPI
**When** j'initialise le projet backend
**Then** le projet contient :
- FastAPI 0.100+ avec Python 3.11+
- SQLAlchemy 2.0+ configuré en async
- PostgreSQL connecté et fonctionnel
- Redis configuré pour le cache
- Alembic pour les migrations
- Structure dossiers selon architecture.md
**And** `uvicorn app.main:app` démarre sans erreurs
**And** `/health` endpoint retourne `200 OK`
**And** `/docs` affiche la documentation OpenAPI

---

### Story 1.3: Configure Deployment

**As a** développeur,
**I want** le déploiement automatisé configuré,
**So that** les changements soient déployés automatiquement en production.

**Acceptance Criteria:**

**Given** les projets frontend et backend configurés
**When** je configure les déploiements
**Then** :
- Frontend déployé sur Vercel avec preview branches
- Backend déployé sur Render avec auto-deploy
- Variables d'environnement configurées
- CORS configuré entre frontend et backend
**And** un push sur `main` déclenche un déploiement automatique
**And** le frontend accède au backend en production sans erreurs CORS

---

### Story 1.4: Setup Monitoring & CI

**As a** développeur,
**I want** le monitoring et CI/CD configurés,
**So that** je détecte rapidement les erreurs et maintienne la qualité.

**Acceptance Criteria:**

**Given** les projets déployés
**When** je configure le monitoring
**Then** :
- Sentry configuré frontend et backend
- GitHub Actions CI : lint + tests sur PR
- structlog configuré pour logs JSON backend
**And** une erreur frontend est capturée dans Sentry
**And** une exception backend est capturée dans Sentry
**And** les logs backend sont en format JSON structuré

---

## Epic 2: Authentification & Profils

**Objectif :** Permettre aux utilisateurs de créer un compte, se connecter, et gérer leur profil.

**FRs couverts :** FR11, FR12, FR13

### Story 2.1: User Registration

**As a** visiteur,
**I want** créer un compte avec mon email,
**So that** je puisse accéder aux fonctionnalités de l'application.

**Acceptance Criteria:**

**Given** je suis sur la page d'inscription
**When** je remplis le formulaire (email, mot de passe, confirmation)
**Then** mon compte est créé en base de données
**And** je reçois un token JWT valide
**And** je suis redirigé vers la page d'accueil connecté
**And** si l'email existe déjà, j'obtiens une erreur `{ "error": { "code": "EMAIL_EXISTS" } }`
**And** le mot de passe est hashé avec bcrypt
**And** le tier par défaut est "freemium"

---

### Story 2.2: User Login

**As a** utilisateur enregistré,
**I want** me connecter avec mes identifiants,
**So that** je puisse accéder à mon compte.

**Acceptance Criteria:**

**Given** j'ai un compte existant
**When** je soumets email + mot de passe corrects
**Then** je reçois un token JWT valide (access + refresh)
**And** le token est stocké de manière sécurisée
**And** je suis redirigé vers la page d'accueil
**And** si les identifiants sont incorrects, j'obtiens `{ "error": { "code": "INVALID_CREDENTIALS" } }`

---

### Story 2.3: User Profile Management

**As a** utilisateur connecté,
**I want** voir et modifier mon profil,
**So that** je puisse gérer mes informations personnelles.

**Acceptance Criteria:**

**Given** je suis connecté
**When** j'accède à la page profil
**Then** je vois mes informations (email, nom, tier actuel, date inscription)
**And** je peux modifier mon nom d'affichage
**And** je peux changer mon mot de passe
**And** les modifications sont sauvegardées avec message de succès
**And** mon tier d'abonnement est affiché (Freemium/Pro/Elite)

---

### Story 2.4: Protected Routes & Session

**As a** utilisateur,
**I want** que mes sessions soient sécurisées,
**So that** seuls les utilisateurs connectés accèdent aux fonctionnalités protégées.

**Acceptance Criteria:**

**Given** des routes protégées existent
**When** j'accède à une route protégée sans être connecté
**Then** je suis redirigé vers la page de login
**And** après login, je suis redirigé vers la page initialement demandée
**And** le token refresh renouvelle automatiquement le token access
**And** la déconnexion invalide la session et redirige vers l'accueil
**And** le composant `<ProtectedRoute>` encapsule les pages sécurisées

---

## Epic 3: Race Library

**Objectif :** Permettre aux utilisateurs de parcourir et rechercher les courses F1 disponibles.

**FRs couverts :** FR8, FR9, FR10, FR17

### Story 3.1: FastF1 Data Import CLI

**As a** opérateur système,
**I want** importer les données de courses via CLI,
**So that** la Race Library soit alimentée avec les données FastF1.

**Acceptance Criteria:**

**Given** le script CLI d'import existe
**When** j'exécute `python -m cli.commands.import_race --season 2024 --round 1`
**Then** les données de la course sont importées en base :
- Informations course (circuit, date, météo)
- Résultats (positions finales)
- Données tour par tour (lap times, positions)
- Données pneus (compound, âge, pit stops)
- Données secteurs (S1, S2, S3)
**And** les données existantes sont mises à jour (pas de doublons)
**And** un log JSON confirme le succès
**And** les erreurs sont loggées clairement

---

### Story 3.2: Race Catalog Display

**As a** utilisateur,
**I want** voir la liste des courses disponibles,
**So that** je puisse choisir une course à analyser.

**Acceptance Criteria:**

**Given** des courses sont importées en base
**When** j'accède à la Race Library
**Then** je vois la liste des courses sous forme de cards
**And** chaque card affiche : nom GP, circuit, date, drapeau pays
**And** les courses sont groupées par saison
**And** la saison 2024 est affichée par défaut
**And** le chargement affiche un `<Spinner />`
**And** l'API retourne `{ "data": [...], "meta": { "total": N } }`

---

### Story 3.3: Race Search & Filtering

**As a** utilisateur,
**I want** rechercher et filtrer les courses,
**So that** je trouve rapidement la course qui m'intéresse.

**Acceptance Criteria:**

**Given** je suis sur la Race Library
**When** j'utilise les filtres
**Then** je peux filtrer par :
- Saison (dropdown)
- Circuit (dropdown avec autocomplete)
- Pilote (dropdown avec autocomplete)
**And** la recherche textuelle filtre par nom de GP ou circuit
**And** les filtres sont combinables
**And** les résultats se mettent à jour en temps réel (debounce 300ms)
**And** un message s'affiche si aucun résultat

---

### Story 3.4: Race Detail Page

**As a** utilisateur,
**I want** voir les détails d'une course,
**So that** je puisse commencer mon analyse.

**Acceptance Criteria:**

**Given** je suis sur la Race Library
**When** je clique sur une course
**Then** j'accède à la page détail avec :
- Header : nom GP, circuit, date, conditions météo
- Résumé : podium, fastest lap, nombre de tours
- Liste des pilotes avec positions finales
- Boutons d'action : "Race Rewind", "Strategy Time Machine"
**And** l'URL est `/races/{race_id}`
**And** la page est responsive

---

## Epic 4: Race Rewind

**Objectif :** Permettre aux utilisateurs de revivre une course tour par tour avec des visualisations interactives.

**FRs couverts :** FR4, FR5, FR6, FR7

### Story 4.1: Circuit Map Visualization

**As a** utilisateur,
**I want** voir les positions des pilotes sur la carte du circuit,
**So that** je visualise la course de manière intuitive.

**Acceptance Criteria:**

**Given** je suis sur la page Race Rewind d'une course
**When** la visualisation charge
**Then** je vois :
- Carte SVG du circuit (tracé)
- Marqueurs pour chaque pilote (couleur équipe)
- Position actuelle de chaque pilote sur le tracé
**And** les marqueurs sont cliquables pour voir les détails pilote
**And** la carte est responsive et zoomable
**And** un tooltip affiche nom pilote + position au survol
**And** la visualisation utilise D3.js

---

### Story 4.2: Lap-by-Lap Navigation

**As a** utilisateur,
**I want** naviguer tour par tour dans la course,
**So that** je puisse analyser chaque moment clé.

**Acceptance Criteria:**

**Given** je suis sur Race Rewind
**When** j'utilise les contrôles de navigation
**Then** je peux :
- Avancer/reculer d'un tour (boutons)
- Aller à un tour spécifique (input)
- Utiliser une barre de progression (slider)
- Lecture automatique avec vitesse ajustable (1x, 2x, 5x)
**And** les positions se mettent à jour en < 500ms (NFR4)
**And** le tour actuel est affiché clairement
**And** Play/Pause fonctionne correctement

---

### Story 4.3: Live Timing Display

**As a** utilisateur,
**I want** voir les temps et écarts de chaque pilote,
**So that** je comprenne la dynamique de la course.

**Acceptance Criteria:**

**Given** je suis sur Race Rewind à un tour donné
**When** les données s'affichent
**Then** je vois un tableau avec :
- Position
- Pilote (nom + numéro)
- Temps au tour (format 1:23.456)
- Écart au leader
- Temps secteurs (S1, S2, S3) avec couleurs
**And** le tableau est triable par colonne
**And** le meilleur temps au tour est mis en évidence
**And** les données correspondent exactement au tour sélectionné

---

### Story 4.4: Tire Status Visualization

**As a** utilisateur,
**I want** voir l'état des pneus de chaque pilote,
**So that** je comprenne les stratégies en cours.

**Acceptance Criteria:**

**Given** je suis sur Race Rewind
**When** les données pneus s'affichent
**Then** je vois pour chaque pilote :
- Type de gomme (Soft/Medium/Hard/Inter/Wet) avec couleur
- Âge des pneus (nombre de tours)
- Indicateur visuel d'usure
- Icône pit stop si arrêt ce tour
**And** l'historique des pit stops est accessible
**And** un résumé stratégie est visible
**And** les couleurs pneus suivent le standard F1

---

## Epic 5: Strategy Time Machine

**Objectif :** Permettre aux utilisateurs de tester des scénarios "Et si..." et visualiser l'impact stratégique.

**FRs couverts :** FR1, FR2, FR3

### Story 5.1: Simulation Form

**As a** utilisateur,
**I want** configurer un scénario de simulation,
**So that** je puisse tester une stratégie alternative.

**Acceptance Criteria:**

**Given** je suis sur Strategy Time Machine pour une course
**When** j'accède au formulaire de simulation
**Then** je peux sélectionner :
- Pilote (dropdown)
- Tour d'arrêt pit stop (slider ou input)
- Type de pneu pour le stint suivant
**And** les valeurs par défaut correspondent à la stratégie réelle
**And** le formulaire affiche un résumé de la stratégie réelle
**And** un bouton "Simuler" lance le calcul
**And** le formulaire est accessible aux utilisateurs payants uniquement (paywall)

---

### Story 5.2: Pit Stop Simulation Engine

**As a** utilisateur,
**I want** que le système calcule l'impact de mon scénario,
**So that** je voie les conséquences de la stratégie alternative.

**Acceptance Criteria:**

**Given** j'ai configuré un scénario valide
**When** je lance la simulation
**Then** le backend calcule :
- Temps pit stop estimé (moyenne équipe)
- Position de sortie des stands
- Trafic réel au moment de la sortie
- Delta temps vs stratégie réelle
**And** le calcul prend < 5 secondes (NFR1)
**And** les résultats sont mis en cache (Redis)
**And** l'API retourne `{ "data": { "exit_position": N, "traffic": [...], "delta_seconds": X.X } }`

---

### Story 5.3: Traffic Visualization

**As a** utilisateur,
**I want** voir visuellement où mon pilote ressort par rapport au trafic,
**So that** je comprenne l'impact stratégique de manière intuitive.

**Acceptance Criteria:**

**Given** la simulation est calculée
**When** les résultats s'affichent
**Then** je vois :
- Carte circuit avec position de sortie simulée
- Positions des autres pilotes au moment de la sortie
- Ligne de comparaison : position réelle vs simulée
- Animation montrant le "what-if" vs réalité
**And** les pilotes en trafic direct sont mis en évidence
**And** un tooltip explique l'impact
**And** la visualisation est claire sur mobile

---

### Story 5.4: Simulation Results Summary

**As a** utilisateur,
**I want** un résumé clair des résultats de simulation,
**So that** je puisse rapidement comprendre si ma stratégie était meilleure.

**Acceptance Criteria:**

**Given** la simulation est complète
**When** le résumé s'affiche
**Then** je vois :
- Comparaison avant/après en tableau
- Position sortie réelle vs simulée
- Temps gagné/perdu estimé
- Verdict visuel (mieux/pareil/pire avec couleur)
- Explication textuelle du résultat
**And** je peux sauvegarder/partager le scénario
**And** je peux lancer une nouvelle simulation facilement
**And** l'historique des simulations récentes est accessible

---

## Epic 6: Monétisation & Abonnements

**Objectif :** Permettre la conversion freemium vers payant et la gestion des abonnements.

**FRs couverts :** FR14, FR15, FR16, FR18

### Story 6.1: Paywall Component

**As a** utilisateur freemium,
**I want** voir clairement quelles fonctionnalités sont payantes,
**So that** je comprenne la valeur de l'abonnement.

**Acceptance Criteria:**

**Given** je suis connecté en tier freemium
**When** j'accède à Strategy Time Machine
**Then** je vois un paywall avec :
- Message clair : "Fonctionnalité Pro"
- Aperçu flou/désactivé de la fonctionnalité
- Bouton "Débloquer avec Pro"
- Liste des avantages Pro
**And** le composant `<PaywallRoute>` encapsule les pages payantes
**And** les utilisateurs Pro/Elite accèdent sans paywall
**And** Race Rewind basique reste accessible en freemium

---

### Story 6.2: Pricing Page

**As a** visiteur ou utilisateur freemium,
**I want** voir les plans tarifaires,
**So that** je puisse choisir l'abonnement qui me convient.

**Acceptance Criteria:**

**Given** j'accède à la page /pricing
**When** la page charge
**Then** je vois les 3 tiers :
- **Freemium** : Race Library, Race Rewind basique, gratuit
- **Pro** (9.99€/mois) : + Strategy Time Machine, + tous les filtres
- **Elite** (19.99€/mois) : + courses historiques complètes, + export
**And** chaque tier liste clairement les fonctionnalités incluses
**And** le tier actuel est mis en évidence si connecté
**And** les boutons CTA sont clairs
**And** la page est optimisée SEO

---

### Story 6.3: Stripe Checkout Integration

**As a** utilisateur,
**I want** payer mon abonnement de manière sécurisée,
**So that** je puisse accéder aux fonctionnalités premium.

**Acceptance Criteria:**

**Given** je clique sur "Choisir Pro" ou "Choisir Elite"
**When** je suis redirigé vers Stripe Checkout
**Then** :
- La session Stripe est créée côté backend
- Je peux payer par carte bancaire
- Après succès, je suis redirigé vers /success
- Mon tier est mis à jour en base de données
- Je reçois un email de confirmation
**And** le webhook Stripe `/webhooks/stripe` traite les événements
**And** les erreurs de paiement affichent un message clair
**And** la page /cancel gère les abandons

---

### Story 6.4: Subscription Management

**As a** utilisateur payant,
**I want** gérer mon abonnement,
**So that** je puisse modifier ou annuler si nécessaire.

**Acceptance Criteria:**

**Given** je suis abonné Pro ou Elite
**When** j'accède à la section abonnement de mon profil
**Then** je vois :
- Mon tier actuel et date de renouvellement
- Historique des paiements
- Bouton "Gérer l'abonnement" → Stripe Customer Portal
- Option d'upgrade (Pro → Elite)
- Option de downgrade/annulation
**And** les changements via Stripe Portal sont synchronisés via webhook
**And** l'annulation prend effet à la fin de la période payée
**And** le monitoring Sentry capture les erreurs de paiement (FR18)

---

## Summary

| Epic | Stories | FRs Covered |
|------|---------|-------------|
| Epic 1: Project Foundation | 4 | NFRs |
| Epic 2: Authentification & Profils | 4 | FR11, FR12, FR13 |
| Epic 3: Race Library | 4 | FR8, FR9, FR10, FR17 |
| Epic 4: Race Rewind | 4 | FR4, FR5, FR6, FR7 |
| Epic 5: Strategy Time Machine | 4 | FR1, FR2, FR3 |
| Epic 6: Monétisation & Abonnements | 4 | FR14, FR15, FR16, FR18 |

**Total: 6 Epics, 24 Stories, 18/18 FRs covered (100%)**

