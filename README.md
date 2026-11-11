# GIC Global Mobile

## Try the app

1. Run `npm ci` and `npm run start`. Open a compatible Expo client or development build.
2. Browse the app shell, campus navigation, and bundled screens before setting up your own APIs. For a browser walkthrough, open `browser-prototype.html` locally.
3. Copy `.env.example` to `.env` and set the two `EXPO_PUBLIC_` URLs for your own deployment. The app currently falls back to an existing hosted content endpoint when `EXPO_PUBLIC_CONTENT_API_URL` is unset.

## Configure the server

Deploy `sermon-api` separately. Set `YOUTUBE_API_KEY` for `/api/sermons` and `SANITY_PROJECT_ID` and `SANITY_DATASET` for `/api/content`. Keep those values in the server environment. Use the schemas in `content-studio` to set up the content model. The browser prototype and bundled navigation can be reviewed without configuring YouTube or Sanity.

A multi-campus church application connecting visitors with content, messages and community journeys.

**JavaScript · React Native · Expo · WebView · Serverless APIs · Sanity schemas**

[Developer portfolio](https://github.com/oluwolepaul)

## Product features

- Campus discovery, events and ministry information.
- Sermon discovery, search, video playback and sharing.
- Giving links and contact, volunteer and prayer-related journeys.
- Server-side sermon/content endpoints and a separate content-studio project.

## Architecture

Expo mobile interface → serverless content/sermon endpoints → public content services. YouTube credentials remain on the server. Sanity schema definitions support content administration.

## Code map

- `App.js` — application screens and state
- `sermon-api/api/sermons.js` — sermon feed endpoint
