# Pitline Corner - Frontend

Virtual Pit Wall : Plateforme SaaS d'analyse stratégique post-course Formula 1.

## Tech Stack

- **Framework:** React 19.2.0 with TypeScript 5.9.3
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS 4.1.18
- **Linting:** ESLint 9.39.1 + Prettier 3.8.0
- **State Management:** Zustand (à ajouter)
- **Data Fetching:** TanStack Query (à ajouter)
- **Visualizations:** D3.js + Recharts (à ajouter)

## Project Structure

```
pitline-corner-frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services, external integrations
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   ├── styles/         # Global styles, Tailwind config
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
├── public/             # Static assets
├── index.html          # HTML template
└── package.json        # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Server starts on `http://localhost:5173/`

### Build

```bash
npm run build
```

### Linting & Formatting

```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Fix linting errors automatically
npm run format        # Format code with Prettier
npm run format:check  # Check formatting without modifying
```

## Code Conventions

- **Components:** PascalCase (e.g., `RaceRewind.tsx`)
- **Files:** PascalCase for components, camelCase for utilities
- **TypeScript:** Strict mode enabled, no `any` types
- **Imports:** Absolute imports with path aliases

## Responsive Breakpoints

- **Mobile:** 320px - 767px
- **Tablet:** 768px - 1023px  
- **Desktop:** 1024px+

## Browser Support

- Chrome, Firefox, Edge, Safari (2 dernières versions majeures)
- Safari iOS, Chrome Android (2 dernières versions)

## Expanding the ESLint configuration

If you need stricter type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
