# Project Setup

This project is set up to be an Expo + Firebase project, using React Native and Typescript.

The setup steps followed can be found here: https://docs.expo.dev/distribution/publishing-websites/#firebase-hosting

## Prerequisites

1. `npm install`
2. `npm install -g firebase-tools`
3. `firebase login`

## Build

The build will create the `web-build/` directory, which is the folder deployed to firebase.

```
npm run predeploy
```

## Local Run

```
npm run start
```

## Deploy

Deploys are automatically triggered on merge to `main`.
The deploy can also be triggered with `npm run deploy-hosting` 

# Libraries / Design

## Navigation

https://docs.expo.dev/guides/routing-and-navigation/
