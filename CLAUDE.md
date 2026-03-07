# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Multi Color Printers website — a commercial printing company based in Zanzibar, Tanzania. This is a Next.js 16 marketing site being rebuilt from an old static HTML site (preserved in `old website/` for reference).

## Commands

- `npm run dev` — Start dev server (Turbopack)
- `npm run build` — Production build (TypeScript errors are ignored via `ignoreBuildErrors: true` in next.config.mjs)
- `npm run lint` — ESLint
- No test framework is configured

## Tech Stack

- **Next.js 16** (App Router) with React 19, TypeScript
- **Tailwind CSS v4** via `@tailwindcss/postcss` — uses `@import 'tailwindcss'` and `@theme inline` syntax (not `tailwind.config.js`)
- **shadcn/ui** components in `components/ui/` (Radix UI primitives + class-variance-authority)
- **Lucide React** for icons
- **Vercel Analytics** integrated in root layout
- Images are unoptimized (`images.unoptimized: true` in next config)

## Architecture

- `app/` — Next.js App Router pages: home, `/services`, `/portfolio`, `/about`, `/contact`
- `components/` — Page section components (hero-section, navbar, footer, etc.) and `ui/` subdirectory for shadcn primitives
- `lib/data.ts` — Centralized company info, nav links, and services list. All pages reference this for consistent data.
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

## Design System

- **Brand colors**: Primary red `#F21D2F`, secondary navy `#2E338C`, accent lavender `#9395BF`, background `#F2F2F2`
- **Fonts**: Inter (body, `--font-inter`), Space Grotesk (headings, `--font-space-grotesk`)
- CSS variables defined in `app/globals.css` with light/dark variants
- Use `font-heading` for headings, default `font-sans` for body text

## Path Aliases

`@/*` maps to project root (e.g., `@/components/navbar`, `@/lib/data`)

## Coding Practices
Don't commit anything to github directly