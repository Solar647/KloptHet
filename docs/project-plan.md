# Project Plan — Klopt Het

> Wanneer doen we wat? Concrete fases met taken, in volgorde, met geschatte tijd.
> Bij elke nieuwe Claude Code sessie: open dit en pak de volgende taak.

---

## Geschatte tijdlijn

**Totaal: ~12-14 weken (3-3,5 maanden) van eerste taak tot productie.**

Uitgaande van ~25-35 uur per week werk. Bij minder tijd → schaal evenredig.

```
Week 1-2    │  Fase 0 — Validatie + Pre-launch foundations
Week 3-5    │  Fase 1 — Foundation & infrastructure
Week 6-9    │  Fase 2 — MVP-functionaliteit bouwen
Week 10-11  │  Fase 3 — Content, polish, accessibility, performance
Week 12-13  │  Fase 4 — Pre-launch testen + soft launch
Week 14+    │  Fase 5 — Public launch + iteratie
```

---

## Fase 0 — Validatie + Pre-launch foundations (Week 1-2)

**Doel:** validatie van aannames + alle juridisch-administratieve zaken in gang zetten zodat ze klaar zijn als we ze nodig hebben.

### 0.1 Validatie-sprint
- [ ] Schets de 3 personas (Truus, Marieke, Jan) in 1 pagina
- [ ] Maak een **landingpage met wachtlijst** als eerste deploy (zie 1.1) — bewust voor Fase 1
- [ ] Plan 5-8 interviews (20 min) met mantelzorgers + ouderen
- [ ] Stel interviewvragen op (prijs, design, "u" vs "jij", behoefte)
- [ ] Toon huidige Claude Design-versie als mockup
- [ ] **Beslispunt einde week 2:** pivot of doorgaan?

### 0.2 Bedrijfsmatige zaken (parallel)
- [ ] **KvK inschrijven** (eenmanszaak — bij groei pas BV)
- [ ] BTW-nummer aanvragen
- [ ] **Zakelijke IBAN** openen (Bunq Business, KNAB, of ING Zakelijk)
- [ ] **Domeinnaam registreren:** klopthet.nl + klopthet.com + klopthetwel.nl (€30/jaar samen, TransIP of Vimexx)
- [ ] **E-mailadres opzetten:** hulp@klopthet.nl, info@klopthet.nl (via Google Workspace €6/mnd of Zoho Mail gratis tier)
- [ ] **Logo + huisstijl** beslissen (huidig "oog" logo werkt — kleine refresh nodig)

### 0.3 Accounts aanmaken
- [ ] GitHub-organisatie of repo
- [ ] Vercel account → koppelen aan GitHub
- [ ] Supabase project (EU-Frankfurt!)
- [ ] Mistral console account + API key
- [ ] Mollie account (KYC begint, duurt 3-7 werkdagen)
- [ ] Brevo account
- [ ] Sentry account (EU-region)
- [ ] **Belangrijke check:** alles in EU-regio geconfigureerd

### 0.4 Juridische voorbereiding
- [ ] Zoek 2-3 NL-juristen met AVG/SaaS-ervaring → offerte aanvragen voor "concept review"
- [ ] Concept-versies (door mij/AI) van: Privacyverklaring, Cookieverklaring, AV, Impressum
- [ ] Verwerkingsregister opzetten (template)

**Verwachte tijd Fase 0: 40-60 uur over 2 weken (parallelle taken).**

---

## Fase 1 — Foundation & Infrastructure (Week 3-5)

**Doel:** technische basis staat, **wachtlijst-landingpage live**, je kunt de eerste e-mails verzamelen.

### 1.1 Project-setup
- [ ] Next.js 15 project initialiseren met TypeScript, Tailwind, App Router
- [ ] shadcn/ui installeren + theme configureren (groen-cream palet)
- [ ] ESLint, Prettier, Husky pre-commit hooks
- [ ] `tsconfig.json` strict mode aan
- [ ] Github actions: lint + typecheck + build
- [ ] Vercel project: koppelen aan GitHub, env vars instellen
- [ ] First deploy: `Hello world` op klopthet.nl-staging.vercel.app

### 1.2 i18n setup
- [ ] next-intl installeren
- [ ] `messages/nl.json` + `messages/en.json` met basisstrings
- [ ] Locale-routing: `/nl/...`, `/en/...`
- [ ] Automatic locale detection (browser + cookie)
- [ ] Language switcher component

### 1.3 Design system
- [ ] Design tokens vastleggen in Tailwind config:
  - Kleuren (forest greens, cream, accent)
  - Typografie (max 2 lettertypes — kiezen)
  - Spacing scale
  - Border radii
  - Shadow scale
- [ ] Basis-componenten met shadcn/ui: Button, Input, Card, Dialog, Toast, Alert
- [ ] Layout-componenten: Container, Section, Stack
- [ ] Header + Footer met huidige merkidentiteit
- [ ] Dark/light mode toggle (validatie-sprint bepaalt default)

### 1.4 Wachtlijst-landingpage (live in week 3!)
- [ ] Eenvoudige hero met merkbelofte
- [ ] E-mail signup form → opslaan in Supabase `newsletter` tabel
- [ ] Auto-confirmatie e-mail via Brevo
- [ ] Linkjes: privacy (placeholder), contact (placeholder)
- [ ] Deploy naar productie domein `klopthet.nl`
- [ ] Plausible/Vercel Analytics actief
- [ ] **Doel:** vanaf hier kun je de wachtlijst delen tijdens validatie-gesprekken

### 1.5 Supabase setup
- [ ] Database schema migrations schrijven (zie technical-spec.md)
- [ ] RLS-policies inschakelen op alle tabellen
- [ ] Storage bucket aanmaken (`scans-temp`, 5-min retentie)
- [ ] Lokale dev-environment via Supabase CLI
- [ ] TypeScript types auto-genereren

### 1.6 AI-abstractielaag (vroeg!)
- [ ] `lib/ai/provider.ts` interface
- [ ] `lib/ai/mistral.ts` implementatie (Pixtral Large)
- [ ] `lib/ai/claude.ts` implementatie (klaar als fallback)
- [ ] Mock provider voor tests
- [ ] Eerste integratietest: scan een test-screenshot
- [ ] Quality testset opzetten: 20-30 voorbeeld-screenshots met verwachte verdicten

**Verwachte tijd Fase 1: 80-100 uur over 3 weken.**

---

## Fase 2 — MVP-functionaliteit bouwen (Week 6-9)

**Doel:** alle kernfuncties werken end-to-end op staging.

### 2.1 Scanner (week 6)
- [ ] Upload-component (drag/drop + file picker + camera op mobiel)
- [ ] Tekst-input fallback
- [ ] EXIF-strip + bestandsnaam-anonimisering
- [ ] Upload naar Supabase Storage
- [ ] `/api/scan` endpoint: ophalen file → Mistral call → verdict opslaan
- [ ] Rate-limiting (3/maand anoniem op IP-hash)
- [ ] Verdict-result UI: score-meter, kleurcode, uitleg, flags, leerlink
- [ ] Auto-cleanup van Storage na 5 min (Supabase function of cron)
- [ ] Loading states + foutafhandeling
- [ ] Mobile-first responsive

### 2.2 Authentication (week 6-7)
- [ ] Supabase Auth setup: e-mail/wachtwoord + Google
- [ ] `/registreren` pagina met AV/Privacy-checkbox
- [ ] `/inloggen` pagina
- [ ] `/wachtwoord-vergeten` flow met Brevo-mail
- [ ] E-mailverificatie-flow
- [ ] Auth-middleware (Next.js) voor protected routes
- [ ] Brevo: welkomstmail template (NL + EN)

### 2.3 Dashboard (week 7-8)
- [ ] Dashboard layout met sidebar
- [ ] `/dashboard` overzicht: laatste scans, statistiek, snelle scan-knop
- [ ] `/dashboard/scan` — onbeperkt voor abonnees
- [ ] `/dashboard/geschiedenis` — paginated list
- [ ] `/dashboard/instellingen` — profiel, wachtwoord, taal
- [ ] AVG-features: export al je data (JSON download), account verwijderen
- [ ] User-aware rate-limiting

### 2.4 Mollie-integratie (week 8)
- [ ] Mollie SDK installeren
- [ ] Pricing-pagina met 2 tiers (Gratis, Standaard) — Familie pas in Fase 2
- [ ] Monthly/yearly toggle
- [ ] Checkout-flow: select tier → naar Mollie hosted checkout → terug naar app
- [ ] Webhook `/api/webhooks/mollie` voor status updates
- [ ] Database sync: subscription status, period_end
- [ ] Dashboard: huidig abonnement zien, opzeggen, factuur downloaden
- [ ] Test in Mollie test-mode

### 2.5 Marketing-pagina's (week 8-9)
- [ ] Homepage — herwerk huidige hero, "Hoe het werkt", "Voor wie"
- [ ] `/hoe-het-werkt`
- [ ] `/voor-wie` (ouderen + mantelzorgers secties)
- [ ] `/prijzen`
- [ ] `/voorbeelden` — galerij van gevangen scams (eerste 6-10 voorbeelden)
- [ ] `/over-ons` — wie zit erachter
- [ ] `/contact` — formulier → Brevo
- [ ] Footer met alle juridische links
- [ ] **Belangrijke design-verbeteringen** (zie functional-spec.md sectie 11):
  - Italics-gebruik verminderen
  - Min fontgrootte 16px overal
  - Contrast WCAG AA
  - Max 2 lettertypes
  - Hover-states + focus-states + touch-friendly

### 2.6 Blog-infrastructuur (week 9)
- [ ] MDX-setup: `next-mdx-remote` of `contentlayer`
- [ ] `/blog` index pagina met categorieën
- [ ] `/blog/[slug]` detail pagina
- [ ] Reading time, share buttons (WhatsApp, e-mail, copy link)
- [ ] Sitemap.xml auto-generatie
- [ ] RSS-feed
- [ ] Open Graph + Twitter meta tags
- [ ] **Eerste 5 artikelen geschreven** (NL + EN):
  1. *Wat is de kleinkind-truc en hoe herken je 'm?*
  2. *Sms van bezorgdienst: betalen of negeren?*
  3. *Hoe weet ik of een ING-bericht echt is?*
  4. *Romantiek-scams op WhatsApp: een familieverhaal*
  5. *De 5 meest voorkomende oplichtingstrucs van 2026*

### 2.7 Juridisch live (week 9)
- [ ] Privacyverklaring (concept naar jurist begin Fase 0, terug nu)
- [ ] Cookieverklaring
- [ ] Algemene voorwaarden
- [ ] Impressum (KvK staat nu bekend)
- [ ] Verwerkersregister actueel

**Verwachte tijd Fase 2: 140-180 uur over 4 weken.**

---

## Fase 3 — Polish, accessibility, performance (Week 10-11)

**Doel:** het product is geen MVP meer, het is **launchworthy**.

### 3.1 Accessibility-audit
- [ ] Manual screen reader test (NVDA + VoiceOver) — alle kernflows
- [ ] axe-core in CI pipeline
- [ ] Skip-links op alle pagina's
- [ ] Aria-labels op iconen
- [ ] Focus-rings overal zichtbaar
- [ ] Keyboard-navigatie volledig werkend
- [ ] `prefers-reduced-motion` respecteren
- [ ] Contrast check overal WCAG AA, scanner-flow AAA
- [ ] Fontgroottes: min 16px body, 17-18px voor doelgroep-pagina's

### 3.2 Performance-audit
- [ ] Lighthouse score >90 op alle Core Web Vitals
- [ ] Images: WebP/AVIF, lazy loading, juiste sizes
- [ ] Font-subsetting + preload kritieke fonts
- [ ] Bundle-analyse → onnodig zware deps verwijderen
- [ ] Server components waar mogelijk (vs client components)
- [ ] Test op echte oudere telefoon (Samsung uit 2019, 3G simulatie)

### 3.3 SEO
- [ ] Meta tags op alle pagina's (title, description, OG, Twitter)
- [ ] Sitemap.xml live + ingediend bij Google Search Console
- [ ] Robots.txt
- [ ] Schema.org structured data:
  - Organization op homepage
  - Article op blog
  - FAQPage op /hoe-het-werkt
  - Product op /prijzen
- [ ] Canonical URLs
- [ ] Hreflang tags (NL + EN versies)
- [ ] Open Graph image generator (Vercel OG)

### 3.4 Content-uitbreiding
- [ ] 5 extra blog-artikelen schrijven (totaal 10 bij launch)
- [ ] 10-15 voorbeelden in `/voorbeelden`
- [ ] FAQ-sectie uitbreiden op homepage + `/hoe-het-werkt`

### 3.5 E-mail-flows finaliseren
- [ ] Alle transactional templates ontworpen + getest (NL + EN)
- [ ] Welkomstmail nieuwe gebruiker
- [ ] Eerste-scan-felicitatie e-mail
- [ ] Wekelijkse nieuwsbrief-template + eerste editie
- [ ] Onsubscribe-flow (één-klik AVG-vereiste)

### 3.6 Monitoring & alerting
- [ ] Sentry: alle errors → e-mail
- [ ] Uptime monitor (UptimeRobot)
- [ ] AI-quality monitoring: dagelijks 5 sample-scans tegen testset

**Verwachte tijd Fase 3: 70-90 uur over 2 weken.**

---

## Fase 4 — Pre-launch testen + soft launch (Week 12-13)

**Doel:** zekerheid dat het werkt, eerste echte gebruikers, feedback ophalen.

### 4.1 End-to-end testen
- [ ] Playwright suite met 10 happy paths
- [ ] Manueel testen op verschillende devices:
  - iPhone (laatste + ouder model)
  - Android (Samsung, OnePlus)
  - iPad
  - Desktop Chrome, Safari, Firefox, Edge
- [ ] AI-quality test: 50 nieuwe screenshots → vergelijk met verwachte verdicten
- [ ] Mollie test-mode: alle betaalflows
- [ ] Brevo: alle e-mails komen door anti-spam
- [ ] Load test: 100 gelijktijdige gebruikers (k6 of Artillery)

### 4.2 Juridische go/no-go
- [ ] Jurist feedback verwerkt
- [ ] Privacy/Cookie/AV definitief geaccepteerd
- [ ] DPA's met alle verwerkers definitief
- [ ] AP-meldingsplicht voorbereid (datalek-procedure document)
- [ ] Aansprakelijkheidsverzekering overwegen (eenmanszaak risico!)

### 4.3 Soft launch (week 12)
- [ ] Open voor wachtlijst-aanmeldingen (~50-200 personen)
- [ ] Eerste 50 krijgen gratis "Standaard-tier" voor 3 maanden in ruil voor feedback
- [ ] Feedback-formulier in dashboard
- [ ] Wekelijkse check-in: wat werkt, wat niet
- [ ] AI-prompt tuning op basis van echte data

### 4.4 Productie-monitoring (week 13)
- [ ] Sentry-trends bekijken
- [ ] Conversie van homepage → registratie → eerste scan → abonnement
- [ ] Bottlenecks identificeren
- [ ] Hotfixes deployen

**Verwachte tijd Fase 4: 50-70 uur over 2 weken.**

---

## Fase 5 — Public launch + iteratie (Week 14+)

**Doel:** breed lanceren, eerste 1.000 gebruikers, leren en bouwen aan Fase 2.

### 5.1 Public launch
- [ ] PR-pitches naar Radar, Kassa, NU.nl, Telegraaf, AD
- [ ] LinkedIn-posts (sector: zorg, ouderenwelzijn)
- [ ] Facebook-ads gericht op mantelzorgers (35-55, Nederland, interesse "ouders helpen", "zorgen voor ouderen")
- [ ] Eerste persbericht
- [ ] Outreach naar ouderenbonden (KBO-PCOB, ANBO)
- [ ] Outreach naar gemeentes (digitale weerbaarheid programma's)

### 5.2 Iteratie op feedback
- [ ] Wekelijkse productiviteits-meetings met jezelf: wat valt op?
- [ ] AI-prompt-iteraties op basis van false positives/negatives
- [ ] Design-tweaks op basis van usability-feedback
- [ ] Bug fixes prioriteren

### 5.3 Fase 2 voorbereiden (na ~maand 4)
- [ ] Familie-account schema bouwen
- [ ] Mantelzorger-dashboard ontwerpen
- [ ] Cadeau-abonnement flow
- [ ] WhatsApp Business API voor notificaties
- [ ] Beslispunt: B2B-route starten?

---

## Risico's & mitigaties

| Risico | Impact | Mitigatie |
|---|---|---|
| Mistral Pixtral-kwaliteit op NL screenshots tegenvalt | Hoog | AI-abstractielaag → switch naar Claude in <1 dag |
| Validatie laat zien dat doelgroep geen abonnement wil | Hoog | Eenmalige check-aankoop als optie, cadeau-flow versterken |
| KvK + Mollie KYC duurt te lang | Middel | Direct in week 1 starten |
| Domein klopthet.nl niet beschikbaar | Hoog | Direct verifiëren in week 1, alternatieven klaar |
| Concurrent Checkjelinkje breidt uit | Middel | Snelheid, focus op educatie + familie |
| Aansprakelijkheid bij gemiste fraude | Hoog | Sterke disclaimer in AV, evt. verzekering |
| Solo-burnout door scope | Hoog | Houd je aan scope-grenzen (verboden features in spec) |
| AVG-overtreding | Hoog | Jurist-review, EU-stack consistent, geen ruwe data bewaren |

---

## Wekelijkse cadence aanbeveling

- **Maandag:** plan week, kies 5-7 taken
- **Dinsdag-vrijdag:** uitvoering, daily commits
- **Vrijdag:** demo aan jezelf, screenshots, vooruitgang
- **Zaterdag/zondag:** ofwel rust, ofwel content-schrijven (blog)

---

## Definition of Done (per fase)

Een fase is pas "klaar" als:
1. Alle taken in deze lijst zijn afgevinkt
2. Geen regressie in eerdere features
3. Lighthouse score >85 op alle pagina's
4. Geen openstaande TypeScript errors
5. Geen kritieke Sentry-issues
6. Deployment naar staging succesvol
7. Manueel getest op iOS + Android + desktop
