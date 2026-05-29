import { LegalLayout, Section, P, Ul } from '@/components/shared/legal-layout'

export const metadata = {
  title: 'Cookieverklaring — KloptHet',
}

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookieverklaring" lastUpdated="mei 2026">
      <Section title="Wij gebruiken minimale cookies">
        <P>
          KloptHet gebruikt alleen cookies die strikt noodzakelijk zijn voor het functioneren van de
          dienst. Wij plaatsen <strong>geen tracking- of advertentiecookies</strong> en hebben
          daarom geen cookiebanner nodig.
        </P>
      </Section>

      <Section title="Welke cookies gebruiken wij?">
        <P>
          <strong>Sessie-cookies (functioneel, noodzakelijk)</strong>
        </P>
        <Ul>
          <li>
            <strong>sb-[project]-auth-token:</strong> slaat uw inlogstatus op zodat u ingelogd
            blijft — vervalt bij uitloggen of na 7 dagen
          </li>
          <li>
            <strong>sb-[project]-auth-token.0 / .1:</strong> onderdelen van de sessieopslag van
            Supabase
          </li>
        </Ul>
        <P>
          Deze cookies zijn technisch noodzakelijk. Zonder deze cookies kunt u niet inloggen en
          werkt de dienst niet correct. Voor noodzakelijke cookies is geen toestemming vereist op
          grond van de Telecommunicatiewet.
        </P>
      </Section>

      <Section title="Analytics">
        <P>
          Wij gebruiken Vercel Analytics voor het meten van paginabezoeken. Dit is een cookieloze
          analyticsoplossing — er worden geen cookies geplaatst en geen persoonsgegevens verzameld.
          Er is geen toestemming vereist.
        </P>
      </Section>

      <Section title="Cookies van derden">
        <P>
          Als u inlogt via Google (Google OAuth), plaatst Google mogelijk eigen cookies. Dit valt
          buiten onze controle. Zie het <strong>privacybeleid van Google</strong> voor meer
          informatie.
        </P>
      </Section>

      <Section title="Cookies verwijderen">
        <P>
          U kunt cookies verwijderen via de instellingen van uw browser. Let op: als u de
          sessie-cookie verwijdert, wordt u automatisch uitgelogd en moet u opnieuw inloggen.
        </P>
      </Section>
    </LegalLayout>
  )
}
