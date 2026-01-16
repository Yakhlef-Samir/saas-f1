---
project_name: 'Pitline corner'
date: '2026-01-15'
status: 'active'
---

# Project Context for AI Agents

_Ce fichier contient les règles critiques que les agents IA DOIVENT suivre lors de l'implémentation. Focus sur les détails non-évidents._

---

## Technology Stack & Versions

### Frontend
- React 18+ avec TypeScript 5+ (strict mode)
- Vite 5+ (bundler)
- Tailwind CSS 3+ (styling)
- Zustand (state management)
- TanStack Query (server state)
- React Router v6 (routing)
- Axios (HTTP client)
- D3.js + Recharts (visualizations)
- date-fns avec locale `fr` (dates)
- Vitest + Playwright (testing)

### Backend
- Python 3.11+
- FastAPI 0.100+
- SQLAlchemy 2.0+ (async)
- Pydantic V2
- PostgreSQL 15+
- Redis (cache)
- Alembic (migrations)
- structlog (logging)
- pytest (testing)

---

## Critical Implementation Rules

### Naming Conventions (STRICT)

**Database & API : snake_case PARTOUT**
```python
# Correct
table: lap_data, pit_stops
column: driver_id, lap_time_seconds
endpoint: /races/{race_id}/laps
json: { "driver_id": 1, "lap_time": 82.5 }

# Incorrect - JAMAIS
table: LapData, lapData
column: driverId, DriverId
json: { "driverId": 1 }
```

**Frontend React : PascalCase composants, camelCase variables**
```typescript
// Correct
RaceCard.tsx, useRaceData.ts
const raceId, const lapTime
function RaceCard() {}

// Incorrect
race-card.tsx, race_card.tsx
const race_id
```

**REGLE CRITIQUE** : Les données API arrivent en snake_case et sont utilisées TELLES QUELLES côté frontend. PAS de conversion en camelCase.
```typescript
// Correct
const race = await api.get('/races/1')
console.log(race.driver_id)  // snake_case préservé

// Incorrect - NE PAS faire de transformation
const race = transformToCamelCase(response)
console.log(race.driverId)
```

---

### API Response Format (OBLIGATOIRE)

**Succes** : Wrapper `{ data, meta }`
```json
{
  "data": { "race_id": 1, "name": "Monaco GP" },
  "meta": { "timestamp": "2026-01-15T10:00:00Z" }
}
```

**Erreur** : Format `{ error: { code, message, detail } }`
```json
{
  "error": {
    "code": "RACE_NOT_FOUND",
    "message": "La course demandée n'existe pas",
    "detail": "race_id: 999"
  }
}
```

**Codes erreur standards** : `VALIDATION_ERROR` (400), `UNAUTHORIZED` (401), `FORBIDDEN` (403), `NOT_FOUND` (404), `RATE_LIMITED` (429), `INTERNAL_ERROR` (500)

---

### State Management (Zustand)

**TOUJOURS utiliser des sélecteurs exportés**
```typescript
// Correct - sélecteur exporté
export const selectCurrentRace = (state: RaceState) => state.currentRace
const race = useRaceStore(selectCurrentRace)

// Incorrect - accès direct inline
const race = useRaceStore((state) => state.currentRace)
```

**Un store par domaine** : `authStore`, `raceStore`, `replayStore`, `simulationStore`, `uiStore`

---

### Error Handling

**Frontend** :
- Erreurs critiques → `<ErrorBoundary>`
- Erreurs API → Toast notification
- Erreurs formulaire → Inline sous le champ

**Backend** :
```python
# Toujours utiliser les exceptions custom
class RaceNotFoundError(AppException):
    def __init__(self, race_id: int):
        super().__init__(
            code="RACE_NOT_FOUND",
            message="La course demandée n'existe pas",
            detail=f"race_id: {race_id}",
            status=404
        )

# Ne jamais lever des exceptions génériques
raise Exception("Race not found")  # INTERDIT
```

---

### Testing Rules

**Frontend** : Tests co-localisés
```
src/components/RaceCard.tsx
src/components/RaceCard.test.tsx  <- A côté du fichier
```

**E2E** : Dossier séparé `tests/e2e/`

**Backend** : Dossier `tests/` avec structure miroir
```
tests/unit/services/test_race_service.py
tests/integration/test_race_endpoints.py
```

---

### Date/Time Handling

**API** : ISO 8601 obligatoire
```json
{ "race_date": "2026-03-15T14:00:00Z" }
```

**Frontend** : date-fns avec locale française
```typescript
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
format(date, 'dd MMMM yyyy', { locale: fr })
```

**Temps au tour F1** : Stocké en secondes DECIMAL
```typescript
// 83.456 secondes = 1:23.456
function formatLapTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = (seconds % 60).toFixed(3)
  return mins > 0 ? `${mins}:${secs.padStart(6, '0')}` : secs
}
```

---

### Logging

**Backend** : JSON structuré avec structlog
```python
logger.info("race_imported", race_id=123, season=2024, duration_ms=1523)
```

**Frontend** : Sentry en production
```typescript
// Dev
console.log('Debug:', data)

// Prod
Sentry.captureException(error)
```

---

## Anti-Patterns (INTERDIT)

- Mélanger camelCase et snake_case dans l'API
- Retourner des réponses API sans wrapper `{ data }` ou `{ error }`
- Accéder au state Zustand sans sélecteur exporté
- Utiliser `console.log` en production
- Stocker des dates autrement qu'en ISO 8601
- Créer des tests dans un dossier `__tests__` (utiliser co-location)
- Convertir snake_case en camelCase côté frontend

---

## File Organization

**Frontend** : `src/components/{feature}/`, `src/stores/`, `src/hooks/`, `src/pages/`

**Backend** : `app/api/endpoints/`, `app/services/`, `app/repositories/`, `app/models/`

Voir `architecture.md` pour la structure complète.

---

_Dernière mise à jour : 2026-01-15_
