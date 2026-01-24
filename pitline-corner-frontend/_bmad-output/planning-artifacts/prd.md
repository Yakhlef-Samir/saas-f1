---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping']
inputDocuments: []
workflowType: 'prd'
briefCount: 0
researchCount: 0
brainstormingCount: 0
projectDocsCount: 0
classification:
  projectType: 'web_app'
  domain: 'sports_entertainment'
  complexity: 'medium'
  projectContext: 'greenfield'
  strategicPivot: 'post-race/educational model to eliminate FOM licensing risk - roadmap to live timing once traction demonstrated'
---

# Product Requirements Document - saas-f1

**Author:** Samir
**Date:** 2026-01-12

## Success Criteria

### User Success

Le succès utilisateur du pitlane corner se mesure par des moments clés de révélation et de transformation de la compréhension :

**Le Moment "Aha!" :**
- **Principal :** Lorsque l'utilisateur teste son premier scénario "Et si..." et voit la visualisation concrète de l'impact stratégique (ex: simulation d'arrêt un tour plus tôt montrant la position de sortie et le trafic)
- **Secondaire :** Découverte de la visualisation interactive du Race Rewind avec toutes les données superposées
- **Validation :** Confirmation de son intuition stratégique ou compréhension d'une décision controversée via l'analyse télémétrique

**Émotions de Succès :**
- **Fierté intellectuelle :** "J'ai compris la stratégie mieux que les commentateurs"
- **Apprentissage profond :** "Maintenant je comprends POURQUOI Mercedes a fait ça"
- **Validation :** "Mon intuition était correcte"
- **Maîtrise :** Sentiment de contrôle sur la complexité de la course

**Session Réussie :**
- Analyse approfondie d'un événement stratégique critique avec conclusions étayées par les données
- Test de 3-5 scénarios "Et si..." différents pour explorer les alternatives
- Capacité à expliquer la stratégie gagnante/perdante à un ami en s'appuyant sur des visualisations concrètes
- Toutes les questions sur la course trouvent des réponses claires et visuelles

### Business Success

**Phase 1 (0-6 mois) - Validation Product-Market Fit :**
- **Utilisateurs inscrits :** 10 000 à 20 000 utilisateurs (création compte freemium)
- **Taux de conversion :** 3% à 5% freemium → payant
- **MRR :** 5 000€ à 10 000€ à la fin du 6ème mois
- **Engagement (DAU/MAU) :** 15% à 20%
- **Courses analysées :** 2-3 courses/mois par utilisateur payant
- **Churn mensuel :** < 8% pour abonnements payants

**Phase 2 (12 mois) - Justifier Négociation FOM :**
- **Utilisateurs payants actifs :** 5 000 à 10 000
- **MRR :** 25 000€ à 50 000€
- **Rétention mensuelle :** < 5% de churn
- **Engagement profond :** 30-45 minutes par session en moyenne
- **Preuve sociale :** Communauté active générant du contenu et des discussions basées sur les analyses

**North Star Metric :**
Le **Revenu Mensuel Récurrent (MRR) des abonnements payants** - métrique holistique reflétant l'acquisition, la conversion, la rétention et la valeur perçue.

### Technical Success

**Performance :**
- Simulations complexes (recalcul course complète) : < 5 secondes
- Simulations simples (position sortie stands) : 2-3 secondes
- Fluidité interactive maintenue sans rupture du fil de pensée

**Fiabilité des Données :**
- Exactitude : 99.9% (avec disclaimer discret sur sources publiques)
- Sources : FastF1 (données officielles publiques)
- Crédibilité maximale pour analyses stratégiques

**Disponibilité du Service :**
- MVP : 99% uptime (7h downtime/mois)
- Production : 99.9% uptime (43min downtime/mois)
- Objectif : disponibilité quasi-constante pour service payant

**Scalabilité :**
- MVP (0-6 mois) : 500-1 000 utilisateurs simultanés
- Architecture horizontalement scalable pour croissance future
- Gestion des pics post-GP (lundi/mardi suivant course)

### Measurable Outcomes

**Validation du Pivot Post-Race :**
- Élimination du risque juridique FOM : ✅ Complet
- Complexité technique réduite (haute → moyenne) : ✅ Confirmé
- Lancement légal immédiat possible : ✅ Validé

**Traction Démontrable pour Négociation Future :**
- Base utilisateurs payants de 5K-10K à 12 mois comme levier de négociation
- MRR de 25K-50K€ prouvant la capacité à financer licence temps réel
- Communauté active et engagement profond comme preuve de valeur pour écosystème F1

## Product Scope

### MVP - Minimum Viable Product (0-6 mois)

**Objectif :** Prouver la proposition de valeur principale : transformer la compréhension de la stratégie F1 via analyse post-course interactive.

**Fonctionnalités Essentielles :**

1. **Strategy Time Machine** (Killer Feature)
   - Simulation de scénarios "Et si..." pour pilotes sélectionnés
   - Sélection : pilote, tour d'arrêt, type de pneu
   - Visualisation : position de sortie stands vs trafic réel
   - Calcul : temps d'arrêt moyen + temps de sortie stands

2. **Post-Race Analysis Dashboard**
   - **Race Rewind Interactif :** Carte circuit avec positions, écarts, état pneus (gomme/âge), arrêts stands tour par tour
   - Navigation : tour par tour ou barre de lecture
   - **Live Timing Historique :** Temps au tour, secteurs, écarts réels par pilote/tour

3. **Race Library**
   - Toutes les courses saison 2024 (~24 courses)
   - 5-10 courses emblématiques saisons antérieures (Monaco 2023, Silverstone 2022, etc.)
   - Accès données via FastF1

**Exclusions du MVP (intentionnelles) :**
- Annotations/explications éducatives automatiques → Growth
- Comparaisons multi-pilotes côte à côte → Growth
- Fonctionnalités communautaires → Growth

### Growth Features (Post-MVP, 6-18 mois)

**Objectif :** Approfondir l'engagement, élargir l'attrait, renforcer la rétention.

**Fonctionnalités de Croissance :**

1. **Comparaisons Multi-Pilotes Avancées**
   - Superposition télémétrie (vitesse, accélération, frein, régime) entre 2-3 pilotes
   - Visualisation "Gap-to-Rival" sur période donnée

2. **Analyse Statistique Avancée**
   - Patterns de stratégies par équipe/circuit/météo
   - Performance et dégradation des pneus par gomme/pilote

3. **Virtual Pit Wall Academy** (Contenu Éducatif Premium)
   - Tutoriels interactifs sur concepts stratégiques ("Maîtriser l'Undercut")
   - Masterclasses vidéo avec experts sur ingénierie de course

4. **Fonctionnalités Communautaires**
   - Partage de scénarios "Et si..." et rapports d'analyse
   - Discussions et commentaires sur analyses de course

5. **Comparaisons Multi-Saisons**
   - Performance pilote/équipe sur même circuit année après année

### Vision (Future, 18+ mois)

**Objectif :** Réaliser le plein potentiel avec temps réel et devenir plateforme incontournable.

**Fonctionnalités Vision :**

1. **Virtual Pit Wall LIVE** (Tier Premium)
   - Données temps réel via licence FOM/fournisseur agréé
   - Simulateur stratégie en temps réel pendant la course
   - Alertes stratégiques live (opportunités undercut/overcut, fenêtres optimales)

2. **Intégration F1 TV Pro**
   - Synchronisation flux vidéo
   - Overlays interactifs (si accord trouvé)

3. **API pour Développeurs Tiers**
   - Modèle B2B pour outils complémentaires et visualisations tierces

4. **Intégrations Écosystème**
   - Discord Bots (analyses rapides, alertes communautaires)
   - Twitch Overlays (enrichissement contenu streamers F1)

5. **Analyse Prédictive Avancée**
   - IA pour prédiction incidents, Safety Car, performances futures

## User Journeys

### Personas Principales

#### 1. Alex, l'Analyste Stratégique (Utilisateur Principal)

**Profil :**
- 32 ans, Ingénieur Logiciel / Consultant Data
- Niveau F1 très élevé - connaît undercut, overcut, dégradation des pneus
- Abonné F1 TV Pro, utilise multi-écrans, participe à Reddit/Discord
- **Objectif :** Comprendre en profondeur les décisions stratégiques, valider ses intuitions, apprendre des courses passées
- **Frustrations :** Manque d'outils interactifs pour tester des scénarios, difficulté à obtenir des données précises post-course

**Journey : Analyse Post-GP**

*Scénario :* Alex vient de regarder le Grand Prix et veut comprendre pourquoi la stratégie de l'équipe X a échoué.

1. **Déclencheur** (Curiosité, frustration) - Fin du GP, questions stratégiques non résolues
2. **Accès** (Anticipation) - Ouvre Virtual Pit Wall via application web
3. **Sélection** (Facilité) - Trouve le GP dans Race Library
4. **Exploration** (Immersion) - Lance Race Rewind interactif, revoit les moments clés
5. **Analyse** (Engagement) - Identifie arrêt aux stands critique, lance simulateur "Et si..."
6. **Révélation** (Moment "Aha!", fierté intellectuelle) - Visualise où son pilote aurait ressorti, compare avec réalité
7. **Partage** (Satisfaction) - Capture d'écran pour Discord, valide ses découvertes
8. **Conclusion** (Apprentissage accompli) - Ferme l'app, satisfait d'avoir compris

**Capacités requises révélées :**
- Race Library avec recherche/filtre efficace
- Race Rewind interactif avec navigation tour-par-tour
- Simulateur "Et si..." avec visualisation trafic réel
- Export/partage de visualisations

#### 2. Marc, l'Explorateur (Utilisateur Freemium)

**Profil :**
- 29 ans, Marketing / Commercial
- Niveau F1 élevé, mais sensible au prix et à la preuve de valeur
- **Objectif :** Évaluer la valeur de l'outil avant engagement financier
- **Comportement :** Explore activement le freemium pour comprendre le ROI du payant

**Journey : Découverte et Conversion**

*Scénario :* Marc découvre Virtual Pit Wall et évalue s'il vaut un abonnement payant.

1. **Découverte** (Curiosité) - Voit mention sur réseaux sociaux
2. **Inscription** (Intérêt, espoir) - S'inscrit freemium via landing page
3. **Exploration** (Découverte) - Navigue Race Library, lance Race Rewind
4. **Friction positive** (Frustration désirante) - Tente simulateur "Et si..." → paywall
5. **Évaluation** (Réflexion) - Compare fonctionnalités gratuites vs payantes
6. **Conversion** (Motivation, engagement) - S'abonne pour débloquer Strategy Time Machine

**Capacités requises révélées :**
- Onboarding freemium clair et engageant
- Fonctionnalités de base accessibles (Race Rewind limité)
- Paywall stratégique sur killer feature (simulateur)
- Page tarification claire avec comparatif valeur
- Processus d'abonnement fluide (Stripe/PayPal)

#### 3. Chloé, la Fan Curieuse (Utilisateur Occasionnel)

**Profil :**
- 24 ans, Étudiante / Jeune Professionnelle
- Niveau F1 moyen - connaît les bases, parfois dépassée par la complexité
- **Objectif :** Comprendre mieux sans devenir experte
- **Comportement :** Utilise freemium, regarde replays marquants, cherche explications simples

**Journey : Apprentissage Éducatif**

*Scénario :* Chloé veut comprendre une course complexe qu'elle a trouvée intéressante.

1. **Question** (Confusion, curiosité) - "Pourquoi ce pilote a perdu autant de places ?"
2. **Recherche** (Espoir) - Ouvre Virtual Pit Wall, sélectionne la course
3. **Replay** (Compréhension visuelle) - Race Rewind pour revoir moment clé
4. **Compréhension** (Moment "Aha!", apprentissage) - Voit impact d'un arrêt mal timé
5. **Satisfaction** (Clarté) - Se sent éclairée sur la course

**Capacités requises révélées :**
- Interface intuitive pour utilisateurs moins techniques
- Visualisations claires et auto-explicatives
- Race Rewind simple d'utilisation
- Potentiel pour annotations éducatives (growth feature)

### Personas Opérationnelles

#### 4. Sam, l'Opérateur Système (Administrateur Plateforme)

**Profil :**
- 38 ans, DevOps Engineer / Administrateur Système
- **Objectif :** Assurer 99.9% uptime et performance plateforme
- **Tâches :** Surveillance logs, déploiements, optimisation DB, gestion incidents

**Besoins Back-Office :**
- **Monitoring :** Tableau de bord temps réel (uptime, latence API, ressources serveurs)
- **Alertes :** Notifications automatiques dysfonctionnements (API FastF1 down, erreurs DB)
- **Logs :** Accès et analyse logs applicatifs pour débogage
- **Gestion données :** Import et validation données courses (FastF1), maintenance Race Library
- **Analytics :** Métriques techniques (performance simulations, utilisation bande passante)

#### 5. Léa, l'Experte Utilisateur (Support Client)

**Profil :**
- 27 ans, Spécialiste Support Client
- **Objectif :** Résoudre problèmes utilisateurs, recueillir retours
- **Tâches :** Tickets support, création FAQ, remontée bugs

**Besoins Back-Office :**
- **Gestion utilisateurs :** Création/modification comptes, gestion abonnements, historique paiements
- **Ticketing :** Système intégré gestion demandes support
- **Base connaissances :** Outil création/gestion FAQ et articles d'aide
- **Communication :** Envoi notifications ciblées (nouvelles courses, mises à jour)
- **Reporting :** Métriques support (volume tickets, temps résolution, satisfaction)

### Personas Futures (Vision, 18+ mois)

#### 6. David, le Développeur Indépendant (API Consumer)

**Profil :**
- 35 ans, Développeur Web / Data Scientist
- **Objectif :** Intégrer données Virtual Pit Wall dans ses projets (bots Discord, apps mobiles)
- **Besoins :** API fiables, documentation complète, sandbox de test

**Capacités requises (Phase Vision) :**
- API REST/GraphQL bien documentée
- Authentification OAuth/API keys
- Rate limiting et quotas par tier
- Webhooks pour notifications
- Portal développeurs avec exemples de code

#### 7. Sophie, la Créatrice de Contenu (B2B Média)

**Profil :**
- 30 ans, Journaliste / Youtuber F1
- **Objectif :** Enrichir articles/vidéos avec analyses et visualisations
- **Besoins :** Génération rapide de graphiques, comparaisons télémétrie, scénarios "Et si..."

**Capacités requises (Phase Vision) :**
- Export haute résolution de visualisations
- Templates personnalisables pour branding
- API B2B avec accès étendu
- White-label potentiel pour broadcasters

### Journey Requirements Summary

Les parcours utilisateurs révèlent les capacités essentielles suivantes :

**MVP (0-6 mois) :**
1. **Authentification & Onboarding** - Inscription freemium/payante, gestion profils
2. **Race Library** - Catalogue 24 courses 2024 + 5-10 emblématiques, recherche/filtre
3. **Race Rewind Interactif** - Visualisation tour-par-tour, carte circuit, positions/pneus/écarts
4. **Strategy Time Machine** - Simulateur "Et si..." avec visualisation position sortie + trafic
5. **Paywall & Conversion** - Freemium limité → payant sur killer features
6. **Paiements** - Intégration Stripe/PayPal pour abonnements

**Back-Office MVP :**
1. **Admin Platform** - Monitoring uptime/performance, alertes système, logs, gestion données courses
2. **Support Tools** - Gestion utilisateurs/abonnements, ticketing, base connaissances
3. **Analytics** - Dashboard métriques business (MRR, utilisateurs actifs, conversion, rétention)

**Growth (6-18 mois) :**
- Comparaisons multi-pilotes
- Analyse statistique avancée
- Virtual Pit Wall Academy
- Fonctionnalités communautaires (partage scénarios, discussions)
- Comparaisons multi-saisons

**Vision (18+ mois) :**
- API développeurs tiers
- Intégrations B2B médias/broadcasters
- Live timing (si licence FOM obtenue)

## Innovation & Novel Patterns

### Detected Innovation Areas

1. **Live Traffic Predictor (Nouvelle Interaction)**
   - Visualisation interactive position sortie stands avec trafic réel synchronisé
   - Combinaison unique : données historiques FastF1 + moteur simulation stratégique + visualisation trafic temps réel
   - Barrières à l'entrée : Ingestion/sync données complexe + algorithme simulation trafic précis + UX intuitive

2. **Pivot Stratégique Post-Race/Éducatif**
   - Création niche nouvelle vs concurrence temps réel impossible
   - "Maîtrisez l'Art de la Stratégie F1" (éducatif) vs "Suivez en temps réel" (live)
   - Élimine risque existentiel licence FOM

3. **Strategy Time Machine**
   - Métaphore "remonter le temps" pour tester scénarios alternatifs
   - Pattern similaire Chess.com (analyse post-partie + "Et si...") appliqué à F1

### Market Context & Competitive Landscape

**État actuel du marché :**
- Outils grand public (F1 Insights AWS, Live Timing) : Prédictions statistiques globales, pas de visualisation trafic interactive
- Outils professionnels écuries : Possèdent cette fonctionnalité mais inaccessibles au public
- Tentatives passées (F1nsight, Fastlytics) : Visualisation données sans dimension interactive "Et si..." ou modèle économique solide

**Précédents dans autres domaines :**
- **Chess.com** : Analyse post-partie avec moteur Stockfish pour tester variantes - précédent le plus proche
- **Sailing (SailNjord, Sailing Tactician)** : Analyse traces GPS post-course pour amélioration
- **Cyclisme (Cycling Analytics, TrainingPeaks)** : Analyses post-course poussées télémétrie/puissance
- **Échecs** : Validation forte du pattern "analyse post-événement interactive"

### Validation Approach

**Métriques de validation du pivot éducatif :**

1. **Engagement Post-GP**
   - Taux de complétion simulations "Et si..."
   - Temps passé lundi/mardi > dimanche GP (prouve besoin analyse distinct du live)

2. **Preuve sociale**
   - Partages sociaux (Reddit, Twitter, Discord) de scénarios/conclusions
   - Discussions générées basées sur analyses Virtual Pit Wall

3. **Impact apprentissage**
   - Enquêtes qualitatives : outil améliore-t-il réellement compréhension ?
   - Taux de rétention mensuelle comme proxy satisfaction

**Signal clair de succès :** Utilisateurs passent plus de temps sur l'app lundi/mardi post-GP que pendant le GP - valide que besoin analyse profonde ≠ besoin suivi direct

### Risk Mitigation

**Risque principal :** Fans F1 trop focalisés sur immédiateté du direct, perdent intérêt post-course

**Plans de secours (Fallback) :**

1. **Pivot B2B Créateurs de Contenu**
   - Cible : YouTubers, podcasters, journalistes F1
   - Besoin constant : visuels et analyses pour débriefings
   - Monétisation : Abonnement professionnel + API

2. **Gamification (Fantasy Strategy)**
   - Transformation en jeu gestion stratégique
   - Points pour prédictions correctes basées sur analyses
   - Engagement communautaire et compétition

3. **Expansion Autres Sports Mécaniques**
   - WEC, IndyCar, Formule E
   - Stratégie également complexe
   - Droits données potentiellement moins restrictifs

**Transition temps réel :**
- Traction démontrée (5-10K payants, 25-50K€ MRR) = levier négociation FOM
- Roadmap claire 18+ mois pour Virtual Pit Wall LIVE

## Web Application Specific Requirements

### Project-Type Overview

Virtual Pit Wall est une application web SaaS B2C hautement interactive nécessitant une architecture optimisée pour les visualisations de données complexes, les simulations en temps réel côté client, et une expérience utilisateur fluide.

### Technical Architecture Considerations

**Application Architecture : Single-Page Application (SPA)**

Le Virtual Pit Wall sera construit comme une **Single-Page Application (SPA)** pour offrir l'expérience interactive et fluide nécessaire aux fonctionnalités clés :

- **Justification :** Race Rewind interactif, Strategy Time Machine et tableaux de bord dynamiques exigent des transitions instantanées sans rechargement de page
- **Frameworks recommandés :** React, Vue.js ou Svelte
- **Avantages :**
  - Transitions fluides entre visualisations
  - Gestion d'état complexe pour simulations
  - Performance optimale après chargement initial
  - Expérience proche d'une application native

### Browser Support Matrix

**Navigateurs Desktop :**
- Google Chrome (2 dernières versions majeures)
- Mozilla Firefox (2 dernières versions majeures)
- Microsoft Edge (2 dernières versions majeures)
- Apple Safari (2 dernières versions majeures)

**Navigateurs Mobile (Crucial pour MVP) :**
- Safari iOS (2 dernières versions)
- Chrome Android (2 dernières versions)

**Justification :** L'utilisateur cible "Data-Driven Enthusiast" utilise souvent un second écran (tablette/smartphone) pendant l'analyse. Le support mobile est indispensable pour l'engagement, même si l'expérience optimale reste sur grand écran.

### SEO Strategy

**Approche Hybride Public/Privé :**

1. **Landing Pages & Site Marketing (SEO Critique)**
   - Optimisation on-page/off-page pour mots-clés : "analyse stratégie F1", "simulateur pit stop F1", "comprendre stratégie course F1"
   - Server-Side Rendering (SSR) ou pré-rendu pour performances SEO

2. **Pages Publiques Éducatives (Potentiel Viral)**
   - Analyses de GP célèbres accessibles publiquement (ex: "L'undercut expliqué : Analyse GP Monaco 2024")
   - Extraits interactifs ou visualisations statiques comme vitrine
   - Stratégie content marketing pour acquisition organique

3. **Contenu Freemium Public**
   - Articles blog sur stratégie F1
   - Tutoriels de base
   - Conversion vers inscription

4. **Application Authentifiée (Pas de SEO)**
   - Contenu derrière login non optimisé pour moteurs de recherche

### Performance Targets

**Temps de Chargement :**
- Chargement initial SPA : < 3 secondes (desktop), < 5 secondes (mobile 4G)
- Simulations Strategy Time Machine : < 5 secondes (complexes), 2-3 secondes (simples)
- Navigation Race Rewind : < 500ms entre tours

**Scalabilité :**
- MVP : 500-1 000 utilisateurs simultanés
- Architecture horizontalement scalable (cloud-native)

### Real-Time Communication

**MVP (Post-Race) : Pas de Temps Réel**
- Données historiques chargées à la demande
- Notifications système via polling léger ou push notifications standard
- Pas de WebSockets/SSE nécessaires

**Phase Vision (Virtual Pit Wall LIVE) : Temps Réel Critique**
- WebSockets ou Server-Sent Events (SSE) pour :
  - Diffusion live données télémétrie
  - Positions en temps réel
  - Prédictions stratégiques pendant la course
- Architecture pub/sub pour scalabilité

### Accessibility Level

**Cible : WCAG 2.1 Level AA**

**Justification :**
- Standard industry recommandé
- Conformité légale EU et internationales
- Élargissement audience (déficiences visuelles, auditives, motrices, cognitives)
- Meilleure UX pour tous (contrastes, navigation clavier)
- Image de marque positive (engagement inclusion)

**Implémentation :**
- Tests accessibilité automatisés (axe-core, Lighthouse)
- Tests manuels lecteurs d'écran (NVDA, JAWS, VoiceOver)
- Navigation complète au clavier
- Contrastes couleurs conformes
- Textes alternatifs pour visualisations

### Responsive Design

**Breakpoints principaux :**
- Mobile : 320px - 767px (crucial)
- Tablet : 768px - 1023px (second écran pendant GP)
- Desktop : 1024px+ (expérience optimale)

**Adaptations mobile :**
- Race Rewind simplifié pour petits écrans
- Tableaux de bord compactés
- Simulations accessibles mais UX optimisée pour tablette/desktop

### Implementation Considerations

**Stack Technique Recommandé MVP :**
- **Frontend :** React/Vue + TypeScript
- **State Management :** Redux/Zustand (React) ou Pinia (Vue)
- **Styling :** Tailwind CSS + composants accessibles
- **Data Visualization :** D3.js ou Recharts pour graphiques interactifs
- **Build Tool :** Vite pour performances dev
- **Backend API :** Node.js/Express ou Python/FastAPI
- **Database :** PostgreSQL (données relationnelles) + Redis (cache)
- **Hosting :** Vercel/Netlify (frontend) + AWS/GCP (backend/DB)

**Intégration FastF1 :**
- Service backend dédié pour ingestion données FastF1
- Transformation et validation données avant stockage
- API REST pour exposition données au frontend

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**Approche MVP : Hybride Experience + Problem-Solving**

Le Virtual Pit Wall adopte une approche MVP hybride qui :
- **Résout le problème core immédiatement** : Permet de comprendre et tester les stratégies F1 post-course
- **Offre une expérience complète** : Visualisations, simulations et analyses fonctionnelles de bout en bout
- **Limite le périmètre intelligemment** : Focus sur saison 2024 et courses emblématiques, sans comparaisons multi-pilotes avancées

Cette approche garantit que les early adopters (Alex, l'Analyste Stratégique) obtiennent une valeur immédiate et complète, tout en maintenant un périmètre de développement réaliste.

**Ressources MVP :**
- **Équipe recommandée :** 2-3 développeurs full-stack + 1 UX/UI designer
- **Durée estimée :** 3-4 mois de développement
- **Compétences clés :** React/Vue, TypeScript, D3.js/visualisation, API REST, PostgreSQL, intégration FastF1

### MVP Feature Set (Phase 1 : 0-6 mois)

**Core User Journeys Supportés :**

1. **Alex, l'Analyste Stratégique (Priorité 1)**
   - Journey complet : Analyse post-GP avec simulations "Et si..."
   - Capacités : Race Rewind + Strategy Time Machine + Race Library

2. **Marc, l'Explorateur Freemium (Priorité 1)**
   - Journey complet : Découverte freemium → conversion payant
   - Capacités : Onboarding + paywall stratégique + processus abonnement

3. **Chloé, la Fan Curieuse (Priorité 2)**
   - Journey supporté naturellement : Si Alex et Marc sont satisfaits, Chloé aussi
   - Capacités : Interface intuitive + Race Rewind accessible

**Must-Have Capabilities :**

1. **Strategy Time Machine** (Killer Feature)
   - Simulation scénarios "Et si..." pour pilotes sélectionnés
   - Visualisation position sortie stands vs trafic réel
   - Calcul temps d'arrêt + temps de sortie
   - **Sans cette fonctionnalité, pas de différenciation → CRITIQUE**

2. **Post-Race Analysis Dashboard**
   - Race Rewind interactif avec carte circuit
   - Live Timing historique (temps au tour, secteurs, écarts)
   - Visualisation état pneus (gomme, âge, arrêts stands)
   - Navigation tour par tour
   - **Fournit contexte nécessaire aux simulations → CRITIQUE**

3. **Race Library**
   - Toutes les courses saison 2024 (~24 courses)
   - 5-10 courses emblématiques saisons antérieures
   - Recherche et filtrage efficace
   - **Contenu nécessaire pour valeur produit → CRITIQUE**

4. **Authentification & Gestion Utilisateurs**
   - Inscription freemium/payante
   - Gestion profils utilisateurs
   - Système de sessions sécurisé

5. **Paywall & Monétisation**
   - Freemium limité (Race Rewind basique)
   - Paywall sur Strategy Time Machine
   - Intégration Stripe/PayPal pour abonnements
   - Gestion abonnements (Pro/Elite)

6. **Back-Office Essentiel (Simplifié pour MVP)**
   - **Monitoring** : Outils SaaS tiers (Datadog/Sentry) plutôt que tableau de bord custom
   - **Gestion abonnements** : Interface admin Stripe + scripts manuels si nécessaire
   - **Analytics** : Google Analytics + Stripe dashboard + Mixpanel pour métriques produit
   - **Support** : Zendesk/Intercom pour ticketing
   - **Gestion données courses** : Scripts CLI pour import FastF1 + validation manuelle

**Approche Pragmatique Back-Office :**
Focus 100% ressources dev sur expérience utilisateur final pour MVP. Back-office custom sera développé en Phase 2 une fois traction démontrée.

### Post-MVP Features

**Phase 2 : Growth (6-18 mois)**

**Objectif :** Approfondir l'engagement, élargir l'attrait, renforcer la rétention

**Fonctionnalités de Croissance :**

1. **Comparaisons Multi-Pilotes Avancées**
   - Superposition télémétrie (vitesse, accélération, frein) entre 2-3 pilotes
   - Visualisation "Gap-to-Rival" sur période donnée
   - Analyse comparative tour par tour

2. **Analyse Statistique Avancée**
   - Patterns de stratégies par équipe/circuit/météo
   - Performance et dégradation des pneus par gomme/pilote
   - Prédictions basées sur historique

3. **Virtual Pit Wall Academy** (Contenu Éducatif Premium)
   - Tutoriels interactifs sur concepts stratégiques
   - Masterclasses vidéo avec experts
   - Certifications/badges pour gamification

4. **Fonctionnalités Communautaires**
   - Partage de scénarios "Et si..." et rapports d'analyse
   - Discussions et commentaires sur analyses de course
   - Classements/leaderboards pour engagement

5. **Comparaisons Multi-Saisons**
   - Performance pilote/équipe sur même circuit année après année
   - Évolution des stratégies dans le temps

6. **Back-Office Custom Complet**
   - Tableau de bord admin intégré
   - Gestion avancée utilisateurs
   - Analytics business détaillé
   - Automatisation gestion contenu

**Phase 3 : Expansion (18+ mois)**

**Objectif :** Réaliser le plein potentiel avec temps réel et devenir plateforme incontournable

**Fonctionnalités Vision :**

1. **Virtual Pit Wall LIVE** (Tier Premium)
   - **Prérequis :** Licence FOM/fournisseur agréé obtenue
   - Données temps réel (live timing, télémétrie, positions)
   - Simulateur stratégie en temps réel pendant la course
   - Alertes stratégiques live (opportunités undercut/overcut)
   - Architecture WebSockets/SSE

2. **API pour Développeurs Tiers** (Modèle B2B)
   - API REST/GraphQL documentée
   - Authentification OAuth/API keys
   - Rate limiting et quotas par tier
   - Portal développeurs avec sandbox

3. **Intégrations Écosystème**
   - Discord Bots (analyses rapides, alertes communautaires)
   - Twitch Overlays (enrichissement contenu streamers F1)
   - Partenariats broadcasters (Sky Sports, Canal+)

4. **Intégration F1 TV Pro**
   - Synchronisation flux vidéo
   - Overlays interactifs (si accord trouvé)

5. **Analyse Prédictive Avancée**
   - IA pour prédiction incidents, Safety Car
   - Prédiction performances futures pilotes/équipes

### Risk Mitigation Strategy

**Risques Techniques & Mitigations**

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| **Complexité moteur simulation** | Élevé | Moyen | Prototyper algorithme simulation tôt, valider précision avec données réelles, itération rapide |
| **Performance visualisations** | Moyen | Moyen | Utiliser librairies éprouvées (D3.js), optimisation progressive, tests de charge |
| **Fiabilité données FastF1** | Moyen | Faible | Validation et nettoyage données à l'ingestion, fallback manuel si nécessaire, monitoring qualité données |
| **Scalabilité pics utilisateurs** | Moyen | Moyen | Architecture cloud-native (auto-scaling), tests de charge progressifs, capacité buffer 2x prévisions |

**Risques Marché & Validations**

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| **Fans préfèrent temps réel vs post-race** | Élevé | Moyen | Validation : Mesurer temps passé lundi/mardi vs dimanche GP. Signal clair si engagement post-GP > engagement live. Plan B : Pivot B2B créateurs |
| **Taux conversion freemium→payant faible** | Élevé | Moyen | Optimisation funnel conversion, A/B testing paywall, amélioration onboarding freemium, offres promotionnelles ciblées |
| **Rétention utilisateurs insuffisante** | Élevé | Faible | Contenu régulier (nouvelles courses), amélioration continue features, engagement communautaire, contenu éducatif |

**Validation Approach :**
- **Phase 1 (0-3 mois)** : Beta fermée avec 50-100 early adopters hardcore fans (Reddit r/F1Technical)
- **Phase 2 (3-6 mois)** : Lancement public freemium, mesure métriques conversion et engagement
- **Phase 3 (6-12 mois)** : Optimisation product-market fit basée sur données réelles

**Risques Ressources & Contingences**

| Risque | Impact | Probabilité | Mitigation |
|--------|--------|-------------|------------|
| **Délais développement sous-estimés** | Moyen | Élevé | Buffer 20% sur estimations, MVP encore plus lean si nécessaire (10-15 courses au lieu de 24), releases incrémentales |
| **Équipe dev trop petite** | Élevé | Moyen | Minimum : 2 devs full-stack. Priorisation ruthless features, utilisation librairies/SaaS tiers pour back-office |
| **Budget marketing insuffisant** | Moyen | Moyen | Stratégie organique (Reddit, Discord, Twitter F1), content marketing (analyses publiques virales), partenariats micro-influenceurs |

**Contingency Plan si Ressources Réduites :**
- **MVP Ultra-Lean** : 10-15 courses + Strategy Time Machine + Race Rewind basique
- **Back-office 100% tiers** : Stripe admin + Google Analytics + Zendesk + Scripts manuels
- **Launch progressif** : Beta privée → Early access payant → Public freemium
