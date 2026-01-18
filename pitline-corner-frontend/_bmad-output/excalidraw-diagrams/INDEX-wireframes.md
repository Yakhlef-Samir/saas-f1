# Index des Wireframes Pitline Corner

## 📊 Vue d'ensemble

**Projet:** Pitline Corner - SaaS B2C F1 Strategy Simulator  
**Date de création:** 2026-01-16  
**Thème:** Classique (fond blanc, bordures grises)  
**Plateformes:** Desktop (1440×900), Mobile (390×844), Tablet (1024×768)  
**Nombre d'écrans:** 9 écrans principaux  

---

## 📁 Fichiers générés - Desktop (1440×900)

### ✅ Écrans Desktop complets

| # | Écran | Fichier | Éléments clés | Navigation |
|---|-------|---------|---------------|------------|
| 1 | **Accueil / Hero** | `01-accueil-hero-desktop.excalidraw` | Header, Hero section, CTA "Commencer", Features preview (3 cartes) | → Signup, Login |
| 2 | **Signup** | `02-signup-desktop.excalidraw` | Formulaire (Email, Password, Prénom), Validation inline, CTA "Créer compte" | → Dashboard |
| 3 | **Dashboard** | `03-dashboard-desktop.excalidraw` | Courses récentes (3 cartes), Simulations récentes, CTA "Nouvelle simulation" | → Race Library, Race Rewind |
| 4 | **Race Library** | `04-race-library-desktop.excalidraw` | Recherche, Filtres (saisons, circuits), Grid courses (3 colonnes) | → Race Rewind |
| 5 | **Race Rewind** | `05-race-rewind-desktop.excalidraw` | Circuit map, Timeline slider, Positions pilotes, Événements, CTA "Lancer simulation" | → Strategy Time Machine |
| 6 | **Strategy Time Machine** | `06-strategy-time-machine-desktop.excalidraw` | Config (3 choix), Résultat comparatif, Impact visuel, CTA "Partager" | → Race Rewind |
| 7 | **Profil / Paramètres** | `07-profile-settings-desktop.excalidraw` | Tabs (Profil/Compte/Abonnement/Préférences), Avatar, Upgrade CTA | → Checkout |
| 8 | **Support / FAQ** | `08-support-faq-desktop.excalidraw` | Recherche FAQ, Catégories (4), Accordéons Q/R, CTA "Contacter support" | - |
| 9 | **Checkout / Paiement** | `09-checkout-payment-desktop.excalidraw` | Comparaison Free vs Pro, Formulaire Stripe, Récapitulatif, Garantie 30j | → Dashboard |
| 10 | **Erreur Serveur (500)** | `10-error-server-desktop.excalidraw` | Message rassurant, CTA Réessayer, Code erreur discret | → Retry ou Accueil |
| 11 | **Connexion Perdue** | `11-error-connection-desktop.excalidraw` | Icône 📡, Indicateur statut, Reconnexion auto | → Vérifier connexion |
| 12 | **Simulation Échouée** | `12-error-simulation-desktop.excalidraw` | Modal erreur, Raisons explicites, 2 CTAs (Modifier/Retour) | → Modifier ou Race Rewind |

---

## 🔗 Flow de navigation complet

```
┌─────────────┐
│  ACCUEIL    │
│  (Hero)     │
└──────┬──────┘
       │
       ├─── "Commencer" ──────────┐
       │                          │
       └─── "Connexion" ────┐     │
                            │     │
                            ▼     ▼
                     ┌──────────────┐
                     │   SIGNUP     │
                     └──────┬───────┘
                            │
                            │ Compte créé
                            ▼
                     ┌──────────────┐
                     │  DASHBOARD   │
                     └──────┬───────┘
                            │
       ┌────────────────────┼────────────────────┐
       │                    │                    │
       │ Carte course       │ "Nouvelle sim"     │ Avatar
       ▼                    ▼                    ▼
┌─────────────┐      ┌─────────────┐     ┌─────────────┐
│ RACE REWIND │      │RACE LIBRARY │     │   PROFIL    │
└──────┬──────┘      └──────┬──────┘     └──────┬──────┘
       │                    │                    │
       │ "Lancer sim"       │ Sélection          │ "Upgrade"
       ▼                    │                    ▼
┌─────────────┐             │             ┌─────────────┐
│  STRATEGY   │◄────────────┘             │  CHECKOUT   │
│TIME MACHINE │                           └──────┬──────┘
└──────┬──────┘                                  │
       │                                         │ "Payer"
       │ "Nouvelle sim"                          ▼
       └──────────────────────────────────► DASHBOARD
                                           (confirmation)

                     ┌─────────────┐
                     │ SUPPORT/FAQ │
                     └─────────────┘
```

---

## ⚠️ États d'Erreur (Nouveaux)

### 10. Erreur Serveur (500)
- ✅ Message rassurant sans jargon technique
- ✅ Icône ⚠️ universelle
- ✅ CTA principal "Réessayer"
- ✅ Lien secondaire "Retour à l'accueil"
- ✅ Code erreur discret pour support
- 🎯 Rassure sur sécurité des données

### 11. Connexion Perdue
- ✅ Icône 📡 claire
- ✅ Message actionnable
- ✅ Indicateur statut temps réel (🔴 Hors ligne)
- ✅ Reconnexion automatique
- ✅ Sauvegarde données locales
- 🎯 Graceful degradation

### 12. Simulation Échouée
- ✅ Modal overlay contextuel
- ✅ Bordure rouge (erreur critique)
- ✅ Raisons explicites (éducation utilisateur)
- ✅ 2 CTAs: Modifier paramètres / Retour
- ✅ Pas de blâme utilisateur
- 🎯 Guidage vers résolution

---

## 📝 Annotations par écran

### 1. Accueil / Hero
- ✅ CTA principal "Commencer" → Signup
- ✅ Valeur proposition claire en 3 secondes
- ✅ Features preview = 3 piliers du produit
- ✅ Header avec navigation + login/signup
- 🎯 Hover sur CTA (scale 1.05)
- 🎯 Responsive: Mobile hamburger menu

### 2. Signup
- ✅ Formulaire minimal < 30 secondes
- ✅ Email + Password requis, Prénom optionnel
- ✅ Validation inline des champs
- ✅ Pas de carte bancaire (friction zéro)
- ✅ Indicateur force mot de passe
- 🎯 Focus auto sur premier champ
- 🎯 Loading state sur bouton

### 3. Dashboard
- ✅ Accès rapide courses récentes (3 cartes)
- ✅ CTA "Nouvelle simulation" toujours visible
- ✅ Historique simulations avec résultats
- 🎯 Clic carte course → Race Rewind
- 🎯 Avatar → Menu (Profil, Paramètres, Déconnexion)

### 4. Race Library
- ✅ Recherche visuelle (pas textuelle obligatoire)
- ✅ Filtres dynamiques (saisons + circuits)
- ✅ Suggestions courses populaires
- ✅ Grid responsive (3 colonnes desktop)
- 🎯 Filtres sans rechargement page
- 🎯 Skeleton screens pendant chargement

### 5. Race Rewind
- ✅ Navigation temporelle fluide (< 500ms)
- ✅ Slider avec points d'intérêt (pit stops)
- ✅ Positions temps réel par tour
- ✅ Stratégies pneus visuelles (🔴🟡⚪)
- ✅ Tooltips contextuels au survol
- 🎯 Raccourcis clavier: ← → pour tours
- 🎯 CTA "Lancer simulation" fixe

### 6. Strategy Time Machine
- ✅ Maximum 3 choix (simplicité)
- ✅ Valeurs par défaut intelligentes
- ✅ Résultat en < 5 secondes
- ✅ Visualisation avant/après
- ✅ Feedback positif: "Votre intuition était correcte"
- ✅ Export/partage réseaux sociaux
- 🎯 Dropdown pilotes avec recherche
- 🎯 Slider responsive pour tour d'arrêt

### 7. Profil / Paramètres
- ✅ Tabs: Profil | Compte | Abonnement | Préférences
- ✅ Profil minimal (pas de surcharge)
- ✅ Email non modifiable (sécurité)
- ✅ Upgrade CTA subtil mais visible
- 🎯 Upload avatar avec preview
- 🎯 Validation avant enregistrement

### 8. Support / FAQ
- ✅ FAQ contextuelle (micro-éducation)
- ✅ Recherche intelligente
- ✅ Catégories claires (4 principales)
- ✅ Accordéons expand/collapse
- ✅ Pas de jargon non expliqué
- ✅ CTA "Contacter support" visible
- 🎯 Recherche temps réel (debounce)

### 9. Checkout / Paiement
- ✅ Comparaison claire Free vs Pro
- ✅ Plan Pro mis en avant (badge "RECOMMANDÉ")
- ✅ Paiement sécurisé Stripe (badge 🔒)
- ✅ Formulaire minimal (carte + expiry + CVV)
- ✅ Récapitulatif visible
- ✅ Garantie remboursement 30 jours
- 🎯 Validation Stripe en temps réel
- 🎯 Loading state pendant paiement

---

## 🎨 Thème Classique - Spécifications

### Couleurs
```css
--background: #ffffff      /* Blanc */
--container: #f5f5f5       /* Gris clair */
--border: #9e9e9e          /* Gris */
--text: #424242            /* Gris foncé */
--text-secondary: #757575  /* Gris moyen */
--accent: #e0e0e0          /* Gris clair CTA */
--error: #d32f2f           /* Rouge annotations */
```

### Typographie
- **Titres:** 24-36px, bold
- **Body:** 16-20px, regular
- **Small:** 12-14px, regular
- **Line-height:** 1.25

### Espacements
- **Grid:** 20px
- **Sections:** 60-120px
- **Elements:** 20-40px
- **Padding:** 20-40px

### Roundness
- **Cards:** 8-12px
- **Buttons:** 6-8px
- **Inputs:** 4-6px

---

## 🎯 Interactions Desktop

### Hover States
- Boutons: scale(1.05) + shadow
- Cartes: scale(1.02) + shadow
- Links: underline

### Tooltips
- Délai: < 100ms
- Position: auto (top/bottom selon espace)
- Max-width: 300px

### Raccourcis Clavier
- `←` `→` : Navigation tours (Race Rewind)
- `Esc` : Fermer modals
- `Ctrl+K` : Focus recherche

### Loading States
- Skeleton screens (courses, simulations)
- Spinners (boutons CTA)
- Progress bars (upload, paiement)

---

## 📱 Variantes Mobile (390×844)

### Mobile (390×844) - ✅ Complet
- [x] 01-accueil-hero-mobile.excalidraw
- [x] 02-signup-mobile.excalidraw
- [x] 03-dashboard-mobile.excalidraw
- [x] 04-race-library-mobile.excalidraw
- [x] 05-race-rewind-mobile.excalidraw
- [x] 06-strategy-time-machine-mobile.excalidraw
- [x] 07-profile-settings-mobile.excalidraw
- [x] 08-support-faq-mobile.excalidraw
- [x] 09-checkout-payment-mobile.excalidraw
- [x] 10-error-server-mobile.excalidraw
- [x] 11-error-connection-mobile.excalidraw
- [x] 12-error-simulation-mobile.excalidraw

**Adaptations appliquées:**
- ✅ Navigation hamburger menu (☰)
- ✅ Inputs pleine largeur (310-350px)
- ✅ Swipe gestures pour navigation
- ✅ Cards empilées verticalement
- ✅ CTA pleine largeur (50-55px hauteur)
- ✅ Touch zones minimum 44×44px
- ✅ Strategy Time Machine en wizard (3 steps)
- ✅ Tabs horizontaux avec swipe

### Tablet (1024×768) - À faire
- [ ] 01-accueil-hero-tablet.excalidraw
- [ ] 02-signup-tablet.excalidraw
- [ ] 03-dashboard-tablet.excalidraw
- [ ] 04-race-library-tablet.excalidraw
- [ ] 05-race-rewind-tablet.excalidraw
- [ ] 06-strategy-time-machine-tablet.excalidraw
- [ ] 07-profile-settings-tablet.excalidraw
- [ ] 08-support-faq-tablet.excalidraw
- [ ] 09-checkout-payment-tablet.excalidraw

**Adaptations clés:**
- Layout hybride (2 colonnes)
- Navigation visible (pas hamburger)
- Formulaires largeur optimale (500px)
- Grid 2 colonnes pour dashboard
- Race Rewind: 2 colonnes (circuit + données)

---

## ✅ Checklist de validation

### Layout
- [x] Grille 20px respectée
- [x] Alignement cohérent
- [x] Hiérarchie visuelle claire
- [x] Espacement respirant

### UI Elements
- [x] Boutons avec états (hover, active, disabled)
- [x] Inputs avec labels et placeholders
- [x] Navigation claire et accessible
- [x] CTAs visibles et explicites

### Fidelité
- [x] Contenus représentatifs (pas de Lorem)
- [x] Labels précis et contextuels
- [x] Données réalistes (courses, pilotes, dates)
- [x] Micro-interactions annotées

### Annotations
- [x] Navigation entre écrans documentée
- [x] Interactions clés expliquées
- [x] États UI spécifiés
- [x] Gestes tactiles (mobile/tablet)

### Technique
- [x] JSON valide pour tous les fichiers
- [x] IDs uniques par élément
- [x] Groupes logiques (groupIds)
- [x] Thème cohérent appliqué

---

## 📖 Utilisation

### Ouvrir dans Excalidraw
1. Aller sur https://excalidraw.com
2. File → Open
3. Sélectionner le fichier `.excalidraw`
4. Naviguer avec zoom/pan

### Exporter
- **PNG:** File → Export image → PNG
- **SVG:** File → Export image → SVG
- **PDF:** Export SVG puis convertir

### Collaborer
- File → Share → Générer lien
- Collaboration temps réel possible

---

## 📚 Documentation complémentaire

- **Spécification complète:** `wireframe-specification.md`
- **Guide d'utilisation:** `README-wireframes.md`
- **UX Design Spec:** `../_bmad-output/planning-artifacts/ux-design-specification.md`

---

**Statut:** Desktop complet ✅ | Mobile complet ✅ | Tablet en attente ⏳  
**Dernière mise à jour:** 2026-01-16 21:00 UTC+01:00

---

## 🎉 Livrables complets

### ✅ Desktop (1440×900) - 12 fichiers
Tous les wireframes Desktop haute fidélité avec annotations détaillées, navigation et interactions.
**Inclut:** 9 écrans principaux + 3 états d'erreur (Serveur 500, Connexion perdue, Simulation échouée)

### ✅ Mobile (390×844) - 12 fichiers  
Tous les wireframes Mobile adaptés avec hamburger menu, touch zones optimisées, swipe gestures et CTA pleine largeur.
**Inclut:** 9 écrans principaux + 3 états d'erreur adaptés Mobile

### 📋 Documentation
- `wireframe-specification.md` - Spécification complète
- `README-wireframes.md` - Guide d'utilisation
- `INDEX-wireframes.md` - Index récapitulatif (ce fichier)

**Total:** 24 wireframes Excalidraw + 3 fichiers documentation + 1 rapport validation UX

---

## 🔍 Prêt pour validation UI

Les wireframes sont maintenant prêts pour validation avec l'agent bmad. Points de validation recommandés :

1. **Cohérence visuelle** - Thème Classique appliqué partout
2. **Navigation** - Flow complet entre tous les écrans
3. **Responsive** - Adaptations Desktop → Mobile correctes
4. **Annotations** - Interactions et redirections documentées
5. **Accessibilité** - Touch zones, contrastes, labels
6. **Fidelité** - Contenus réalistes et représentatifs
