# Wireframes Pitline Corner - Guide Complet

## 📁 Fichiers générés

### 1. Spécification détaillée
- **wireframe-specification.md** - Spécification complète de tous les écrans avec annotations

### 2. Wireframes par plateforme
- **wireframe-desktop-flow.excalidraw** - Flow complet Desktop (9 écrans + navigation)
- **wireframe-mobile-flow.excalidraw** - Flow complet Mobile 390×844
- **wireframe-tablet-flow.excalidraw** - Flow complet Tablet 1024×768

### 3. Wireframe initial
- **wireframe-20260116-2027.excalidraw** - Version initiale basique (9 écrans Desktop)

---

## 🎯 Contenu des wireframes enrichis

### Desktop Flow (1440×900)
**9 écrans avec navigation complète:**

1. **Accueil / Hero**
   - Header complet avec navigation
   - Hero section avec valeur proposition
   - CTA "Commencer gratuitement"
   - Features preview (3 cartes)
   - → Navigation vers Signup

2. **Onboarding / Signup**
   - Formulaire minimal (Email + Password + Prénom optionnel)
   - Validation inline
   - CTA "Créer mon compte"
   - → Navigation vers Dashboard

3. **Tableau de bord**
   - Message bienvenue
   - Courses récentes (3 cartes)
   - Simulations récentes
   - → Navigation vers Race Library ou Race Rewind

4. **Race Library / Recherche**
   - Barre recherche
   - Filtres visuels (saisons + circuits)
   - Grid courses avec previews
   - → Navigation vers Race Rewind

5. **Race Rewind (Détail course)**
   - Visualisation circuit
   - Timeline tours (slider)
   - Positions pilotes
   - Stratégies pneus
   - CTA "Lancer simulation"
   - → Navigation vers Strategy Time Machine

6. **Strategy Time Machine**
   - Configuration simulation (3 choix)
   - Résultat comparatif visuel
   - Impact stratégique
   - CTA "Partager" + "Nouvelle simulation"
   - → Navigation retour Race Rewind

7. **Paramètres / Profil**
   - Tabs (Profil | Compte | Abonnement | Préférences)
   - Formulaire profil
   - CTA "Enregistrer"
   - → Navigation vers Checkout si upgrade

8. **Support / FAQ**
   - Recherche FAQ
   - Catégories + Accordéons
   - CTA "Contacter support"

9. **Checkout / Paiement**
   - Comparaison plans (Free vs Pro)
   - Formulaire paiement Stripe
   - CTA "Payer"
   - → Navigation vers Dashboard

---

### Mobile Flow (390×844)
**Adaptations clés:**
- Navigation hamburger menu
- Inputs pleine largeur
- Swipe gestures pour navigation tours
- Cards empilées verticalement
- CTA pleine largeur
- Strategy Time Machine en wizard (steps séquentiels)

---

### Tablet Flow (1024×768)
**Adaptations clés:**
- Layout hybride (2 colonnes)
- Navigation visible (pas hamburger)
- Formulaires largeur optimale (500px)
- Grid 2 colonnes pour dashboard

---

## 🔗 Flow de navigation

```
ACCUEIL
  ├─ CTA "Commencer" → SIGNUP
  └─ CTA "Connexion" → LOGIN

SIGNUP
  └─ Compte créé → DASHBOARD

DASHBOARD
  ├─ Carte course → RACE REWIND
  ├─ "Nouvelle simulation" → RACE LIBRARY
  └─ Avatar → PROFIL

RACE LIBRARY
  └─ Sélection course → RACE REWIND

RACE REWIND
  ├─ "Lancer simulation" → STRATEGY TIME MACHINE
  └─ Clic pilote → Détail pilote

STRATEGY TIME MACHINE
  ├─ "Nouvelle simulation" → Reset formulaire
  └─ "Retour" → RACE REWIND

PROFIL
  ├─ "Upgrade" → CHECKOUT
  └─ "Enregistrer" → Confirmation

CHECKOUT
  └─ "Payer" → DASHBOARD (avec confirmation)

SUPPORT / FAQ
  └─ "Contacter" → Formulaire support
```

---

## 📝 Annotations clés

### Écran 1 - Accueil
- ✅ CTA principal redirige vers Signup
- ✅ Valeur proposition claire en 3 secondes
- ✅ Features preview montre les 3 piliers

### Écran 2 - Signup
- ✅ Formulaire minimal < 30 secondes
- ✅ Validation inline des champs
- ✅ Pas de carte bancaire (friction zéro)

### Écran 3 - Dashboard
- ✅ Accès rapide courses récentes
- ✅ Dashboard adaptatif selon historique
- ✅ CTA "Nouvelle simulation" toujours visible

### Écran 4 - Race Library
- ✅ Recherche visuelle (pas textuelle obligatoire)
- ✅ Filtres dynamiques (pas de rechargement)
- ✅ Suggestions courses populaires

### Écran 5 - Race Rewind
- ✅ Navigation temporelle fluide (< 500ms)
- ✅ Points d'intérêt auto-détectés
- ✅ Tooltips contextuels
- ✅ Raccourcis clavier: ← → pour tours

### Écran 6 - Strategy Time Machine
- ✅ Maximum 3 choix (simplicité)
- ✅ Résultat visuel en 3 secondes
- ✅ Feedback positif: "Votre intuition était correcte"
- ✅ Export/partage réseaux sociaux

### Écran 7 - Profil
- ✅ Profil minimal (pas de surcharge)
- ✅ Upgrade CTA subtil mais visible
- ✅ Préférences F1-spécifiques

### Écran 8 - FAQ
- ✅ FAQ contextuelle (micro-éducation)
- ✅ Recherche intelligente
- ✅ Pas de jargon non expliqué

### Écran 9 - Checkout
- ✅ Comparaison claire Free vs Pro
- ✅ Paiement sécurisé (badge Stripe)
- ✅ Garantie visible (réduction friction)

---

## 🎨 Thème Classique

**Couleurs:**
- Background: `#ffffff` (blanc)
- Container: `#f5f5f5` (gris clair)
- Border: `#9e9e9e` (gris)
- Text: `#424242` (gris foncé)
- Text secondary: `#757575` (gris moyen)
- Accent: `#e0e0e0` (gris clair pour CTA)
- Error/Annotation: `#d32f2f` (rouge)

**Typographie:**
- Titres: 24-36px, bold
- Body: 16-20px, regular
- Small: 12-14px, regular
- Line-height: 1.25

**Espacements:**
- Grid: 20px
- Sections: 60-120px
- Elements: 20-40px

---

## 🎯 Interactions

### Desktop:
- Hover states sur boutons
- Tooltips contextuels (< 100ms)
- Raccourcis clavier
- Drag & drop

### Mobile/Tablet:
- Touch-first (zones 44×44px min)
- Swipe gestures
- Tap long pour tooltips
- Pull-to-refresh

### Micro-interactions:
- Loading states (skeleton screens)
- Success animations
- Error messages inline
- Progress indicators

---

## ✅ Checklist validation

- [x] 9 écrans Desktop complets
- [x] Flèches de navigation entre écrans
- [x] Annotations clés sur chaque écran
- [x] Spécification détaillée
- [ ] Variantes Mobile 390×844 (à générer)
- [ ] Variantes Tablet 1024×768 (à générer)
- [ ] Plus de détails UI (contenus réels, micro-interactions)

---

## 📊 Prochaines étapes

1. **Générer wireframes Mobile** - Adapter les 9 écrans pour 390×844
2. **Générer wireframes Tablet** - Adapter les 9 écrans pour 1024×768
3. **Enrichir détails** - Ajouter contenus réels, labels précis, états UI
4. **Valider avec UX spec** - Vérifier alignement avec ux-design-specification.md
5. **Prototyper interactions** - Ajouter états hover, focus, loading

---

## 📖 Utilisation

### Ouvrir dans Excalidraw:
1. Aller sur https://excalidraw.com
2. File → Open → Sélectionner le fichier .excalidraw
3. Naviguer entre les écrans avec zoom/pan

### Exporter:
- PNG: File → Export image → PNG
- SVG: File → Export image → SVG
- PDF: Utiliser l'export SVG puis convertir

### Collaborer:
- File → Share → Générer lien de partage
- Collaboration temps réel possible

---

**Créé le:** 2026-01-16  
**Projet:** Pitline Corner  
**Type:** Wireframes haute fidélité multi-plateformes  
**Thème:** Classique (fond blanc, bordures grises)
