# Master Your Face

Webové stránky pro [masteryourface.cz](https://masteryourface.cz) — make-up workshopy, firemní eventy a portrétní focení.

---

## Pro klienta

### Co tento web umí

- **Nabídka služeb** — přehled workshopů (individuální, firemní) a portrétního focení
- **Kurzy** — aktuální termíny se načítají z redakčního systému Contentful, stačí je tam přidat/upravit a na webu se automaticky objeví
- **Kontaktní formulář** — odesílá zprávy přímo na e-mail, chráněný proti spamu
- **Galerie / Showcase** — obrázky spravované přes Contentful

### Jak upravit obsah

Většinu obsahu (kurzy, galerii, showcase) lze měnit přímo v **Contentful** bez zásahu do kódu. Po uložení změn v Contentful se nový obsah na webu objeví do několika minut.

Pro změny textů na stránkách (nadpisy, popisy služeb, FAQ) je potřeba upravit kód — kontaktujte vývojáře.

### Kde web běží

Web je nasazený na **Vercel** a připojený ke Git repozitáři. Každá změna v kódu se automaticky nasadí do produkce.

---

## Pro vývojáře

### Tech stack

| Vrstva | Technologie |
|---|---|
| Frontend | React 19, TypeScript (strict), Vite 7, Tailwind CSS 4 |
| Komponenty | shadcn/ui (Radix UI primitives) |
| Data fetching | TanStack React Query |
| CMS | Contentful (Delivery API) |
| Backend | Vercel Serverless Functions (Node.js) |
| E-mail | Nodemailer (SMTP) |
| Hosting | Vercel |
| CI | GitHub Actions (lint, typecheck, build) |

### Struktura projektu

```
├── api/                    # Vercel serverless funkce
│   ├── _lib/               # Sdílené utility (CORS, HMAC, rate limit, sanitizace)
│   ├── contact.ts          # POST — kontaktní formulář
│   ├── courses.ts          # GET  — kurzy z Contentful
│   ├── showcase.ts         # GET  — galerie z Contentful
│   └── token.ts            # GET  — HMAC token pro formulář
├── src/
│   ├── components/         # React komponenty
│   │   └── ui/             # shadcn/ui primitives
│   ├── hooks/              # Custom hooks (useCourses, useShowcase, …)
│   ├── pages/              # Route komponenty (lazy-loaded)
│   └── App.tsx             # Router, providers, ErrorBoundary
├── .github/workflows/      # CI pipeline
├── vercel.json             # Security headers, rewrites
└── package.json
```

### Lokální vývoj

Požadavky: Node.js 20+ a npm.

```sh
git clone <REPO_URL>
cd masteryourface
npm ci
```

Pro lokální vývoj včetně API routes je potřeba Vercel CLI:

```sh
npx vercel dev
```

Zkopírujte `.env.example` → `.env` a vyplňte potřebné hodnoty (Contentful, SMTP, HMAC secret).

### Skripty

| Příkaz | Popis |
|---|---|
| `npm run dev` | Vite dev server (pouze frontend) |
| `npx vercel dev` | Dev server s API routes |
| `npm run build` | Produkční build + prerendering |
| `npm run lint` | ESLint |
| `npm run type-check` | `tsc --noEmit` |
| `npm run preview` | Preview produkčního buildu |

### Environment variables

Všechny proměnné jsou server-side only (žádný `VITE_` prefix). Nastavují se ve Vercel dashboardu.

| Proměnná | Účel |
|---|---|
| `CONTENTFUL_SPACE_ID` | Contentful Space ID |
| `CONTENTFUL_ACCESS_TOKEN` | Contentful Delivery API token |
| `SMTP_HOST` | SMTP server (default: `smtp.gmail.com`) |
| `SMTP_PORT` | SMTP port (default: `587`) |
| `SMTP_USER` | SMTP přihlašovací e-mail |
| `SMTP_PASSWORD` | SMTP heslo / app password |
| `CONTACT_EMAIL` | Kam se posílají zprávy z formuláře |
| `FORM_TOKEN_SECRET` | HMAC secret (min. 32 random bajtů) |

Generování HMAC secretu:

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Bezpečnost

- **Security headers** — CSP, HSTS (preload), X-Frame-Options DENY, Permissions-Policy
- **CSRF ochrana** — HMAC-SHA256 tokeny vázané na IP + timestamp, timing-safe porovnání
- **Sanitizace vstupů** — type guards, délkové limity, regex validace, HTML escaping, ochrana proti header injection
- **Rate limiting** — in-memory sliding window (kontakt: 10/h/IP, token: 20/h/IP)
- **Honeypot** — skryté pole ve formuláři
- **URL allowlisting** — Contentful CDN a booking domény

### CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) běží na každém push/PR do `main`:

1. `npm run type-check`
2. `npm run lint`
3. `npm run build`

Deployment zajišťuje Vercel Git integration automaticky.

### Package manager

Projekt používá **npm**. Nepoužívejte Bun, Yarn ani pnpm — lockfile je `package-lock.json`.
