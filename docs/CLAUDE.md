# CLAUDE.md — Project Conventions for Claude Code

> Dit bestand vertelt Claude Code (en jezelf) hoe te werken in dit project.
> **Eerste actie bij elke nieuwe Claude Code sessie:** lees dit bestand volledig.
>
> Deze versie is geschreven als **algemene template** die je voor elk nieuw project kunt hergebruiken. Specifieke project-info verwijst naar `docs/project-brief.md`, `docs/functional-spec.md`, `docs/technical-spec.md` en `docs/project-plan.md`.

---

## 🚀 Eerste acties bij elke sessie

In deze volgorde, zonder uitzondering:

1. **Lees `CLAUDE.md`** (dit bestand) — context, regels, conventies
2. **Lees `docs/project-brief.md`** — wat bouwen we, voor wie, waarom
3. **Lees `docs/project-plan.md`** — waar staan we, wat is de volgende taak
4. **Check git status** — wat is laatst gewijzigd, zijn er uncommitted changes
5. **Run `pnpm install`** of equivalent — dependencies up-to-date
6. **Run de dev-server** — verifieer dat de app start zonder errors
7. **Vraag de gebruiker:** *"Welke taak uit het project-plan pakken we op?"*

Sla nooit stappen 1-3 over. Zonder context maak je verkeerde aannames.

---

## 📁 Mapstructuur (standaard)

Elk project volgt deze structuur. Wijk hier alleen van af met een goede reden.

```
project-naam/
├── app/                    # Next.js App Router pages
├── components/             # React componenten
│   ├── ui/                 # Base components (shadcn/ui)
│   ├── [feature]/          # Feature-specifieke componenten
│   └── shared/             # Header, footer, layout
├── lib/                    # Niet-React code
│   ├── [provider]/         # Per externe service (supabase, mistral, etc.)
│   └── utils/              # Pure utility-functies
├── content/                # Markdown content (blog, docs)
├── messages/               # i18n teksten per taal
├── public/                 # Statische assets
├── styles/                 # Globale CSS
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                   # ⚠️ ALTIJD LEZEN VOOR WERK
│   ├── CLAUDE.md           # Dit bestand
│   ├── project-brief.md
│   ├── functional-spec.md
│   ├── technical-spec.md
│   └── project-plan.md
├── .env.local              # NOOIT COMMITTEN
├── .env.example            # Wel committen
└── ...
```

---

## ✅ Werkregels (do's)

### Code-kwaliteit
1. **TypeScript strict mode** — geen `any`, geen `@ts-ignore` zonder commentaar waarom
2. **Functies < 50 regels** — splits in helpers als langer
3. **Componenten < 200 regels** — splits als groter
4. **Eén verantwoordelijkheid per component/functie** — als naam met "And" moet, splits
5. **Pure functies waar mogelijk** — makkelijker te testen
6. **Eerst types definiëren, dan code schrijven** — voorkomt verkeerde aannames

### Stijl
7. **Tailwind classes, geen inline styles** (`style={...}`) — uniforme design tokens
8. **shadcn/ui-componenten als basis** — niet zelf bouwen wat al bestaat
9. **Mobile-first responsive** — start met `flex flex-col`, voeg `md:flex-row` toe
10. **Server components als default** — alleen `"use client"` als interactie nodig
11. **Semantic HTML** — `<button>` niet `<div onClick>`, `<nav>` voor navigatie
12. **i18n keys**, geen hardcoded strings — alles via `useTranslations`

### Bestand-conventies
13. **kebab-case voor bestandsnamen** (`user-profile.tsx`, niet `UserProfile.tsx`)
14. **PascalCase voor component-namen** (`<UserProfile />`)
15. **camelCase voor functies en variabelen**
16. **SCREAMING_SNAKE_CASE voor constanten**

### Testing
17. **Schrijf tests voor utility-functies** (Vitest)
18. **Schrijf E2E voor kritieke flows** (Playwright)
19. **Test eerst de happy path, dan edge cases**

### Git & deployment
20. **Conventional commits**: `feat: ...`, `fix: ...`, `chore: ...`, `docs: ...`, `test: ...`
21. **Eén concept per commit** — geen "wip" of "fix things"
22. **Push naar feature branch**, nooit direct naar `main`
23. **PR-titel beschrijft de wijziging** — Reviewer moet snappen zonder code te lezen
24. **Vóór merge**: lint passt, types passen, tests slagen, preview deploy werkt

### Communicatie met gebruiker
25. **Werk taak voor taak**, niet alles tegelijk
26. **Toon je plan vóór grote wijzigingen** — wacht op akkoord
27. **Vraag bij twijfel** in plaats van aannames maken
28. **Rapporteer wat je hebt gedaan** — niet alleen output, ook context
29. **Schrijf in Nederlands tenzij anders gevraagd** — past bij de doelgroep

---

## ❌ Verboden acties

### Nooit doen
1. **`.env`, `.env.local`, secrets committen** — credentials *altijd* via Vercel env vars
2. **`any` of `@ts-ignore`** gebruiken zonder uitleg-commentaar erbij
3. **Inline styles** (`style={...}`) — gebruik Tailwind classes
4. **`localStorage` / `sessionStorage`** voor gevoelige data — gebruik server-side sessions
5. **Hardcoded strings in JSX** — alles via i18n
6. **Eigen auth bouwen** — gebruik Supabase Auth / Clerk
7. **Direct naar `main` pushen** — altijd via PR
8. **Force-push naar `main`** — geschiedenis blijft heilig
9. **Database-migrations zonder backup** — eerst kopie maken via Supabase dashboard
10. **Productiedata in dev gebruiken** — altijd eigen testdata
11. **Wachtwoorden in plain text loggen** — Sentry filtert niet automatisch
12. **EXIF-data van uploads bewaren** — altijd strippen vóór opslag
13. **Tracking-cookies plaatsen** — we zijn cookieless analytics
14. **Externe scripts laden** zonder Subresource Integrity hash
15. **Code committen zonder lint/typecheck** — pre-commit hook moet falen
16. **Een feature merge'n zonder PR-beschrijving** — toekomstige jij snapt het niet meer
17. **Bestanden van /mnt/skills/* bewerken** — alleen lezen, niet wijzigen
18. **API-tokens delen in chat** — altijd via env vars, ook met Claude Code

### Bij ESCALATIE — eerst vragen
- Productie-database wijzigen
- DNS-records aanpassen
- Domeinnaam veranderen
- Wachtwoord-reset voor andere gebruikers
- Bulk-delete operaties
- Verhuizen tussen hosting-providers
- AI-provider wisselen
- Pricing wijzigen
- Juridische teksten aanpassen

---

## 🛠 Standaard commando's

### Setup (eenmalig per machine)
```bash
pnpm install                     # of npm/yarn/bun
cp .env.example .env.local       # vul secrets in
pnpm db:types                    # genereer Supabase types
```

### Development
```bash
pnpm dev                         # start dev-server
pnpm typecheck                   # tsc --noEmit
pnpm lint                        # ESLint
pnpm test                        # Vitest
pnpm test:e2e                    # Playwright
pnpm build                       # Productie-build (lokaal verifiëren)
```

### Database (Supabase)
```bash
supabase start                   # lokale Supabase
supabase db push                 # migrations uitvoeren
supabase gen types typescript    # types regenereren
```

### Deploy
```bash
vercel                           # preview-deploy
vercel --prod                    # productie-deploy (alleen vanaf main)
```

---

## 🎯 Beslisregels

Bij twijfel tijdens een taak, hanteer deze prioriteiten **in volgorde**:

1. **Veiligheid** — bevat het risico op datalek, AVG-overtreding, financieel verlies? → STOP, vraag.
2. **Doelgroep** — past dit bij ouderen/mantelzorgers? Begrijpelijk in gewone taal? Toegankelijk (WCAG)?
3. **Eenvoud** — kan het simpeler? Minder code is minder bugs.
4. **Snelheid** — bouwt dit aan een werkende MVP, of is het scope-creep?
5. **Onderhoudbaarheid** — kan een toekomstige ontwikkelaar dit binnen 5 minuten begrijpen?

Specifieke trade-offs voor dit project:
- **Privacy > convenience** — geen data bewaren als het niet hoeft
- **Toegankelijkheid > esthetiek** — leesbare 16px liever dan mooie 12px
- **NL-correctheid > vertaalbaarheid** — schrijf NL eerst goed, vertaal dan
- **EU-leveranciers > US-leveranciers** als kwaliteit gelijk is
- **Werkend > perfect** — ship vroeg, itereer op feedback

---

## 🤝 Hoe communiceren we

### Wanneer je iets bouwt
1. **Beschrijf het plan** in 3-5 zinnen
2. **Wacht op akkoord** (tenzij triviaal: typefout, formatting)
3. **Voer uit, taak voor taak**
4. **Toon resultaat** met screenshot of korte uitleg
5. **Stel een vervolg-vraag** ("Volgende taak?")

### Wanneer je vastloopt
1. **Beschrijf wat je probeerde** — context
2. **Beschrijf wat er gebeurde** — fout, onverwacht gedrag
3. **Beschrijf wat je hebt geprobeerd** — verspild geen tijd op dezelfde dingen
4. **Vraag specifiek** — "Welke richting?", niet "Wat nu?"

### Wanneer je beslissing nodig hebt
1. **Beschrijf de keuze** in 2-3 zinnen
2. **Geef 2-4 opties** met voor- en nadelen
3. **Geef je eigen voorkeur** met onderbouwing
4. **Wacht op akkoord** voor je doorgaat

### Wanneer je iets vindt dat aandacht nodig heeft
- **Niet stilzwijgend repareren** als het zichtbare gedragsverandering is
- **Meld het** in een korte zin: *"Ik zag dat X niet klopte — heb het gefixt en hier is wat ik veranderde."*

---

## 📚 Verwijzingen

| Type vraag | Naar welk document |
|---|---|
| Wat bouwen we en voor wie? | `docs/project-brief.md` |
| Wat doet het product? | `docs/functional-spec.md` |
| Welke tech? Hoe gestructureerd? | `docs/technical-spec.md` |
| Wat is de volgende taak? | `docs/project-plan.md` |
| Hoe schrijf ik code in dit project? | `docs/CLAUDE.md` (dit bestand) |
| Heeft de gebruiker dit eerder besproken? | Kijk in `docs/` of vraag het |

---

## 🔄 Versiebeheer van deze documenten

Dit document evolueert met het project. Bij elke significante wijziging:

1. Update de versie hier onderaan
2. Commit met `docs: update CLAUDE.md — [reden]`
3. Vermeld de wijziging in PR-beschrijving

**Huidige versie:** 1.0 (initieel — bij start van project)
**Laatst bijgewerkt:** [vul in bij eerste commit]
**Volgende review:** na Fase 1 (week 5)
