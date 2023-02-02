lint:
	npx tsc

run:
	npx expo start

build:
	npx expo export:web

deploy:
	firebase deploy --only hosting