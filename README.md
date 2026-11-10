# GIC Global Mobile

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
- `sermon-api/api/content.js` — content endpoint
- `content-studio/schemas/` — content models

## Run locally

Run `npm ci`, then `npm run start`. Copy `.env.example` to a local `.env` and configure your own public endpoint URLs. Deploy `sermon-api` separately and set `YOUTUBE_API_KEY` only on the server. Configure your own Sanity project/dataset for the content studio. Use your own application identifiers and EAS project when building for distribution.

## Status and limitations

The project record reports an iOS build uploaded to App Store Connect for processing. That is not evidence of App Review approval or public App Store availability. This repository is a source snapshot; credentials, signing material and deployment identities are excluded.

## Engineering discussion

This project provides examples of connecting user journeys to data, handling state and failure paths, and working within platform constraints. It was developed with AI-assisted tooling. Features are described from source and project records; unmeasured business outcomes, usage counts and performance claims are intentionally omitted.

## Rights and configuration

Published with the project owner's permission. Brand assets and third-party components retain their respective rights. See any included license and third-party notices. Public visibility does not grant a new license to third-party artwork or content. Runtime credentials and private customer information are not included.
