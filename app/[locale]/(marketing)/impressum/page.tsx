import { LegalLayout, Section, P } from '@/components/shared/legal-layout'

export const metadata = {
  title: 'Impressum — KloptHet',
}

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum" lastUpdated="mei 2026">
      <Section title="Bedrijfsgegevens">
        <P>
          <strong>Handelsnaam:</strong> KloptHet
        </P>
        <P>
          <strong>Rechtsvorm:</strong> Eenmanszaak
        </P>
        <P>
          <strong>Eigenaar:</strong> Oscar De G.
        </P>
        <P>
          <strong>Vestigingsland:</strong> Nederland
        </P>
        <P>
          <strong>KvK-nummer:</strong> [invullen na registratie]
        </P>
        <P>
          <strong>BTW-nummer:</strong> [invullen na registratie]
        </P>
      </Section>

      <Section title="Contactgegevens">
        <P>
          <strong>E-mail (algemeen):</strong> info@klopthet.nl
        </P>
        <P>
          <strong>E-mail (privacy):</strong> privacy@klopthet.nl
        </P>
        <P>
          <strong>E-mail (hulp):</strong> hulp@klopthet.nl
        </P>
        <P>
          <strong>Website:</strong> klopthet.nl
        </P>
      </Section>

      <Section title="Hosting en techniek">
        <P>
          <strong>Hosting:</strong> Vercel Inc., EU-Frankfurt regio
        </P>
        <P>
          <strong>Database:</strong> Supabase, EU-Frankfurt regio
        </P>
        <P>
          <strong>AI-analyse:</strong> Mistral AI, Parijs, Frankrijk (EU)
        </P>
        <P>
          <strong>Betalingen:</strong> Mollie B.V., Amsterdam, Nederland
        </P>
        <P>
          <strong>E-mail:</strong> Brevo (Sendinblue), Parijs, Frankrijk
        </P>
      </Section>

      <Section title="Toezicht en klachten">
        <P>
          Voor klachten over de verwerking van persoonsgegevens kunt u terecht bij de Autoriteit
          Persoonsgegevens (AP): autoriteitpersoonsgegevens.nl
        </P>
        <P>Voor vragen over de dienst: hulp@klopthet.nl</P>
      </Section>

      <Section title="Disclaimer">
        <P>
          De analyses van KloptHet zijn indicatief van aard en vormen geen juridisch, financieel of
          beveiligingsadvies. Wij streven naar een hoge nauwkeurigheid maar kunnen niet garanderen
          dat alle fraudepogingen worden herkend. Raadpleeg bij twijfel de Fraudehelpdesk (088 786
          87 78) of de politie.
        </P>
      </Section>
    </LegalLayout>
  )
}
