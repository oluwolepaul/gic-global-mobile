# GIC Content Studio

This folder is the staff editor for campus events and Weekly Word posts. Sanity sign-in protects editing; the app only reads published content through the Vercel API.

## Setup

1. Create a Sanity project and a public `production` dataset.
2. Copy the project ID from Sanity Manage.
3. Copy `.env.example` to `.env` and set `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET=production`.
4. Run `npm install`, then `npm run dev` to open the editor locally. Use `npm run deploy` to publish the Studio for authorized church staff.
5. Add `SANITY_PROJECT_ID` and `SANITY_DATASET=production` to the `sermon-api` Vercel project’s Production environment variables, then redeploy that project.
6. Add staff as members of the Sanity project. Only published documents marked **Show in app** appear in GIC Global Connect.

No write token belongs in the mobile app or the Vercel read-only feed. Published content is publicly readable, as required for showing it to app users.

## Event fields

Use the campus values `texas`, `new-york`, or `lagos`. `First event date` and `Last event date` control when the app displays an event; `Date shown in the app` is the human-readable flyer date. Upload a flyer to the image field and enable **Show in app** when it is ready.

## Weekly Word fields

Create one document per post. The app uses the title, speaker, scripture references, excerpt, thumbnail, introduction, discussion, teaching points, closing prayer, and publish date. Enable **Show in app** when the post is ready.

Until the Sanity project is configured and the Vercel function is redeployed, the app continues to show its existing built-in events and Weekly Word post.
