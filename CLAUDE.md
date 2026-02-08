# CLAUDE.md - iAutos Mobile (React Native)

## Project Overview

**iAutos Mobile** : Application React Native pour la marketplace automobile iAutos.
Backend Symfony 8 accessible via API REST.

**Stack :**
- Expo SDK 54 / React Native 0.81
- React 19 + TypeScript 5.9 (strict)
- NativeWind v5 (Tailwind CSS)
- Expo Router v6 (file-based routing)
- TanStack Query (server state) + Zustand (client state)
- Axios + Zod (API + validation)

## Commands

```bash
# TOUJOURS bun (jamais npm/yarn/pnpm)
make install        # bun install
make start          # Expo dev server
make lint           # ESLint + Prettier
make type-check     # tsc --noEmit
```

## Architecture

```
app/                    # Expo Router - screens only (pas de logique metier)
  (tabs)/               # Tab navigator
  (auth)/               # Auth screens (route group)
  (modals)/             # Modal screens (route group)
components/
  ui/                   # shadcn primitives
  glass-tab-bar.tsx     # Tab bar custom
features/               # Feature-sliced architecture
  auth/                 # Auth feature (store, hooks, api, components)
  marketplace/          # Marketplace feature
  profile/              # Profile feature
lib/
  utils.ts              # cn() helper
  api-client.ts         # Axios instance + interceptors auth
  query-client.ts       # TanStack Query config
  storage.ts            # MMKV wrapper (sync storage)
  constants.ts          # Env vars + app constants
hooks/                  # Shared hooks
types/                  # Global types (ApiResponse, etc.)
config/                 # Env config
```

### Feature-Sliced Pattern

Chaque feature dans `features/` contient :
```
features/auth/
  api.ts          # Appels API (fonctions query/mutation)
  store.ts        # Zustand store
  hooks.ts        # Hooks React specifiques
  types.ts        # Types de la feature
  components/     # Composants specifiques
```

## Rules

### TypeScript
- **`type` TOUJOURS, `interface` JAMAIS**
- Strict mode, zero `any`
- `as const` pour les constantes

### Styling
- **NativeWind v5 uniquement** via `className`
- **PAS de `StyleSheet.create`** sauf pour les animations natives (`useNativeDriver`)
- Backgrounds blancs, structure via bordures grises

### Performance
- **`FlashList`** obligatoire pour les listes (`@shopify/flash-list`), JAMAIS `FlatList`
- **`expo-image`** pour toutes les images, JAMAIS `Image` de react-native
- `useCallback` sur les `renderItem` des listes
- `React.memo` pour les items de liste

### API
- **Toujours via `@/lib/api-client.ts`**, JAMAIS `fetch()` direct
- Validation Zod aux frontieres (reponses API)
- TanStack Query pour le cache serveur

### State Management
- **Zustand** pour le state client (auth, UI, preferences)
- **TanStack Query** pour le state serveur (donnees API)
- JAMAIS les deux pour la meme donnee

### Navigation
- Expo Router v6 type-safe
- Route groups : `(tabs)`, `(auth)`, `(modals)`
- Deep linking via scheme `iautos://`

### Security
- **`expo-secure-store`** pour les tokens, JAMAIS AsyncStorage
- **MMKV** (`@/lib/storage.ts`) pour les preferences non-sensibles

### Icons
- **`lucide-react-native`** uniquement
- Import : `import { Icon } from 'lucide-react-native'`

### Package Manager
- **`bun`** uniquement (jamais npm/yarn/pnpm)

### JSX Pattern (Anti focus-loss)
```tsx
// CORRECT - JSX constant, reference stable
const content = (<View className="p-4"><TextInput autoFocus /></View>);

// FAUX - Fonction recree a chaque render, perte de focus
const Content = () => (<View className="p-4"><TextInput autoFocus /></View>);
```

## Interdictions

- `bun dev` / `bun start` sans permission explicite
- `FlatList` (utiliser `FlashList`)
- `fetch()` direct (utiliser `api-client.ts`)
- `Image` de react-native (utiliser `expo-image`)
- `AsyncStorage` pour les tokens (utiliser `expo-secure-store`)
- `interface` (utiliser `type`)
- `any` (typer correctement)
- `StyleSheet.create` sauf animations natives
- npm/yarn/pnpm (utiliser bun)

## Key Files

- `app/_layout.tsx` - Root layout + QueryClientProvider
- `app/(tabs)/_layout.tsx` - Tab navigator + GlassTabBar
- `lib/api-client.ts` - Axios instance avec auth interceptors
- `lib/query-client.ts` - Config TanStack Query
- `lib/storage.ts` - MMKV wrapper sync
- `lib/constants.ts` - Env vars + constantes
- `components/glass-tab-bar.tsx` - Tab bar glassmorphism

## NativeWind v5 Setup

- `global.css` importe dans `app/_layout.tsx` (une seule fois)
- `metro.config.js` utilise `withNativewind()` wrapper
- `lightningcss` override a `1.30.1` dans package.json
- CSS order : theme.css > preflight.css > utilities.css > nativewind/theme

## Test Accounts (Backend)

- Admin : `admin@iautos.com` / `password123`
- Particulier : `particulier@iautos.com` / `particulier123456@`
- Pro : `pro@iautos.com` / `pro123456@`
