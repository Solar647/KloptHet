import { LegalLayout, Section, P, Ul, A } from '@/components/shared/legal-layout'

export const metadata = {
  title: 'Privacyverklaring — KloptHet',
}

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacyverklaring" lastUpdated="mei 2026">
      <Section title="1. Wie zijn wij?">
        <P>
          KloptHet is een dienst van [Bedrijfsnaam], gevestigd in Nederland (KvK: [nummer]). Wij
          zijn verantwoordelijk voor de verwerking van uw persoonsgegevens zoals beschreven in deze
          privacyverklaring.
        </P>
        <P>
          Bij vragen kunt u contact opnemen via{' '}
          <A href="mailto:privacy@klopthet.nl">privacy@klopthet.nl</A>.
        </P>
      </Section>

      <Section title="2. Welke gegevens verzamelen wij?">
        <P>Wij verwerken alleen de gegevens die nodig zijn voor het verlenen van onze dienst:</P>
        <Ul>
          <li>
            <strong>Accountgegevens:</strong> naam en e-mailadres bij registratie
          </li>
          <li>
            <strong>Scaninhoud:</strong> screenshots of tekst die u uploadt voor analyse — worden
            direct na analyse verwijderd (binnen 5 minuten)
          </li>
          <li>
            <strong>Scanresultaten:</strong> het verdict, de score en samenvatting worden opgeslagen
            in uw scangeschiedenis (alleen als u ingelogd bent)
          </li>
          <li>
            <strong>Technische gegevens:</strong> een gehashte versie van uw IP-adres voor
            rate-limiting (anoniem)
          </li>
          <li>
            <strong>Betalingsgegevens:</strong> worden verwerkt door Mollie — wij slaan geen
            betaalkaartgegevens op
          </li>
        </Ul>
      </Section>

      <Section title="3. Waarvoor gebruiken wij uw gegevens?">
        <Ul>
          <li>Het verlenen van de KloptHet-dienst (fraude-analyse)</li>
          <li>Het bijhouden van uw scangeschiedenis (opt-in via account)</li>
          <li>Het verwerken van betalingen</li>
          <li>Het versturen van transactionele e-mails (bevestiging, wachtwoord reset)</li>
          <li>Het versturen van de nieuwsbrief (alleen met uw toestemming)</li>
          <li>Het verbeteren van onze dienst (geanonimiseerde statistieken)</li>
        </Ul>
      </Section>

      <Section title="4. Hoe lang bewaren wij uw gegevens?">
        <Ul>
          <li>
            <strong>Screenshots:</strong> worden direct na analyse verwijderd, uiterlijk binnen 5
            minuten
          </li>
          <li>
            <strong>Scangeschiedenis:</strong> 1 jaar (Standaard-abonnement) of zolang uw account
            actief is
          </li>
          <li>
            <strong>Accountgegevens:</strong> zolang uw account actief is, plus maximaal 30 dagen na
            verwijdering
          </li>
          <li>
            <strong>IP-hash:</strong> wordt maandelijks gereset
          </li>
        </Ul>
      </Section>

      <Section title="5. Delen wij uw gegevens?">
        <P>
          Wij verkopen uw gegevens nooit aan derden. Wij delen gegevens alleen met sub-verwerkers
          die noodzakelijk zijn voor onze dienst:
        </P>
        <Ul>
          <li>
            <strong>Supabase</strong> (database en authenticatie) — EU-Frankfurt
          </li>
          <li>
            <strong>Vercel</strong> (hosting) — EU-Frankfurt
          </li>
          <li>
            <strong>Mistral AI</strong> (AI-analyse) — EU, geen trainingsdata
          </li>
          <li>
            <strong>Mollie</strong> (betalingen) — Nederland
          </li>
          <li>
            <strong>Brevo</strong> (e-mail) — Parijs, Frankrijk
          </li>
        </Ul>
        <P>
          Met alle sub-verwerkers hebben wij een verwerkersovereenkomst (DPA) gesloten conform de
          AVG.
        </P>
      </Section>

      <Section title="6. Uw rechten">
        <P>Op grond van de AVG heeft u de volgende rechten:</P>
        <Ul>
          <li>
            <strong>Inzage:</strong> u kunt al uw gegevens opvragen via uw dashboard (export als
            JSON)
          </li>
          <li>
            <strong>Rectificatie:</strong> u kunt uw naam en e-mailadres aanpassen in de
            instellingen
          </li>
          <li>
            <strong>Verwijdering:</strong> u kunt uw account en alle bijbehorende gegevens
            verwijderen via de instellingen
          </li>
          <li>
            <strong>Bezwaar:</strong> u kunt bezwaar maken tegen verwerking via{' '}
            <A href="mailto:privacy@klopthet.nl">privacy@klopthet.nl</A>
          </li>
        </Ul>
        <P>
          U heeft ook het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens:{' '}
          <A href="https://autoriteitpersoonsgegevens.nl">autoriteitpersoonsgegevens.nl</A>
        </P>
      </Section>

      <Section title="7. Toegang door beheerders">
        <P>
          Medewerkers van KloptHet met beheerdersrechten hebben toegang tot de volgende gegevens
          voor support- en beheerdoeleinden:
        </P>
        <Ul>
          <li>Accountgegevens (naam, e-mailadres, aanmelddatum)</li>
          <li>Abonnementsinformatie (type, status)</li>
          <li>
            <strong>Geanonimiseerde</strong> scanstatistieken: categorie
            (veilig/twijfelachtig/gevaarlijk), risicoscore en type invoer (screenshot of tekst) — de
            inhoud van berichten is nadrukkelijk <strong>niet</strong> toegankelijk voor beheerders
          </li>
          <li>
            Technische sessiegegevens (apparaattype, browser, IP-adres) uitsluitend voor
            beveiligings- en supportdoeleinden
          </li>
        </Ul>
        <P>
          Grondslag: gerechtvaardigd belang (AVG art. 6 lid 1 sub f) voor support en beveiliging, en
          uitvoering van de overeenkomst (art. 6 lid 1 sub b). Beheerders zijn gebonden aan
          geheimhouding.
        </P>
      </Section>

      <Section title="8. Familie-abonnement">
        <P>
          Bij het Familie-abonnement kan een accounthouder (de eigenaar) familieleden uitnodigen.
          Als het familielid instemt via de uitnodigingslink en de instelling &ldquo;Ik zie hun
          scans&rdquo; is ingeschakeld, kan de eigenaar de scanresultaten (categorie en score) van
          dat familielid inzien. Dit gebeurt uitsluitend op basis van expliciete toestemming van het
          familielid. Het familielid kan deze toestemming op elk moment intrekken via de
          familie-instellingen.
        </P>
      </Section>

      <Section title="9. Beveiliging">
        <P>
          Wij beveiligen uw gegevens met moderne standaarden: versleutelde verbindingen (HTTPS),
          toegangscontrole op databaseniveau (Row Level Security) en minimale dataopslag. Alle
          infrastructuur staat in de Europese Unie.
        </P>
      </Section>

      <Section title="10. Cookies">
        <P>
          KloptHet gebruikt alleen functionele cookies die noodzakelijk zijn voor het functioneren
          van de dienst (sessiebeheer). Wij gebruiken geen tracking- of advertentiecookies. Zie ook
          onze <A href="/nl/cookies">cookieverklaring</A>.
        </P>
      </Section>

      <Section title="11. Wijzigingen">
        <P>
          Wij kunnen deze privacyverklaring aanpassen. Bij wijzigingen informeren wij u via e-mail
          of een melding in de app. De meest recente versie staat altijd op deze pagina.
        </P>
      </Section>
    </LegalLayout>
  )
}
