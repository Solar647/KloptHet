# Technical Spec — Klopt Het

> Hoe gaan we het bouwen? Voor technische beslissingen tijdens het project: hier kijken.
> Alle gemaakte keuzes uit de vraag-en-antwoord-sessie staan hier vast met onderbouwing.

---

## 1. Stack — overzicht in één tabel

| Laag | Keuze | Waarom |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SSR + SEO + API routes in één codebase, bestaande React componenten herbruikbaar |
| Taal | **TypeScript (strict)** | Type-veiligheid in productieapp met geld + persoonlijke data |
| Styling | **Tailwind CSS 4** | Schaalt mee, geen inline-styles meer zoals in huidige code |
| Components | **shadcn/ui** | Geen lock-in, aanpasbaar, accessible by default |
| Hosting | **Vercel (EU-Frankfurt)** | Native Next.js, EU-data, AVG, gratis MVP-tier |
| Database | **Supabase Postgres** (EU-Frankfurt) | Open source, EU-region, AVG-compliant |
| Auth | **Supabase Auth** | Komt erbij, geen extra leverancier |
| Storage | **Supabase Storage** (EU-Frankfurt) | Tijdelijke screenshots, EU |
| AI | **Mistral Pixtral Large + 12B** | EU-AI, AVG-sterk, multimodal voor screenshots |
| Betalingen | **Mollie** | NL-bedrijf, iDEAL/Wero, EPI Principal Member, EU |
| E-mail | **Brevo** | FR-bedrijf, AVG, transactional + nieuwsbrief in één |
| Analytics | **Vercel Analytics** (cookieless) | Gratis, geen banner, AVG-vriendelijk |
| i18n | **next-intl** | NL + EN vanaf launch |
| Content (blog) | **MDX in repo** | Geen aparte CMS, Git als geschiedenis |
| CI/CD | **GitHub + Vercel** | Automatisch deploy bij push |
| Monitoring | **Sentry** (EU) | Errors, performance, AVG via DPA |
| Testing | **Vitest + Playwright** | Unit + integration + E2E |

---

## 2. Mapstructuur (Next.js 15 App Router)

```
klopthet/
├── app/                          # Pages + API routes (Next.js App Router)
│   ├── [locale]/                 # i18n: /nl/... en /en/...
│   │   ├── (marketing)/          # Publieke routes
│   │   │   ├── page.tsx          # Homepage
│   │   │   ├── prijzen/page.tsx
│   │   │   ├── voor-wie/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx      # Blog index
│   │   │   │   └── [slug]/page.tsx
│   │   │   └── ...
│   │   ├── (auth)/               # Auth routes (zonder navigatie)
│   │   │   ├── inloggen/page.tsx
│   │   │   ├── registreren/page.tsx
│   │   │   └── wachtwoord-vergeten/page.tsx
│   │   └── (dashboard)/          # Ingelogde routes (auth-guarded)
│   │       ├── layout.tsx        # Sidebar + auth check
│   │       ├── dashboard/page.tsx
│   │       ├── scan/page.tsx
│   │       ├── geschiedenis/page.tsx
│   │       └── instellingen/page.tsx
│   ├── api/                      # Server endpoints
│   │   ├── scan/route.ts         # Mistral API call + result
│   │   ├── webhooks/
│   │   │   └── mollie/route.ts   # Betalingsstatus updates
│   │   └── auth/...
│   ├── layout.tsx                # Root layout
│   └── not-found.tsx             # 404
├── components/
│   ├── ui/                       # shadcn/ui base components
│   ├── marketing/                # Homepage, hero, features, etc.
│   ├── scanner/                  # Upload, result, score-meter
│   ├── dashboard/                # Sidebar, stats cards, etc.
│   └── shared/                   # Header, footer, theme switcher
├── lib/
│   ├── ai/                       # AI abstractielaag
│   │   ├── provider.ts           # Interface: scan(input) → Verdict
│   │   ├── mistral.ts            # Mistral Pixtral implementatie
│   │   └── prompts/              # Prompt templates per taal
│   │       ├── nl.ts
│   │       └── en.ts
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── types.ts              # Database types (auto-generated)
│   ├── mollie/
│   │   ├── client.ts
│   │   └── webhooks.ts
│   ├── brevo/
│   │   └── send.ts               # Transactional + lijsten
│   └── utils/
│       ├── exif-strip.ts         # EXIF data verwijderen
│       ├── rate-limit.ts         # IP-based rate limiting
│       └── validation.ts         # Zod schemas
├── content/
│   └── blog/
│       ├── nl/                   # NL artikelen
│       │   └── kleinkind-truc.mdx
│       └── en/
├── messages/                     # i18n teksten
│   ├── nl.json
│   └── en.json
├── public/                       # Statische assets
│   ├── logo.svg
│   └── og-image.png
├── styles/
│   └── globals.css
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                         # PROJECT DOCS — KOPIE HIER NAARTOE
│   ├── project-brief.md
│   ├── functional-spec.md
│   ├── technical-spec.md
│   ├── project-plan.md
│   └── CLAUDE.md
├── .env.local                    # Niet committed
├── .env.example                  # Wel committed (template)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 3. AI-abstractielaag (cruciaal voor risico-mitigatie)

Mistral Pixtral is een strategische gok. Als kwaliteit op NL screenshots tegenvalt, moeten we kunnen switchen zonder herbouw. Daarom:

```typescript
// lib/ai/provider.ts
export interface AIProvider {
  scan(input: ScanInput): Promise<Verdict>;
}

export type ScanInput =
  | { kind: 'image'; data: Buffer; mimeType: string; locale: 'nl' | 'en' }
  | { kind: 'text'; text: string; locale: 'nl' | 'en' };

export interface Verdict {
  score: number;                  // 0-10
  category: 'safe' | 'doubt' | 'phishing';
  summary: string;                // max 3 zinnen, in juiste taal
  flags: Array<{
    label: string;
    severity: 'info' | 'warn' | 'danger';
  }>;
  fraudType?: string;             // 'grandchild' | 'delivery' | 'bank-impersonation' | ...
  learnMoreSlug?: string;         // Link naar relevant blog-artikel
  rawModelResponse?: string;      // Voor debugging
}
```

Implementaties:
- `lib/ai/mistral.ts` — primaire, gebruikt Pixtral Large/12B
- `lib/ai/claude.ts` — fallback, gebruikt Sonnet 4.6 (klaar als kwaliteit faalt)
- `lib/ai/openai.ts` — extra fallback

Switchen via env var: `AI_PROVIDER=mistral` of `claude`.

---

## 4. Database schema (Supabase / PostgreSQL)

Basis-tabellen (Supabase RLS = Row Level Security overal aan!):

```sql
-- Profiles (uitbreiding van auth.users)
create table public.profiles (
  id uuid references auth.users primary key,
  email text not null,
  full_name text,
  locale text default 'nl',
  notification_prefs jsonb default '{}',
  created_at timestamptz default now()
);

-- Subscriptions (Mollie-koppeling)
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles not null,
  mollie_customer_id text,
  mollie_subscription_id text,
  status text not null,           -- 'trial' | 'active' | 'cancelled' | 'past_due'
  tier text not null,             -- 'free' | 'standard' | 'family'
  current_period_end timestamptz,
  created_at timestamptz default now()
);

-- Scans (geschiedenis)
create table public.scans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles,  -- nullable voor anoniem
  ip_hash text,                              -- voor rate-limit (geen ruwe IP)
  input_kind text not null,                  -- 'image' | 'text'
  verdict_category text not null,            -- 'safe' | 'doubt' | 'phishing'
  verdict_score int not null,
  verdict_summary text,
  verdict_flags jsonb,
  fraud_type text,
  locale text not null,
  ai_provider text not null,
  ai_model text not null,
  scan_duration_ms int,
  created_at timestamptz default now()
);

-- Family (Fase 2)
create table public.families (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles not null,
  name text,
  created_at timestamptz default now()
);

create table public.family_members (
  family_id uuid references public.families,
  user_id uuid references public.profiles,
  role text not null,             -- 'owner' | 'member' | 'caregiver'
  invited_at timestamptz,
  joined_at timestamptz,
  primary key (family_id, user_id)
);

-- Rate limiting (anoniem gebruik)
create table public.rate_limits (
  ip_hash text primary key,
  scans_this_month int default 0,
  reset_at timestamptz
);

-- Newsletter opt-in
create table public.newsletter (
  email text primary key,
  user_id uuid references public.profiles,
  locale text default 'nl',
  subscribed_at timestamptz default now(),
  unsubscribed_at timestamptz
);
```

### RLS-policies (essentieel!)
- `profiles`: alleen zelf SELECT/UPDATE
- `scans`: alleen eigen scans SELECT
- `subscriptions`: alleen eigen abonnement SELECT
- `family_members`: SELECT als je member bent van familie

---

## 5. Security & AVG

### AVG-checklist
- ✅ Alle data in EU (Vercel-EU, Supabase EU-Frankfurt, Mistral EU)
- ✅ DPA's met alle verwerkers (Mistral, Supabase, Vercel, Mollie, Brevo, Sentry)
- ✅ Privacyverklaring leesbaar voor doelgroep (geen jargon)
- ✅ Cookieverklaring + cookieless analytics → geen banner
- ✅ AVG-rechten in dashboard:
  - Inzage (export al je data als JSON)
  - Verwijdering (account-delete → cascade)
  - Rectificatie (profile-edit)
- ✅ Datalek-procedure gedocumenteerd
- ✅ Verwerkingsregister bijgehouden
- ✅ Screenshots binnen 5 minuten verwijderd uit Storage
- ✅ Geen training van AI op user-data (in Mistral DPA bevestigen)
- ✅ EXIF-data gestript vóór AI-call
- ✅ Bestandsnaam geanonimiseerd vóór opslag

### Security-maatregelen
- HTTPS overal (Vercel automatisch)
- Content Security Policy (CSP) headers
- Rate limiting op API endpoints (Upstash of Vercel KV)
- Input-validatie met Zod
- SQL via Supabase client (geparametriseerd, geen injection)
- Auth-tokens via httpOnly cookies
- CSRF-bescherming (Next.js Server Actions hebben dit ingebouwd)
- Secrets in Vercel env vars, nooit in code

### Wachtwoorden
- Bcrypt via Supabase Auth (standaard)
- Minimaal 8 tekens
- Geen complexe-regels (gevaarlijk voor doelgroep)

---

## 6. Performance-budget

Cruciaal omdat doelgroep ouderen vaak op oudere telefoons en tragere verbindingen zit.

### Targets (Core Web Vitals)
- **LCP < 2.5s** (Largest Contentful Paint)
- **FID < 100ms** (First Input Delay)
- **CLS < 0.1** (Cumulative Layout Shift)
- **Time to Interactive < 3.5s** op 3G

### Maatregelen
- Server-side rendering voor alle marketing-pagina's
- Image optimization via Next.js `<Image>` (WebP/AVIF)
- Lazy loading van zwaardere componenten (scanner, dashboard)
- Font subsetting: max 2 lettertypen (i.p.v. huidige 5)
- Preload kritieke fonts
- Geen client-side animations zonder waarde
- `prefers-reduced-motion` respecteren

### Monitoring
- Vercel Analytics voor Real User Metrics
- Sentry voor performance traces

---

## 7. API endpoints

```
POST   /api/scan                  # Upload image of tekst, krijg verdict
GET    /api/scan/[id]             # Eerdere scan ophalen (auth)
GET    /api/scans                 # Geschiedenis (auth, paginated)
DELETE /api/scans/[id]            # Eigen scan verwijderen (auth)

POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/reset-password
GET    /api/auth/me

POST   /api/subscriptions/checkout    # Mollie payment flow start
POST   /api/subscriptions/cancel
GET    /api/subscriptions/me

POST   /api/webhooks/mollie           # Mollie status updates
POST   /api/webhooks/brevo            # Bounce/complaint handling

POST   /api/contact                   # Contactformulier → Brevo

POST   /api/newsletter/subscribe
POST   /api/newsletter/unsubscribe

GET    /api/data/export               # AVG inzage-recht
DELETE /api/account                   # AVG verwijdering
```

### Rate-limiting
- `/api/scan`: 3/maand voor anoniem, op IP-hash
- `/api/auth/*`: 5/minuut per IP
- Andere endpoints: 60/minuut per user

---

## 8. Deployment & CI/CD

### Omgevingen
- **Local development**: `localhost:3000`
- **Preview** (Vercel): elke PR krijgt automatische preview URL
- **Staging**: `staging.klopthet.nl` — laatste main branch
- **Production**: `klopthet.nl` — handmatige promotie vanaf staging

### CI/CD-flow
1. Push naar feature branch → Vercel preview deploy
2. PR review (door jou of mij)
3. Merge naar `main` → staging deploy
4. Manual promotion → production
5. GitHub Actions: lint, type-check, tests, build

### Environment variables (categorisering)
- `NEXT_PUBLIC_*` — veilig client-side
- Alles anders alleen server-side
- Aparte secrets voor staging en production

---

## 9. Third-party leveranciers — DPA checklist

Voor AVG-compliance hebben we met elk een DPA (Data Processing Agreement) nodig:

| Leverancier | DPA-link / status |
|---|---|
| Vercel | DPA standaard, EU-region | https://vercel.com/legal/dpa |
| Supabase | DPA standaard, EU-region | https://supabase.com/legal/dpa |
| Mistral | DPA-aanvraag bij EU-zakelijke klanten | https://mistral.ai/terms#data-processing-agreement |
| Mollie | DPA standaard | https://mollie.com/legal/data-processing-agreement |
| Brevo | DPA standaard | https://brevo.com/legal/dpa |
| Sentry | DPA standaard, EU-region | https://sentry.io/legal/dpa |
| GitHub | DPA standaard (alleen code, geen user-data) | https://github.com/customer-terms |

**Actie:** alle DPA's downloaden en op één plek bewaren. In privacyverklaring noemen als sub-verwerkers.

---

## 10. Monitoring & error tracking

### Sentry-config
- EU-region (`sentry.io/region/eu`)
- Source maps geüpload bij elke deploy
- User-context: alleen anonieme user-id (geen e-mail, naam)
- Performance traces voor scan-flow

### Logs
- Vercel logs voor server requests
- Supabase logs voor database queries
- Custom logging via `console.log` met `vercel logs` of LogTail

### Alerts (Sentry)
- 5xx-errors → e-mail
- Performance degradatie (scan > 10s) → e-mail
- AI-provider errors → Slack of e-mail

### Uptime
- Vercel heeft 99.99% SLA
- Optioneel: extra uptime-monitor via UptimeRobot (gratis)

---

## 11. Testing-strategie

### Unit tests (Vitest)
- Utilities (EXIF strip, validatie, AI provider interface)
- Pure functies in `lib/`
- Doel: >70% coverage op utilities

### Integration tests (Vitest + testing-library)
- Componenten met logica (scanner, dashboard widgets)
- API route handlers
- Doel: critical paths gedekt

### E2E tests (Playwright)
- Volledige scan-flow (anoniem)
- Registratie + eerste scan flow
- Abonnement-afsluiten flow
- Password reset flow
- Doel: 5-10 happy paths op productie-staging

### Accessibility tests
- axe-core in CI pipeline
- Screen reader manual test vóór elke release (NVDA + VoiceOver)
- WCAG 2.1 AA target

### AI quality tests
- Curated set van 100 voorbeeld-screenshots
- Verwacht verdict per screenshot vastleggen
- Bij elke prompt-aanpassing of model-upgrade: re-run en vergelijken
- Doel: >85% accuracy op test set

---

## 12. Belangrijke design-/code-besluiten

### Geen inline styles meer
Huidige code heeft tientallen `style={...}` props per component. Migratie naar Tailwind classes:
- Onderhoudsvriendelijker
- Kleinere bundles
- Design tokens centraal

### Component-strategie
- Marketing-componenten: server components waar mogelijk (sneller, SEO)
- Interactieve componenten: client components met "use client"
- Geen onnodige client-component bubbling

### Internationalisering
- next-intl als framework
- Alle teksten in `messages/[locale].json`
- Geen hardcoded strings in code

### Dark/light mode
- **Bewust beslissing nodig:** huidig design is donker. Voor doelgroep ouderen mogelijk te zwaar.
- Plan: in validatie-sprint testen of light mode standaard beter werkt
- Implementatie: CSS variabelen via Tailwind, theme-switcher beschikbaar

### Geen tweak-panel in productie
Verwijderen vóór launch. Eventueel achter `?debug=true` flag voor jezelf.

---

## 13. Verboden tech-keuzes (om scope-creep te voorkomen)

- ❌ Custom auth bouwen (te risicovol)
- ❌ Eigen AI-model trainen (overkill voor MVP)
- ❌ Mobile app (PWA volstaat)
- ❌ Microservices (één Next.js monolith volstaat)
- ❌ GraphQL (REST + Server Actions volstaan)
- ❌ Redis voor caching (Next.js cache + Supabase realtime volstaan)
- ❌ Eigen file-storage (Supabase Storage)
- ❌ Notion API als CMS (Markdown in repo is sneller)
- ❌ Een aparte mobiele backend (alle API in Next.js)
