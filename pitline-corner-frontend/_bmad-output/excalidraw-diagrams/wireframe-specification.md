# Wireframe Pitline Corner - Spécification Enrichie

## Vue d'ensemble
Wireframes multi-plateformes (Desktop 1440×900, Mobile 390×844, Tablet 1024×768) pour Pitline Corner avec navigation complète, annotations et détails haute fidélité.

## Écrans Desktop (1440×900)

### 1. Accueil / Hero
**Éléments:**
- Header: Logo + Navigation (Courses | Fonctionnalités | Tarifs | À propos) + Connexion + Essayer
- Hero section: Titre "Testez vos stratégies F1 avec la Strategy Time Machine"
- Sous-titre: "Simulez des scénarios 'Et si...' et visualisez l'impact stratégique"
- CTA principal: "Commencer gratuitement" (280×60px)
- CTA secondaire: "Voir une démo →"
- Features preview: 3 cartes (Race Rewind, Strategy Time Machine, Insights visuels)

**Navigation:**
- CTA "Commencer" → Signup
- CTA "Connexion" → Login
- "Voir démo" → Race Library (avec démo)

**Annotations:**
- CTA principal redirige vers Signup
- Valeur proposition claire en 3 secondes
- Features preview montre les 3 piliers du produit

---

### 2. Onboarding / Signup
**Éléments:**
- Carte centrée (400×600px)
- Titre: "Créez votre compte"
- Sous-titre: "Gratuit • Sans carte bancaire • 30 secondes"
- Formulaire:
  - Email (requis)
  - Mot de passe min. 8 caractères (requis)
  - Prénom (optionnel)
- CTA: "Créer mon compte" (320×60px)
- CGU + Politique confidentialité
- Lien: "Déjà un compte ? Se connecter"

**Navigation:**
- Création compte → Dashboard
- "Se connecter" → Login

**Annotations:**
- Formulaire minimal < 30 secondes
- Validation inline des champs
- Pas de carte bancaire requise (friction zéro)

---

### 3. Tableau de bord
**Éléments:**
- Header: Logo + Navigation + Recherche + Avatar
- Message bienvenue: "Bienvenue sur Pitline Corner 🏁"
- Section "Courses récentes": 3 cartes course
  - Image circuit
  - Nom GP + Date
  - Métadonnées (tours, simulations)
- Section "Vos simulations": Liste simulations récentes
- Sidebar: Filtres saison + circuit

**Navigation:**
- Clic carte course → Race Rewind
- "Nouvelle simulation" → Race Library
- Avatar → Profil/Paramètres

**Annotations:**
- Accès rapide aux courses récentes
- Dashboard adaptatif selon historique utilisateur
- CTA "Nouvelle simulation" toujours visible

---

### 4. Race Library / Recherche
**Éléments:**
- Barre recherche (320×50px)
- Filtres visuels:
  - Carrousel saisons (2024, 2023, 2022...)
  - Grid circuits avec cartes miniatures
- Liste courses: Cards avec preview
  - Image circuit
  - Nom + Date
  - Statistiques (tours, pilotes, incidents)
- Pagination

**Navigation:**
- Clic course → Race Rewind
- Filtres dynamiques (pas de rechargement page)

**Annotations:**
- Recherche visuelle (pas textuelle obligatoire)
- Filtres par saison/circuit
- Suggestions courses populaires

---

### 5. Race Rewind (Détail course)
**Éléments:**
- Header course: Nom + Date + Circuit
- Visualisation circuit (carte interactive)
- Timeline tours (slider 1-78)
- Panneau positions: Liste pilotes avec positions/temps
- Panneau stratégie: Pneus utilisés par tour
- Panneau événements: Pit stops, dépassements, incidents
- CTA: "Lancer une simulation" (fixe en bas)

**Navigation:**
- Slider tour → Mise à jour positions/stratégie
- Clic pilote → Détail pilote
- "Lancer simulation" → Strategy Time Machine

**Annotations:**
- Navigation temporelle fluide (< 500ms)
- Points d'intérêt auto-détectés (pit stops)
- Tooltips contextuels au survol
- Raccourcis clavier: ← → pour tours

---

### 6. Strategy Time Machine (Simulation)
**Éléments:**
- Panel configuration (3 choix):
  1. Sélection pilote (dropdown)
  2. Tour d'arrêt (slider)
  3. Type pneu (soft/medium/hard)
- Valeurs par défaut intelligentes pré-remplies
- CTA: "Simuler" (200×60px)
- Résultat comparatif:
  - Vue circuit: Position sortie réelle vs simulée
  - Trafic au moment de sortie
  - Impact: "+2 positions" ou "Même résultat"
  - Explication textuelle
- CTA: "Partager" + "Nouvelle simulation"

**Navigation:**
- "Simuler" → Affichage résultat (< 5 sec)
- "Nouvelle simulation" → Reset formulaire
- "Retour" → Race Rewind

**Annotations:**
- Maximum 3 choix (simplicité)
- Résultat visuel en 3 secondes
- Feedback positif: "Votre intuition était correcte"
- Export/partage pour réseaux sociaux

---

### 7. Paramètres / Profil
**Éléments:**
- Tabs: Profil | Compte | Abonnement | Préférences
- Section Profil:
  - Avatar (upload)
  - Nom/Prénom
  - Email (non modifiable)
- Section Abonnement:
  - Plan actuel (Free/Pro)
  - Upgrade CTA si Free
  - Historique factures si Pro
- Section Préférences:
  - Langue
  - Notifications
  - Unités (km/h ou mph)

**Navigation:**
- "Enregistrer" → Confirmation
- "Upgrade" → Checkout

**Annotations:**
- Profil minimal (pas de surcharge)
- Upgrade CTA subtil mais visible
- Préférences F1-spécifiques (unités)

---

### 8. Support / FAQ
**Éléments:**
- Barre recherche FAQ
- Catégories:
  - Démarrage
  - Simulations
  - Données F1
  - Abonnement
- Accordéons questions/réponses
- CTA: "Contacter le support"
- Widget chat (optionnel)

**Navigation:**
- Clic catégorie → Filtre questions
- Clic question → Expand réponse
- "Contacter" → Formulaire support

**Annotations:**
- FAQ contextuelle (micro-éducation)
- Recherche intelligente
- Pas de jargon technique non expliqué

---

### 9. Checkout / Paiement
**Éléments:**
- Comparaison plans:
  - Free: Features limitées
  - Pro: Toutes features + avantages
- Formulaire paiement:
  - Carte bancaire (Stripe)
  - Adresse facturation
- Récapitulatif commande
- CTA: "Payer" (200×60px)
- Garantie remboursement 30 jours

**Navigation:**
- "Payer" → Confirmation + Dashboard
- "Annuler" → Retour

**Annotations:**
- Comparaison claire Free vs Pro
- Paiement sécurisé (badge Stripe)
- Garantie visible (réduction friction)

---

## Écrans Mobile (390×844)

### Adaptations clés:
- Navigation hamburger menu
- Hero section: Titre réduit, CTA pleine largeur
- Formulaires: Inputs pleine largeur (340px)
- Race Rewind: Swipe entre tours (gesture)
- Dashboard: Cards empilées verticalement
- Strategy Time Machine: Steps séquentiels (wizard)

---

## Écrans Tablet (1024×768)

### Adaptations clés:
- Layout hybride (entre mobile et desktop)
- Navigation visible (pas hamburger)
- Race Rewind: 2 colonnes (circuit + données)
- Dashboard: Grid 2 colonnes
- Formulaires: Largeur optimale (500px)

---

## Flèches de navigation (Flow)

1. **Accueil → Signup**: CTA "Commencer"
2. **Signup → Dashboard**: Compte créé
3. **Dashboard → Race Library**: "Nouvelle simulation"
4. **Race Library → Race Rewind**: Sélection course
5. **Race Rewind → Strategy Time Machine**: "Lancer simulation"
6. **Strategy Time Machine → Race Rewind**: "Nouvelle simulation"
7. **Dashboard → Profil**: Clic avatar
8. **Profil → Checkout**: "Upgrade"
9. **Checkout → Dashboard**: Paiement confirmé

---

## Annotations générales

### Interactions Desktop:
- Hover states sur tous les boutons
- Tooltips contextuels (< 100ms)
- Raccourcis clavier (power users)
- Drag & drop (réorganisation)

### Interactions Mobile/Tablet:
- Touch-first (zones tactiles 44×44px min)
- Swipe gestures (tours, cartes)
- Tap long pour tooltips
- Pull-to-refresh

### Micro-interactions:
- Loading states (skeleton screens)
- Success animations (checkmarks)
- Error messages inline
- Progress indicators (multi-steps)

### Accessibilité:
- Contraste WCAG AA minimum
- Labels explicites (screen readers)
- Navigation clavier complète
- Focus visible

---

## Thème Classique

**Couleurs:**
- Background: `#ffffff` (blanc)
- Container: `#f5f5f5` (gris clair)
- Border: `#9e9e9e` (gris)
- Text: `#424242` (gris foncé)
- Text secondary: `#757575` (gris moyen)
- Accent: `#e0e0e0` (gris clair pour CTA)
- Error: `#d32f2f` (rouge pour annotations)

**Typographie:**
- Titres: 24-36px, bold
- Body: 16-20px, regular
- Small: 12-14px, regular
- Line-height: 1.25

**Espacements:**
- Grid: 20px
- Sections: 60-120px
- Elements: 20-40px
- Padding: 20-40px

**Roundness:**
- Cards: 8-12px
- Buttons: 6-8px
- Inputs: 4-6px
