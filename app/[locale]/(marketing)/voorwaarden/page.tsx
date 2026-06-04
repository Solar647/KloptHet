import { LegalLayout, Section, P, Ul, A } from '@/components/shared/legal-layout'

export const metadata = {
  title: 'Algemene Voorwaarden — KloptHet',
}

export default function VoorwaardenPage() {
  return (
    <LegalLayout title="Algemene Voorwaarden" lastUpdated="mei 2026">
      <Section title="1. Definities">
        <Ul>
          <li>
            <strong>KloptHet:</strong> de dienst aangeboden door [Bedrijfsnaam], KvK [nummer]
          </li>
          <li>
            <strong>Gebruiker:</strong> iedere persoon die gebruik maakt van KloptHet
          </li>
          <li>
            <strong>Abonnement:</strong> een betaalde toegang tot de uitgebreide functies van
            KloptHet
          </li>
          <li>
            <strong>Analyse:</strong> de beoordeling van een bericht door onze AI op mogelijke
            fraudekenmerken
          </li>
        </Ul>
      </Section>

      <Section title="2. Aard van de dienst">
        <P>
          KloptHet biedt een AI-analyse van berichten op kenmerken die kunnen wijzen op fraude. Onze
          analyses zijn <strong>indicatief van aard en geen garantie</strong>. Wij kunnen nooit met
          zekerheid vaststellen of een bericht frauduleus is of niet.
        </P>
        <P>
          Gebruikers zijn zelf verantwoordelijk voor beslissingen die zij nemen op basis van onze
          analyses. KloptHet is geen juridisch of financieel adviseur.
        </P>
      </Section>

      <Section title="3. Aansprakelijkheid">
        <P>KloptHet is niet aansprakelijk voor schade die ontstaat doordat:</P>
        <Ul>
          <li>Een bericht als veilig is beoordeeld terwijl het toch fraude bleek</li>
          <li>Een bericht als verdacht is beoordeeld terwijl het legitiem was</li>
          <li>De dienst tijdelijk niet beschikbaar is</li>
          <li>Technische storingen bij derde partijen (AI-provider, hosting)</li>
        </Ul>
        <P>
          Onze maximale aansprakelijkheid is beperkt tot het bedrag dat u in de afgelopen 3 maanden
          heeft betaald voor het abonnement.
        </P>
      </Section>

      <Section title="4. Abonnementen en betalingen">
        <Ul>
          <li>Abonnementen worden maandelijks of jaarlijks gefactureerd via Mollie</li>
          <li>
            U kunt op elk moment opzeggen — uw abonnement loopt door tot het einde van de betaalde
            periode
          </li>
          <li>
            Binnen 30 dagen na afsluiting heeft u recht op volledige terugbetaling zonder opgaaf van
            reden
          </li>
          <li>Prijswijzigingen worden minimaal 30 dagen van tevoren aangekondigd</li>
        </Ul>
      </Section>

      <Section title="5. Gebruik van de dienst">
        <P>Het is niet toegestaan om KloptHet te gebruiken voor:</P>
        <Ul>
          <li>Het uploaden van berichten van derden zonder hun toestemming</li>
          <li>Automatisch massaal versturen van verzoeken (scraping)</li>
          <li>Het testen van beveiligingssystemen zonder toestemming</li>
          <li>Enig doel dat in strijd is met de wet</li>
        </Ul>
      </Section>

      <Section title="6. Intellectueel eigendom">
        <P>
          Alle rechten op de KloptHet-software, het design en de content berusten bij
          [Bedrijfsnaam]. U krijgt een persoonlijk, niet-overdraagbaar recht om de dienst te
          gebruiken.
        </P>
      </Section>

      <Section title="7. Toepasselijk recht">
        <P>
          Op deze voorwaarden is Nederlands recht van toepassing. Geschillen worden voorgelegd aan
          de bevoegde rechter in Nederland.
        </P>
      </Section>

      <Section title="8. Contact">
        <P>
          Voor vragen over deze voorwaarden:{' '}
          <A href="mailto:hulp@klopthet.com">hulp@klopthet.com</A>
        </P>
      </Section>
    </LegalLayout>
  )
}
