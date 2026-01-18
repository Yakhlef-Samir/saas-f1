---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-core-experience', 'step-04-emotional-response', 'step-05-inspiration', 'step-06-design-system', 'step-07-defining-experience', 'step-08-visual-foundation']
inputDocuments: ['_bmad-output/planning-artifacts/prd.md', '_bmad-output/planning-artifacts/architecture.md', '_bmad-output/planning-artifacts/epics.md', '_bmad-output/project-context.md']
workflowType: 'ux-design'
project_name: 'Pitline Corner'
user_name: 'Samir'
date: '2026-01-16'
---

# UX Design Specification - Pitline Corner

**Author:** Samir
**Date:** 2026-01-16

---

## Executive Summary

### Project Vision

Pitline Corner est une plateforme SaaS B2C d'analyse stratégique F1 post-course, positionnée sur le créneau éducatif/analytique. La killer feature "Strategy Time Machine" permet aux utilisateurs de tester des scénarios "Et si..." et visualiser l'impact stratégique de manière intuitive.

L'objectif UX principal est de transformer des données F1 complexes en insights visuels accessibles, tout en offrant la profondeur d'analyse attendue par les fans passionnés.

### Target Users

**Persona Principal : Alex, l'Analyste Stratégique**
- Fan F1 expert (32 ans, ingénieur)
- Cherche à valider ses intuitions et comprendre les décisions controversées
- Utilise multi-écrans, participe à Reddit/Discord
- Prêt à payer pour des outils d'analyse avancés

**Persona Secondaire : Marc, l'Explorateur Freemium**
- Fan F1 élevé mais sensible au prix (29 ans, marketing)
- Évalue la valeur avant engagement financier
- Besoin de voir clairement le ROI du payant

**Persona Tertiaire : Chloé, la Fan Curieuse**
- Fan F1 niveau moyen (24 ans, étudiante)
- Parfois dépassée par la complexité stratégique
- Cherche des explications visuelles claires

### Key Design Challenges

1. **Gestion de la complexité informationnelle** - Présenter temps au tour, secteurs, pneus, positions, écarts sans submerger l'utilisateur
2. **Écart d'expertise** - Servir à la fois Alex (expert) et Chloé (intermédiaire) avec la même interface
3. **Visualisations mobile-first** - Adapter les cartes circuit et graphiques complexes pour écrans tactiles
4. **Conversion freemium subtile** - Montrer la valeur Pro sans créer de frustration bloquante
5. **Navigation temporelle massive** - Permettre d'explorer 50-70 tours de course de manière fluide

### Design Opportunities

1. **Progressive disclosure** - Interface qui s'adapte au niveau d'expertise et révèle la complexité progressivement
2. **Storytelling visuel** - Transformer les données brutes en narration de course engageante
3. **Comparaison immédiate** - Visualisation avant/après pour les simulations qui crée le moment "Aha!"
4. **Micro-éducation contextuelle** - Expliquer les concepts F1 (undercut, dégradation) au moment pertinent

## Core User Experience

### Defining Experience

L'expérience core de Pitline Corner se résume à une action principale : **tester un scénario stratégique "Et si..." et visualiser instantanément l'impact sur la position de sortie des stands par rapport au trafic réel**.

Cette action représente le moment "Aha!" qui différencie le produit. La boucle d'expérience complète :
1. Sélectionner une course dans la Race Library
2. Identifier un moment stratégique clé via Race Rewind
3. Configurer et lancer une simulation "Et si..."
4. Voir le résultat visuel comparatif (réalité vs simulation)
5. Comprendre l'impact stratégique et valider/infirmer ses intuitions

### Platform Strategy

**Web Responsive First**
- Application web accessible sans installation
- Optimisée desktop (expérience principale d'analyse approfondie)
- Mobile crucial (second écran pendant l'analyse, consultations rapides)
- Pas de mode offline requis (données historiques uniquement)

**Breakpoints responsive :**
- Mobile : 320px - 767px (visualisations simplifiées, navigation tactile)
- Tablet : 768px - 1023px (second écran idéal, visualisations complètes)
- Desktop : 1024px+ (expérience optimale, multi-panneaux)

**Interactions :**
- Desktop : Mouse/keyboard avec raccourcis pour power users
- Mobile/Tablet : Touch-first avec gestures intuitives (swipe entre tours)

### Effortless Interactions

**Navigation temporelle**
- Slider fluide pour parcourir 50-70 tours sans latence perceptible (< 500ms)
- Raccourcis clavier : flèches gauche/droite pour ±1 tour
- Points d'intérêt auto-détectés (pit stops, dépassements) en surbrillance

**Configuration simulation**
- Maximum 3 choix : Pilote → Tour d'arrêt → Type de pneu
- Valeurs par défaut intelligentes basées sur la stratégie réelle
- Bouton "Simuler" unique, résultat en < 5 secondes

**Compréhension des données**
- Tooltips contextuels au survol (desktop) ou tap long (mobile)
- Codes couleur F1 standards pour les pneus (rouge/jaune/blanc)
- Légendes intégrées, pas de pages d'aide séparées

**Recherche de course**
- Filtres visuels par saison (carrousel) et circuit (cartes)
- Pas de recherche textuelle obligatoire
- Suggestions basées sur courses populaires/récentes

### Critical Success Moments

**1. Premier lancement de simulation (make-or-break)**
Le moment le plus critique. L'utilisateur doit instantanément :
- Voir où son pilote aurait ressorti (position sur la piste)
- Comprendre le trafic à ce moment (autres pilotes visibles)
- Saisir l'impact (mieux/pareil/pire) en un coup d'œil
Si ce moment échoue, la conversion Pro est compromise.

**2. Validation de l'intuition**
Quand la simulation confirme ce que l'utilisateur suspectait, créer un feedback positif : "Votre intuition était correcte : +2 positions gagnées".

**3. Découverte inattendue**
Quand la simulation révèle un insight non anticipé, mettre en évidence : "Résultat surprenant : sortie derrière Verstappen malgré l'arrêt anticipé".

**4. Moment de partage**
Faciliter l'export/capture du résultat de simulation pour partage social (Discord, Twitter, Reddit).

### Experience Principles

1. **"Insight en 3 secondes"**
   Tout résultat visuel doit être compréhensible sans réflexion en moins de 3 secondes. Si l'utilisateur doit analyser, on a échoué.

2. **"Complexité progressive"**
   L'interface montre le niveau de détail adapté au contexte. Les informations avancées sont accessibles mais jamais imposées.

3. **"Mobile = essentiel"**
   Toute fonctionnalité doit être utilisable sur mobile, même si l'expérience est optimisée desktop. Le second écran est un use case principal.

4. **"Zéro configuration"**
   Les valeurs par défaut intelligentes éliminent les choix inutiles. L'utilisateur peut toujours personnaliser, mais ne devrait jamais être obligé.

5. **"Données narratives"**
   Les données F1 racontent une histoire. Les visualisations doivent transmettre le "pourquoi", pas juste le "quoi".

## Desired Emotional Response

### Primary Emotional Goals

**Émotion Primaire : Fierté Intellectuelle**
L'utilisateur doit se sentir intelligent et capable de comprendre la complexité de la F1 mieux que les commentateurs. Le produit transforme des données opaques en insights accessibles.

**Émotions Secondaires :**
- **Maîtrise** : Sentiment de contrôle total sur une complexité habituellement inaccessible
- **Validation** : Confirmation que ses intuitions stratégiques étaient correctes
- **Apprentissage profond** : Compréhension réelle du "pourquoi" derrière les décisions

### Emotional Journey Mapping

| Phase | Émotion Cible | Indicateurs de Succès |
|-------|---------------|----------------------|
| Découverte | Curiosité + Anticipation | L'utilisateur veut essayer immédiatement |
| Onboarding | Confiance + Facilité | Inscription < 30 secondes, pas de friction |
| Exploration | Orientation + Engagement | Navigation intuitive, pas de confusion |
| Analyse (Race Rewind) | Immersion + Compréhension | L'utilisateur "vit" la course |
| Simulation | Anticipation + Excitation | L'attente du résultat crée de l'engagement |
| Résultat | **Révélation + Fierté** | Le moment "Aha!" est immédiat et clair |
| Post-session | Satisfaction + Envie de partager | L'utilisateur veut montrer sa découverte |

### Micro-Emotions

**Confiance vs Confusion**
- Critique pour l'adoption
- Design : Labels explicites, tooltips contextuels, pas de jargon F1 non expliqué
- Test : Un utilisateur moyen comprend chaque élément d'interface en < 3 secondes

**Contrôle vs Impuissance**
- Critique pour l'engagement
- Design : Raccourcis clavier, navigation prédictible, undo disponible
- Test : L'utilisateur peut toujours revenir à un état précédent

**Accomplissement vs Frustration**
- Critique pour la rétention
- Design : Feedback positif explicite sur les insights, progression visible
- Test : L'utilisateur termine sa session avec un sentiment de réussite

### Design Implications

**Pour créer la Fierté intellectuelle :**
- Afficher des messages de validation : "Bonne intuition : +2 positions avec cette stratégie"
- Mettre en évidence les insights non-évidents découverts
- Permettre l'export/partage pour valoriser la découverte

**Pour créer la Maîtrise :**
- Latence < 500ms sur toutes les interactions critiques
- Feedback visuel immédiat sur chaque action
- Raccourcis clavier pour les power users (Alex)

**Pour créer la Confiance :**
- Sourcer les données ("Source: FastF1 - Données officielles")
- Expliquer les calculs de simulation de manière accessible
- Pas de "magie" - l'utilisateur comprend comment le résultat est obtenu

### Emotional Design Principles

1. **"Rendre intelligent, pas impressionner"**
   L'interface fait briller l'utilisateur, pas le produit. Les insights sont présentés comme des découvertes de l'utilisateur.

2. **"Feedback immédiat, toujours"**
   Chaque action reçoit un retour visuel en < 100ms. L'attente crée de l'anxiété, le feedback crée du contrôle.

3. **"Clarifier, jamais simplifier à l'excès"**
   Les données F1 sont complexes. On clarifie sans dumbing down. L'utilisateur expert doit trouver la profondeur.

4. **"Célébrer les découvertes"**
   Les moments "Aha!" méritent une mise en scène. Un insight inattendu = une célébration visuelle subtile.

5. **"Frustration zéro sur le chemin critique"**
   De la sélection de course au résultat de simulation : aucune friction, aucune confusion, aucune attente inexpliquée.

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

**TradingView : La Maîtrise de la Complexité Interactive**

TradingView réussit l'exploit de proposer des outils professionnels dans une interface web d'une fluidité exemplaire. Ses forces clés :
- Manipulation directe avec latence quasi nulle (< 16ms)
- Personnalisation complète du workspace
- Outils de dessin et annotations partageables
- Multi-timeframes sans perte de contexte

**Strava : Le Data-Storytelling Émotionnel**

Strava transforme des fichiers GPS bruts en narration sociale et compétitive. Ses patterns remarquables :
- Timeline interactive (glisser = position exacte sur carte)
- Segments isolés pour comparaison ciblée
- Flyby visualization des trajectoires croisées
- Heatmaps esthétiques
- Validation sociale via Kudos

**Chess.com : L'Analyse Post-Événement Éducative**

Chess.com excelle dans l'analyse pédagogique post-partie. Ses innovations :
- Diagnostic instantané (classification Brillant/Erreur)
- Bouton "Retry" pour tester variantes
- Barre d'avantage dynamique temps réel
- Coach virtuel expliquant le "pourquoi"
- Apprentissage continu obligatoire

### Transferable UX Patterns

**Navigation Patterns :**
- **Timeline Scrubbing** (Strava + TradingView) : Glisser curseur pour naviguer dans le temps avec feedback instantané. Application : Race Rewind avec slider 78 tours, latence < 100ms.
- **Workspace Personnalisable** (TradingView) : Layouts sauvegardés, drag & drop widgets. Application : Dashboard configurable avec templates Débutant/Expert.

**Interaction Patterns :**
- **Manipulation Directe Fluide** (TradingView) : Zoom/pan sans lag. Application : Timeline + Circuit map interactifs avec Canvas WebGL.
- **Instant Retry** (Chess.com) : Bouton "Réessayer" immédiatement visible. Application : "Nouvelle simulation" après résultat Strategy Time Machine.
- **Segment Isolation** (Strava) : Sélectionner portion pour analyse. Application : Isoler un stint pneus (tours 20-35) pour analyse approfondie.
- **Flyby Visualization** (Strava) : Trajectoires croisées visuelles. Application : Voir trajectoires de deux pilotes lors d'un dépassement.

**Visual Patterns :**
- **Barre d'Avantage Dynamique** (Chess.com) : Jauge évoluant en temps réel. Application : Barre "Probabilité de victoire" changeant selon les arrêts.
- **Classification Visuelle** (Chess.com) : Badges colorés pour qualifier décisions. Application : "Undercut génial", "Timing parfait", "Erreur stratégique".
- **Heatmaps Esthétiques** (Strava) : Rendre densité de données belle. Application : Heatmap zones de dépassement sur circuit.
- **Annotations Partageables** (TradingView) : Dessiner et partager. Application : Annoter moments clés et partager sur Discord/Twitter.

### Anti-Patterns to Avoid

**Surcharge Informationnelle** (TradingView débutants) :
- Risque : Afficher tous les pilotes + toutes les métriques simultanément
- Solution : Mode "Simplifié" par défaut, débloquer progressivement
- Impact : CRITIQUE - Peut tuer l'onboarding

**Gamification Forcée** (Strava) :
- Risque : Badges non pertinents ("Vous avez vu 10 courses ! 🎉")
- Solution : Gamification subtile et utile ("Vous maîtrisez les undercuts")
- Impact : MOYENNE - Peut sembler puéril

**Paywall Frustrant** (Chess.com) :
- Risque : Limiter à 3 simulations/jour en Free crée frustration
- Solution : Limiter fonctionnalités avancées, pas le volume d'usage basique
- Impact : CRITIQUE - Tue conversion

**Jargon Non Expliqué** (Apps F1 officielles) :
- Risque : Utiliser "DRS", "Undercut", "Deg" sans explication
- Solution : Tooltips contextuels avec micro-éducation
- Impact : CRITIQUE - Exclut 40% de l'audience

**Latence Perceptible** (Apps data viz) :
- Risque : Timeline qui lag lors du scrubbing
- Solution : Optimisation WebGL, virtual scrolling, skeleton screens
- Impact : CRITIQUE - Tue le sentiment de maîtrise

### Design Inspiration Strategy

**Ce qu'on ADOPTE directement :**
1. **Timeline Scrubbing Fluide** (Strava + TradingView) - Sprint 1, priorité absolue. Métrique : Latence < 100ms, 60fps constant.
2. **Classification Visuelle des Décisions** (Chess.com) - Sprint 2. Métrique : 80% des utilisateurs comprennent les badges sans aide.
3. **Instant Retry** (Chess.com) - Sprint 1. Métrique : 60% des utilisateurs font 2+ simulations par session.

**Ce qu'on ADAPTE pour Pitline :**
1. **Workspace Personnalisable → Dashboard Configurable** - Simplifier à 2-3 layouts prédéfinis au lieu de full customization. Sprint 3.
2. **Segments Isolés → Stint Analysis** - Pré-définir les stints par arrêts aux stands. Sprint 2.
3. **Validation Sociale → Partage Découvertes** - Export PNG/GIF au lieu d'intégration sociale native. Sprint 3.

**Ce qu'on ÉVITE complètement :**
1. **Gamification Superficielle** - Conflit avec "Fierté intellectuelle". Alternative : Progression basée sur maîtrise réelle.
2. **Paywall Volume-Based** - Conflit avec "Zéro frustration". Alternative : Freemium basé sur fonctionnalités.
3. **Complexité Technique Exposée** - Conflit avec "Insight en 3 secondes". Alternative : Mode Expert optionnel.

Cette stratégie guide nos décisions design tout en gardant Pitline Corner unique et aligné avec nos principes UX fondamentaux.

## Design System Foundation

### Design System Choice

**Système choisi : Tailwind CSS + shadcn/ui + Composants Custom**

Pitline Corner utilisera une approche hybride combinant un système themeable moderne avec des composants custom pour les besoins spécifiques F1.

**Composants de base :**
- Tailwind CSS pour le styling utility-first
- shadcn/ui pour les composants UI standards (buttons, forms, cards, modals)
- Radix UI (via shadcn/ui) pour l'accessibilité

**Composants custom :**
- Timeline scrubbing interactive (Canvas/WebGL)
- Circuit maps interactifs (SVG + interactions)
- Graphiques temps réel (Chart.js ou D3.js)
- Visualisations stratégiques F1

### Rationale for Selection

**Pourquoi cette approche :**

1. **Vitesse de développement** : shadcn/ui fournit des composants accessibles prêts à l'emploi, accélérant le MVP.

2. **Personnalisation totale** : Tailwind permet d'implémenter exactement le thème Classique défini (#ffffff, #f5f5f5, #9e9e9e, #424242).

3. **Ownership du code** : shadcn/ui copie les composants dans votre codebase - vous possédez et contrôlez tout.

4. **Performance** : Tailwind avec PurgeCSS génère un CSS minimal. Pas de runtime JavaScript lourd.

5. **Flexibilité pour complexité** : Liberté totale pour créer les composants F1 spécifiques (timeline, circuit maps) sans contraintes d'un framework.

6. **Accessibilité native** : Radix UI (base de shadcn/ui) respecte WCAG AA par défaut.

7. **Alignement avec inspirations** : Permet de reproduire les patterns de TradingView (manipulation fluide), Strava (visualisations), Chess.com (feedback éducatif).

### Implementation Approach

**Phase 1 : Foundation (Sprint 1)**
- Setup Tailwind CSS avec configuration custom (palette Classique)
- Intégrer shadcn/ui CLI
- Installer composants de base : Button, Input, Card, Dialog, Tabs
- Créer design tokens (spacing 20px grid, typography scale, roundness)

**Phase 2 : Composants Standard (Sprint 1-2)**
- Forms : Signup, Login, Settings avec validation inline
- Navigation : Header Desktop, Hamburger menu Mobile
- Cards : Race cards, Simulation results, Feature previews
- Modals : États d'erreur, Confirmations, Onboarding

**Phase 3 : Composants Custom F1 (Sprint 2-3)**
- **RaceTimeline** : Scrubbing fluide < 100ms latence (Canvas)
- **CircuitMap** : Visualisation interactive avec positions pilotes (SVG)
- **StrategyBadge** : Classification visuelle ("Undercut génial", "Erreur stratégique")
- **ProbabilityBar** : Jauge dynamique probabilité victoire
- **StintAnalysis** : Isolation et comparaison de relais pneus

**Phase 4 : Polish & Optimization (Sprint 3-4)**
- Animations avec Framer Motion (transitions, hover states)
- Loading states (Skeleton screens pour Dashboard, Race Library)
- Micro-interactions (button feedback, toast notifications)
- Performance tuning (lazy loading, code splitting, WebGL optimization)

### Customization Strategy

**Design Tokens (tailwind.config.js) :**
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        container: '#f5f5f5',
        border: '#9e9e9e',
        text: '#424242',
        'text-secondary': '#757575',
        accent: '#e0e0e0',
        error: '#d32f2f'
      },
      spacing: {
        'grid': '20px'
      },
      borderRadius: {
        'card': '8px',
        'card-lg': '12px',
        'button': '6px',
        'input': '4px'
      }
    }
  }
}
```

**Composants shadcn/ui à personnaliser :**
- **Button** : Roundness 6-8px, hover scale(1.05), loading state
- **Card** : Roundness 8-12px, subtle shadow, hover elevation
- **Input** : Roundness 4-6px, focus ring #9e9e9e, validation inline
- **Dialog** : Backdrop blur, smooth animations, ESC to close

**Composants custom à créer :**
- **RaceTimeline** : Inspiré TradingView, scrubbing fluide, points d'intérêt
- **CircuitMap** : Inspiré Strava flyby, trajectoires pilotes, zoom/pan
- **StrategyBadge** : Inspiré Chess.com, badges colorés (vert/jaune/rouge)
- **ProbabilityBar** : Inspiré Chess.com, jauge animée temps réel

**Guidelines de personnalisation :**
- Respecter le thème Classique sur tous les composants
- Maintenir cohérence typographique (line-height 1.25)
- Appliquer grid 20px pour tous les espacements
- Utiliser transitions fluides (duration-200, ease-in-out)
- Optimiser pour 60fps sur interactions critiques

## Defining Core Experience (Détaillé)

### L'Expérience Centrale en Une Phrase

"Tester une décision stratégique F1 alternative et voir instantanément si votre intuition était meilleure que celle de l'équipe"

Cette expérience transforme le fan passif en stratège actif, validant ou infirmant ses intuitions avec des données réelles.

### Modèle Mental de l'Utilisateur

**Comment les fans F1 résolvent actuellement ce problème :**
- Débats sur Reddit/Discord sans preuves concrètes
- Analyses post-course passives (Sky Sports, Canal+)
- Simulateurs de jeux (F1 2024) mais sans données réelles de course
- Sites de stats (FastF1, RaceFans) mais sans interactivité

**Ce qu'ils aiment :**
- Avoir raison dans leurs prédictions
- Comprendre le "pourquoi" derrière les décisions
- Partager leurs découvertes avec la communauté

**Ce qu'ils détestent :**
- Manque de preuves pour soutenir leurs arguments
- Complexité technique inaccessible
- Débats sans fin sans résolution

**Pitline Corner comble ce gap** en fournissant des preuves concrètes basées sur des données réelles, rendant les intuitions vérifiables.

### Critères de Succès

**L'expérience centrale est réussie quand :**

1. **Vitesse perçue** : Résultat de simulation en < 5 secondes (critère technique)
2. **Compréhension immédiate** : Impact visible en < 3 secondes (principe "Insight en 3 secondes")
3. **Validation émotionnelle** : Message personnalisé ("Votre intuition était correcte : +2 positions")
4. **Envie d'exploration** : 60% des utilisateurs font 2+ simulations par session
5. **Sentiment de maîtrise** : Utilisateur comprend pourquoi le résultat est différent

**Indicateurs d'échec :**
- Temps de calcul > 5 secondes (frustration)
- Résultat ambigu ou difficile à interpréter (confusion)
- Pas d'envie de refaire une simulation (manque d'engagement)

### Pattern Novel vs Établi

**Analyse : Hybride (70% établi, 30% nouveau)**

**Patterns ÉTABLIS utilisés :**
- Timeline scrubbing (Strava, YouTube, TradingView)
- Formulaire de configuration (standards web)
- Comparaison avant/après (patterns visuels classiques)
- Bouton "Retry" immédiat (Chess.com, jeux vidéo)

**Innovation NOUVELLE :**
- Concept "Strategy Time Machine" unique au domaine F1
- Visualisation impact stratégique sur circuit map en temps réel
- Classification éducative des décisions ("Undercut génial", "Erreur stratégique")
- Combinaison données historiques réelles + simulation interactive

**Stratégie d'apprentissage :**
- Utiliser patterns familiers pour réduire courbe d'apprentissage
- Innover sur la présentation des résultats (unique à F1)
- Pas besoin de tutoriel : l'interface se comprend intuitivement

### Mécanique de l'Expérience

**1. INITIATION (Comment ça commence ?)**

**Contexte :** Utilisateur sur Race Rewind, explore une course

**Triggers :**
- CTA "Lancer une simulation" fixe en bas d'écran (toujours visible)
- Clic sur un pit stop dans la timeline → "Et si cet arrêt avait été différent ?"
- Suggestion contextuelle : "Moment stratégique clé détecté au tour 23"

**État mental :** Curiosité ("Je me demande si..."), envie de tester une hypothèse

**2. INTERACTION (Que fait l'utilisateur ?)**

**Configuration (3 choix maximum - principe "Zéro configuration") :**

**Étape 1 : Sélectionner pilote**
- Dropdown avec recherche
- Valeur par défaut : Pilote actuellement sélectionné dans Race Rewind
- Feedback : Photo pilote + équipe

**Étape 2 : Choisir tour d'arrêt**
- Slider horizontal (tours 1-78)
- Valeur par défaut : Tour d'arrêt réel + suggestion intelligente
- Feedback : "Tour suggéré : 23 (évite trafic)"

**Étape 3 : Choisir type de pneu**
- 3 boutons radio : Soft 🔴 / Medium 🟡 / Hard ⚪
- Valeur par défaut : Pneu utilisé réellement
- Feedback : Durée de vie estimée

**Validation :**
- Bouton "Simuler" unique, gros (200×60px), impossible à rater
- Loading state : Spinner + "Calcul en cours..." (< 5 sec)

**3. FEEDBACK (Comment sait-il que ça marche ?)**

**Pendant le calcul (< 5 secondes) :**
- Spinner animé
- Message : "Calcul de la position de sortie..."
- Pas de blocage UI (peut annuler)

**Résultat (fade-in animation) :**

**Visuel principal :**
- Circuit map avec position de sortie réelle vs simulée
- Trafic au moment de sortie (autres pilotes visibles)
- Flèche indiquant gain/perte de positions

**Feedback textuel :**
- **Si meilleur :** "✅ Votre intuition était correcte : +2 positions gagnées"
- **Si pareil :** "↔️ Même résultat : l'équipe avait raison"
- **Si pire :** "❌ Résultat surprenant : -1 position perdue"

**Explication éducative :**
- "L'undercut au tour 23 permet d'éviter le trafic de Verstappen"
- "Sortie derrière Hamilton malgré l'arrêt anticipé (dégradation pneus)"

**Classification visuelle :**
- Badge coloré : "Undercut génial" (vert), "Timing parfait" (jaune), "Erreur stratégique" (rouge)

**4. COMPLETION (Comment sait-il qu'il a fini ?)**

**Résultat affiché clairement**
- Pas d'ambiguïté : gain/perte de positions évident
- Explication du "pourquoi" toujours présente

**Prochaines actions (2 CTAs visibles) :**
- **"Nouvelle simulation"** (principal) : Reset formulaire, valeurs précédentes pré-remplies
- **"Partager"** (secondaire) : Export PNG/GIF pour réseaux sociaux

**Sauvegarde automatique :**
- Simulation ajoutée à l'historique Dashboard
- Accessible via "Vos simulations récentes"

**Boucle d'engagement :**
- Encourager exploration : "Testez un autre scénario ?"
- Suggestions : "Que se serait-il passé avec un arrêt au tour 30 ?"

## Visual Design Foundation

### Color System

**Palette Principale (Thème Classique)**

**Neutrals (Base) :**
- `background`: #ffffff (Blanc pur)
- `container`: #f5f5f5 (Gris 50 - Conteneurs, cards)
- `border`: #9e9e9e (Gris 400 - Bordures, dividers)
- `text`: #424242 (Gris 800 - Texte principal)
- `text-secondary`: #757575 (Gris 600 - Texte secondaire)
- `accent`: #e0e0e0 (Gris 200 - Hover states, CTA secondaires)

**Sémantiques (Actions & États) :**
- `error`: #d32f2f (Rouge 700 - Erreurs, annotations critiques)
- `success`: #388e3c (Vert 700 - Validations, résultats positifs)
- `warning`: #f57c00 (Orange 700 - Avertissements, suggestions)
- `info`: #1976d2 (Bleu 700 - Informations, tooltips)

**F1-Specific (Données de Course) :**
- `tire-soft`: #e53935 (Rouge vif - Pneus tendres 🔴)
- `tire-medium`: #fbc02d (Jaune - Pneus mediums 🟡)
- `tire-hard`: #f5f5f5 (Blanc - Pneus durs ⚪)
- `tire-intermediate`: #4caf50 (Vert - Pneus intermédiaires 🟢)
- `tire-wet`: #2196f3 (Bleu - Pneus pluie 🔵)
- `position-gain`: #66bb6a (Vert clair - Gain de positions)
- `position-loss`: #f44336 (Rouge - Perte de positions)
- `position-same`: #9e9e9e (Gris - Position identique)

**Accessibilité (Contraste WCAG) :**
- Texte principal (#424242) sur fond blanc (#ffffff) : **Ratio 11.9:1** ✅ AAA
- Texte secondaire (#757575) sur fond blanc : **Ratio 4.6:1** ✅ AA
- Bordures (#9e9e9e) sur fond blanc : **Ratio 2.8:1** ✅ Graphiques
- Erreur (#d32f2f) sur fond blanc : **Ratio 5.9:1** ✅ AA

**Utilisation Sémantique :**
- **Backgrounds** : #ffffff (pages), #f5f5f5 (sections, cards)
- **Borders** : #9e9e9e (dividers), #424242 (focus states)
- **Text** : #424242 (headings, body), #757575 (captions, labels)
- **Interactive** : #e0e0e0 (hover), #424242 (active)
- **Feedback** : #d32f2f (error), #388e3c (success), #f57c00 (warning)

### Typography System

**Font Families**

**Primary (Interface) :**
- **Sans-serif system stack** : -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
- **Rationale** : Performance optimale, lisibilité native, pas de chargement externe
- **Fallback** : Arial, sans-serif

**Secondary (Data/Code) :**
- **Monospace** : "SF Mono", Monaco, "Cascadia Code", "Courier New", monospace
- **Usage** : Temps au tour, écarts, données numériques précises
- **Rationale** : Alignement vertical, lisibilité des chiffres

**Type Scale (Modular Scale 1.25)**

```css
/* Headings */
--text-5xl: 48px;  /* Hero titles (rare) */
--text-4xl: 36px;  /* Page titles (h1) */
--text-3xl: 28px;  /* Section titles (h2) */
--text-2xl: 24px;  /* Subsection titles (h3) */
--text-xl: 20px;   /* Card titles (h4) */

/* Body */
--text-lg: 18px;   /* Emphasized body */
--text-base: 16px; /* Default body text */
--text-sm: 14px;   /* Secondary text, labels */
--text-xs: 12px;   /* Captions, metadata */
--text-2xs: 11px;  /* Tiny labels (rare) */
```

**Font Weights**

```css
--font-light: 300;    /* Rare, large headings only */
--font-regular: 400;  /* Default body text */
--font-medium: 500;   /* Emphasized text, labels */
--font-semibold: 600; /* Subheadings, buttons */
--font-bold: 700;     /* Headings, CTAs */
```

**Line Heights**

```css
--leading-tight: 1.15;   /* Large headings (h1, h2) */
--leading-snug: 1.25;    /* Default (h3, h4, body) */
--leading-normal: 1.5;   /* Long-form content (rare) */
--leading-relaxed: 1.75; /* Very long paragraphs (rare) */
```

**Typography Usage Guidelines**

**Headings :**
- h1 (Page title) : 36px, bold, tight (1.15), #424242
- h2 (Section) : 28px, bold, tight (1.15), #424242
- h3 (Subsection) : 24px, semibold, snug (1.25), #424242
- h4 (Card title) : 20px, semibold, snug (1.25), #424242

**Body :**
- Default : 16px, regular, snug (1.25), #424242
- Emphasized : 16px, medium, snug (1.25), #424242
- Secondary : 14px, regular, snug (1.25), #757575

**UI Elements :**
- Buttons : 16px, semibold, #424242
- Labels : 14px, medium, #757575
- Captions : 12px, regular, #757575
- Metadata : 11px, regular, #9e9e9e

**Data Display :**
- Lap times : 16px, monospace, medium, #424242
- Positions : 20px, monospace, bold, #424242
- Deltas : 14px, monospace, regular, #757575

### Spacing & Layout Foundation

**Base Unit : 4px (Tailwind default)**

**Spacing Scale**

```css
/* Tailwind spacing tokens */
--space-0: 0px;
--space-1: 4px;    /* Tiny gaps */
--space-2: 8px;    /* Small gaps */
--space-3: 12px;   /* Medium gaps */
--space-4: 16px;   /* Default gaps */
--space-5: 20px;   /* Grid unit (PRIMARY) */
--space-6: 24px;   /* Large gaps */
--space-8: 32px;   /* Section spacing */
--space-10: 40px;  /* Large section spacing */
--space-12: 48px;  /* XL section spacing */
--space-16: 64px;  /* Page sections */
--space-20: 80px;  /* Major sections */
--space-24: 96px;  /* Hero sections */
--space-32: 128px; /* Rare, very large spacing */
```

**Grid System : 20px (5 × 4px)**

**Rationale :** 20px est le "sweet spot" pour Pitline Corner
- Assez grand pour respirer (pas cramped)
- Assez petit pour efficacité (pas wasteful)
- Multiple de 4px (Tailwind compatible)
- Aligne avec wireframes existants

**Component Spacing Guidelines**

**Cards :**
- Padding interne : 20px (space-5)
- Gap entre cards : 20px (space-5)
- Border radius : 8-12px

**Forms :**
- Input padding : 12px vertical, 16px horizontal
- Gap entre inputs : 16px (space-4)
- Label margin-bottom : 8px (space-2)

**Buttons :**
- Padding : 12px vertical, 24px horizontal (medium)
- Padding : 16px vertical, 32px horizontal (large)
- Gap entre boutons : 12px (space-3)

**Sections :**
- Padding vertical : 60-80px (space-16 to space-20)
- Padding horizontal : 20-40px (space-5 to space-10)
- Gap entre sections : 80-120px (space-20 to space-32)

**Layout Principles**

**1. Hiérarchie Visuelle Claire**
- Espacement proportionnel à l'importance
- Groupes visuels évidents (proximity)
- White space intentionnel (pas de remplissage)

**2. Grille Cohérente**
- Tous les espacements multiples de 4px
- Grid 20px pour alignement macro
- Sous-grid 4px pour micro-ajustements

**3. Responsive Scaling**
- Mobile : Réduire padding de 25-50%
- Tablet : Padding intermédiaire
- Desktop : Padding complet

**Responsive Breakpoints (Tailwind)**

```css
/* Mobile first approach */
sm: 640px;   /* Small tablets */
md: 768px;   /* Tablets */
lg: 1024px;  /* Small desktops */
xl: 1280px;  /* Desktops */
2xl: 1536px; /* Large desktops */
```

**Breakpoint Strategy pour Pitline Corner :**
- **Mobile (< 768px)** : Single column, stacked cards, hamburger menu
- **Tablet (768px - 1023px)** : 2 columns, hybrid layout
- **Desktop (≥ 1024px)** : 3 columns, full features, multi-panel

### Accessibility Considerations

**WCAG 2.1 Level AA Compliance (Minimum)**

**Contraste Couleurs :**
- ✅ Texte normal (16px+) : Ratio minimum 4.5:1
- ✅ Texte large (24px+) : Ratio minimum 3:1
- ✅ Éléments UI : Ratio minimum 3:1
- 🎯 Objectif : AAA quand possible (7:1 pour texte normal)

**Tailles de Police :**
- ✅ Minimum 16px pour body text (jamais < 14px)
- ✅ Minimum 12px pour metadata/captions
- ✅ Zoom jusqu'à 200% sans perte de fonctionnalité

**Touch Targets (Mobile) :**
- ✅ Minimum 44×44px (Apple HIG)
- ✅ Recommandé 48×48px (Material Design)
- ✅ Espacement minimum 8px entre targets

**Focus States :**
- ✅ Outline visible 2px solid #424242
- ✅ Offset 2px pour clarté
- ✅ Jamais supprimer outline sans alternative

**Motion & Animation :**
- ✅ Respecter prefers-reduced-motion
- ✅ Animations < 300ms (rapides)
- ✅ Pas d'animations essentielles (toujours alternative statique)

**Screen Readers :**
- ✅ Attributs ARIA sur composants interactifs
- ✅ Labels explicites sur tous les inputs
- ✅ Landmarks HTML5 sémantiques (header, nav, main, aside, footer)

**Keyboard Navigation :**
- ✅ Ordre de tabulation logique
- ✅ Raccourcis clavier documentés
- ✅ Skip links pour navigation rapide
- ✅ Escape pour fermer modals

**Color Blindness :**
- ✅ Ne jamais utiliser couleur seule pour transmettre information
- ✅ Icônes + texte en plus de couleur
- ✅ Patterns/textures pour différenciation (ex: pneus F1)
