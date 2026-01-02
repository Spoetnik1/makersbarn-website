# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (Next.js)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

Hosted on **Vercel**. Pushes to `main` branch trigger automatic deployments.

## Architecture

Next.js 15 App Router with TypeScript, Tailwind CSS, and Framer Motion.

### Directory Structure

```
src/
├── app/              # Next.js pages (App Router)
├── components/
│   ├── client/       # 'use client' components (interactive: Navbar, Hero, Carousels, Forms)
│   └── server/       # Server components (static: Footer, TeamGrid, Stats)
├── actions/          # Server actions (contact form submission)
├── services/         # External service integrations (Postmark email, Slack webhooks)
├── lib/              # Utilities (cn, validation, security, logger, metadata)
├── constants/        # App-wide constants and enums
├── context/          # React context providers (LanguageContext)
├── data/             # Static data (team, testimonials, accommodation, images)
├── i18n/             # Internationalization (dictionaries, types, server utilities)
├── types/            # TypeScript type definitions
├── middleware.ts     # Security headers, language detection, malicious path blocking
```

### Key Patterns

- **Component Organization**: Components are split into `client/` and `server/` directories based on rendering strategy. Each component has its own folder with `index.ts` barrel export.
- **Path Alias**: Use `@/*` for imports from `src/` (configured in tsconfig.json)
- **Barrel Exports**: All directories use `index.ts` files for clean imports
- **Server Actions**: Contact form uses server action in `src/actions/contact.ts` with rate limiting and validation
- **External Services**: Email via Postmark (`src/services/email.ts`), notifications via Slack webhooks (`src/services/slack.ts`)

### Internationalization (i18n)

Supports English (EN) and Dutch (NL) languages:
- **Dictionaries**: Translation files in `src/i18n/dictionaries/` (en.ts, nl.ts)
- **Language Detection**: Domain-based detection in middleware, stored in cookie
- **Context Provider**: `LanguageContext` for client-side language switching
- **Server Utilities**: `getServerTranslations()` for server components

### Styling

- Tailwind CSS for utility classes
- CSS Modules (`*.module.css`) for component-specific styles
- Fonts: Playfair Display (headings), Quicksand (body) - loaded via `next/font/google`

### Environment Variables

Required for contact form functionality (see `.env.example`):
- `POSTMARKAPP_API_TOKEN`, `POSTMARK_FROM_EMAIL`, `POSTMARK_TO_EMAIL`
- `SLACK_WEBHOOK_USER_CONTACTS`
- `SUPPRESS_SLACK_MESSAGES` - set to `true` to disable Slack in development

### ESLint Configuration

Uses flat config (`eslint.config.js`). Unused variables prefixed with `_` are allowed.
