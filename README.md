# Poparazzi

[Poparazzi](https://poparazzi.com) built with Expo. Works on iOS, Android and Web.

You'll find included:

- Expo SDK 42 (with Hermes on Android)
- Next.js 11.1 (with Webpack 5)
- React Native Web
- TypeScript
- Babel config that works for Expo and Next.js with Reanimated in a monorepo
- Reanimated
- React Native Bottom Sheet
- Dripsy
- Expo Application Services
- Custom Development Client
- Sentry
- SWR + persistence with MMKV
- And more...

## Architecture

### App

> Code shared between iOS, Android and Web

`cd packages/app`

### Expo

> Native

Expo entrypoint: `packages/expo/App.tsx`

`cd packages/expo`

`yarn start:dev-client` to start iOS and Android app with Expo

or if you haven't installed the Custom Development Client yet:

`yarn run:android` to start Android

`yarn run:ios -d` to start iOS

You can also build the Custom Development Client on EAS:

`yarn build:development`

### Next.js

> Web

Next.js entrypoint: `packages/next/src/pages/_app.tsx`

`cd packages/next`

`yarn dev` to start web app

## Notes

### Root

- Don't add any package here

### App

- Don't add any package here

### Expo

- Add all your React Native and universal packages here
- Publish to Expo with `yarn publish:production`

### Next.js

- Add your web-only packages here (or a specific version to use on web)
- Deploy to Vercel with `yarn deploy` -- if it fails, make sure to configure your project correctly:
  go to your project settings on Vercel and set the "Framework Preset" to Next.js and the "Root Directory" to `packages/next`.

## Improvements

### Native

- [ ] Add Realm once they support Hermes and JSI
- [ ] Continue to optimize the lists
- [ ] Implement Amplitude, Branch, SnapKit, Instagram
- [ ] ...

### Design

- [ ] Desktop version
- [ ] Make the design pixel perfect
- [ ] ...

### Web

- [ ] Fix bug preventing to scroll vertically the tabs in profile
- [ ] ...
