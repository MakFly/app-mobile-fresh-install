.PHONY: help install clean start tunnel ios android web lint type-check reset

help:
	@echo "  make install     - Install dependencies (bun)"
	@echo "  make clean       - Clean node_modules + cache"
	@echo "  make start       - Start Expo"
	@echo "  make tunnel      - Start Expo tunnel mode (QR code)"
	@echo "  make ios         - iOS simulator"
	@echo "  make android     - Android emulator"
	@echo "  make web         - Web version"
	@echo "  make lint        - ESLint"
	@echo "  make type-check  - TypeScript check"
	@echo "  make reset       - Full reset (clean + install)"

install:
	bun install

clean:
	rm -rf node_modules .expo bun.lock

start:
	npx expo start --clear

tunnel:
	npx expo start --tunnel --clear --go

ios:
	npx expo start --ios --clear

android:
	npx expo start --android --clear

web:
	npx expo start --web --clear

lint:
	bun run lint

type-check:
	npx tsc --noEmit

reset: clean install
