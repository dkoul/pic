# Professional Identity Compass

A self-reflection assessment that helps professionals understand where they derive their professional identity and sense of value.

## Features

- Landing page with identity model explanation
- 20-question situational assessment (~5 minutes)
- Two-dimensional compass visualization (Craft vs. Organizational Identity)
- Four profiles: Builder, Navigator, Integrator, Operator
- Personalized interpretation with reflection question
- Assessment history for authenticated users
- Shareable result cards (copy link, LinkedIn, WhatsApp, download)
- Google OAuth via Supabase
- Dark/light theme

## Tech Stack

- React + TypeScript + Vite
- React Router
- Supabase (Auth, PostgreSQL, RLS)
- Vercel deployment

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and set:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Without Supabase configured, the app works locally with browser storage for assessments.

## Supabase Setup

1. Create a Supabase project
2. Run the migration in `supabase/migrations/001_initial_schema.sql`
3. Enable Google OAuth in Supabase Auth settings
4. Add your site URL to allowed redirect URLs

## Deployment

Deploy to Vercel with the environment variables set. The app is a static SPA.

## Design

UI follows the editorial aesthetic of [ask-deepak.vercel.app](https://ask-deepak.vercel.app/) — Playfair Display headings, Inter body text, DM Mono labels, minimal black/white palette with yellow accent.
