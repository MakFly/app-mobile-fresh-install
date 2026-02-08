# React Native Expo Starter

Modern React Native application built with Expo SDK 54, featuring type-safe routing, server state management, and utility-first styling.

## Tech Stack

- **Framework**: Expo SDK 54 / React Native 0.81
- **Runtime**: React 19 + TypeScript 5.9 (strict mode)
- **Navigation**: Expo Router v6 (file-based routing)
- **Styling**: NativeWind v5 (Tailwind CSS)
- **State**: TanStack Query (server) + Zustand (client)
- **HTTP**: Axios + Zod validation
- **Storage**: MMKV (preferences) + SecureStore (tokens)
- **Icons**: lucide-react-native
- **Lists**: FlashList (performant rendering)

## Prerequisites

- [Bun](https://bun.sh) runtime
- Expo Go app (for development) or iOS/Android emulator

## Getting Started

```bash
# Install dependencies
bun install

# Start Expo dev server
bun start

# Or use tunnel mode (works without local network)
make tunnel
```

## Auto-setup on Clone

The project automatically configures Git hooks after `bun install` thanks to Husky's prepare script.

```bash
git clone <repo>
cd app-mobile-fresh-install
bun install  # Husky hooks are installed automatically
```

## Make Commands

| Command           | Description                   |
| ----------------- | ----------------------------- |
| `make install`    | Install dependencies with bun |
| `make start`      | Start Expo dev server         |
| `make tunnel`     | Start Expo tunnel mode        |
| `make ios`        | Run on iOS simulator          |
| `make android`    | Run on Android emulator       |
| `make web`        | Run on web browser            |
| `make lint`       | Run ESLint + Prettier check   |
| `make type-check` | Run TypeScript type check     |
| `make reset`      | Full reset (clean + install)  |

## Project Structure

```
app/                  # Expo Router screens (UI only)
  (tabs)/             # Tab navigator
components/
  ui/                 # Reusable UI primitives
features/             # Feature modules (business logic)
lib/                  # Core utilities
hooks/                # Shared React hooks
types/                # Global TypeScript types
config/               # Environment configuration
```

## Git Hooks

Pre-commit hooks run automatically via Husky + lint-staged:

- ESLint with auto-fix
- Prettier formatting

No bad code gets committed! 🎯

## Development Guidelines

- Always use `bun` as package manager (never npm/yarn/pnpm)
- Use `type` instead of `interface` for TypeScript types
- Use `FlashList` for all list rendering (never `FlatList`)
- Use `expo-image` for images (never `Image` from react-native)
- Store tokens in `expo-secure-store` (never AsyncStorage)
- All API calls go through `@/lib/api-client.ts`

## License

MIT
