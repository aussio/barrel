lint:
	npx tsc

run:
	npx expo start

build:
	npx expo export:web

ci: lint build
	