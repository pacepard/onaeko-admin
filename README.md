# Onaeko Admin

Academy pack: see `.academy/` (prompt-plan, idea, specs). Leftover `/onboarding` is not Academy Done.

Vite + React + TypeScript app for **admin** (Onaeko) — organisation onboarding and admin workspace.

Local default: [http://localhost:5403](http://localhost:5403)

## Organisations (admin user type)

Admins belong to the **Organisations** category:

| Type | Details |
| --- | --- |
| Schools | Teachers, Parents/Guardians, Counsellors |
| University | Private, Federal, State |
| UTME Tutorial Centres | Exam-prep centres |
| Nonprofits | Reach + customer acquisition model |
| The Onaeko Team | Internal staff |

## Stack

- [Vite](https://vite.dev/guide/) 7
- React 19
- TypeScript
- React Router 7
- [`@onaeko/ui`](https://www.npmjs.com/package/@onaeko/ui) (npm `^0.3.0`)

## Prerequisites

- Node `20.x`
- pnpm `9.15.4` (see `packageManager` in `package.json`)

## Setup

```bash
cd onaeko-admin
pnpm install
cp .env.example .env.local
pnpm dev
```

Open **http://localhost:5403**.

### Environment

| Variable | Purpose | Example |
| --- | --- | --- |
| `VITE_APP_API_URL` | Backend API base URL | `http://localhost:5015/api/v1` |
| `VITE_APP_URL` | This app’s public origin | `http://localhost:5403` |
| `VITE_ENVIRONMENT` | Runtime env label | `local` locally |
| `VITE_ACCOUNTS_URL` | Accounts origin (auth lives there) | `http://localhost:5401` |
| `VITE_USE_MOCKS` | Local mock rail only. Leave unset for real API. | never on staging/prod |

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Dev server on **port 5403** |
| `pnpm build` | Typecheck + production build |
| `pnpm preview` | Preview production build on **port 5403** |
| `pnpm typecheck` | `tsc -b` only |
| `pnpm lint` | Oxlint |

## Deploy on Vercel

1. Import the `onaeko-admin` GitHub repo as a new Vercel project (root = repo root).
2. Framework Preset: **Vite** (or leave auto — `vercel.json` sets `framework`, `buildCommand`, `outputDirectory`).
3. Add env vars from `.env.example` (Production / Preview as needed).
4. Deploy. SPA deep links are covered by the rewrite to `/index.html`.

## Notes

- Path alias: `@/*` → `src/*`
- Import UI from package entries (`@onaeko/ui`, `@onaeko/ui/button`, …)
- `/` redirects to onboarding; organisation admins use `userType: admin`
