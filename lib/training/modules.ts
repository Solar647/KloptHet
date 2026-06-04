export interface Lesson {
  title: string
  content: string
}

export interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface TrainingModule {
  id: string
  title: string
  description: string
  icon: 'family' | 'package' | 'bank' | 'heart' | 'link' | 'phone'
  color: string
  difficulty: 'basis' | 'gemiddeld' | 'gevorderd'
  lessons: Lesson[]
  quiz: QuizQuestion[]
  badge: string
}

export const modules: TrainingModule[] = [
  {
    id: 'kleinkind',
    title: 'De kleinkind-truc',
    description:
      'Berichten herkennen van mensen die zich voordoen als uw kind of kleinkind om geld te vragen.',
    icon: 'family',
    color: '#E5532A',
    difficulty: 'basis',
    badge: 'Kleinkind-detective',
    lessons: [
      {
        title: 'Wat is de kleinkind-truc?',
        content: `De kleinkind-truc is één van de meest voorkomende vormen van fraude in Nederland. Jaarlijks worden duizenden mensen slachtoffer, met een gemiddeld verlies van €1.500 per geval.

Hoe werkt het?

Een oplichter stuurt een WhatsApp-bericht naar een willekeurig nummer. Het bericht klinkt vertrouwd: "Hoi mama, dit is mijn nieuwe nummer. Mijn telefoon is stukgegaan. Kun je dit nummer opslaan?"

De ontvanger denkt dat het hun kind of kleinkind is en slaat het nummer op. Daarna volgt een tweede bericht: "Ik zit even krap. Kun je €400 overmaken? Ik betaal je morgen terug."

De sleutel is dat de oplichter niet hoeft te weten wie uw kinderen zijn. Ze sturen dit bericht naar honderden nummers tegelijk en hopen dat iemand reageert alsof het inderdaad hun kind is.`,
      },
      {
        title: 'Waarom trappen mensen erin?',
        content: `Het is begrijpelijk dat mensen in de kleinkind-truc trappen. De oplichters zijn slim en spelen in op normale menselijke reacties.

Wat ze gebruiken:

Urgentie — "Ik moet het vandaag hebben." Dit zorgt ervoor dat u minder goed nadenkt.

Schaamte vermijden — "Vertel het maar niet aan papa/mama, ik regel het zelf terug." Dit zorgt dat u het niet controleert.

Geloofwaardige verklaring — "Mijn telefoon is kapot" verklaart waarom ze een nieuw nummer hebben én waarom ze niet kunnen bellen.

Vertrouwen — Het eerste bericht is onschuldig (nieuw nummer opgeven), zodat u al heeft gereageerd vóór het geldverzoek komt.

Als u eenmaal heeft gereageerd op het eerste bericht, voelt het onbeleefd om de identiteit te twijfelen. Oplichters rekenen precies op dit gevoel.`,
      },
      {
        title: 'Waarschuwingssignalen',
        content: `Leer deze signalen herkennen. Hoe meer er tegelijk zijn, hoe verdachter:

Signaal 1 — Nieuw nummer
Het bericht komt van een nummer dat u niet kent. Echt familielid wisselt zelden van nummer.

Signaal 2 — Vraag om geld
Echte familieleden bellen u voor noodgevallen, ze sturen geen WhatsApp.

Signaal 3 — Tijdsdruk
Woorden als "dringend", "vandaag", "zo snel mogelijk" zijn bedoeld om u te laten handelen zonder na te denken.

Signaal 4 — Reden waarom ze niet kunnen bellen
"Ik kan nu niet bellen, ik zit in een vergadering." Dit voorkomt dat u de stem herkent.

Signaal 5 — Geheimhouding
"Vertel het nog niet aan anderen." Dit voorkomt dat iemand anders u waarschuwt.

Signaal 6 — Betaalverzoek via Tikkie of bankoverschrijving
Oplichters vragen nooit om contant geld — alleen digitaal, zodat het snel gaat.`,
      },
      {
        title: 'Wat doet u — stap voor stap',
        content: `Als u een verdacht bericht ontvangt:

Stap 1 — Niet reageren op het geldverzoek
Stuur nog geen geld en beloof niets. Zeg dat u even terugbelt.

Stap 2 — Bel het oude, bekende nummer
Bel uw kind of kleinkind op het nummer dat u al jaren kent. Niet het nieuwe nummer.

Stap 3 — Als ze niet opnemen
Bel een andere familielid of vriend die contact heeft met uw kind. Vraag of zij weten of er iets aan de hand is.

Stap 4 — Twijfelt u nog?
Stel een vraag die alleen uw echte kind kan beantwoorden. Niet "hoe heet je" maar iets persoonlijks: "Hoe heette ons oude hondje?"

Stap 5 — Heeft u al betaald?
Bel direct uw bank (het nummer staat op de achterkant van uw bankpas). Vraag om de betaling te blokkeren of terug te draaien. Doe ook aangifte bij de politie.

Vergeet niet: het is nooit uw schuld als u slachtoffer wordt. Oplichters zijn professionals in het misleiden van mensen.`,
      },
    ],
    quiz: [
      {
        question:
          'U ontvangt een WhatsApp van een onbekend nummer: "Hoi mama, ik heb een nieuw nummer. Telefoon kapot. Kun je me €350 sturen? Urgent!" Wat doet u als eerste?',
        options: [
          'U stuurt het geld — uw kind heeft het nodig',
          'U belt uw kind op het oude, bekende nummer',
          'U stuurt een klein bedrag van €50 om te helpen',
          'U vraagt om een foto als bewijs',
        ],
        correct: 1,
        explanation:
          'Altijd eerst het bekende nummer bellen. Stuur nooit geld op basis van een tekstbericht alleen, ook niet een klein bedrag.',
      },
      {
        question:
          'Uw "kind" vraagt: "Vertel het nog niet aan papa, ik schaam me een beetje." Wat betekent dit waarschijnlijk?',
        options: [
          'Uw kind schaamt zich en heeft echt hulp nodig',
          'Dit is een truc om te voorkomen dat u het controleert bij iemand anders',
          'Uw kind heeft ruzie met zijn/haar vader',
          'Uw kind is verlegen van nature',
        ],
        correct: 1,
        explanation:
          'Oplichters vragen om geheimhouding zodat u het niet kunt controleren bij anderen. Dit is een klassiek signaal van fraude.',
      },
      {
        question: 'Welke vraag is het beste om te stellen als u twijfelt of het echt uw kind is?',
        options: [
          '"Hoe heet je?"',
          '"Wat is je geboortedatum?"',
          '"Hoe heette onze eerste hond?"',
          '"Stuur me een foto van jezelf"',
        ],
        correct: 2,
        explanation:
          'Een persoonlijke vraag die alleen uw echte kind kan beantwoorden is het beste. Naam en geboortedatum kunnen oplichters ook vinden via social media.',
      },
      {
        question:
          'U heeft al €400 overgemaakt voordat u besefte dat het fraude was. Wat doet u nu?',
        options: [
          'Niets — het geld is toch weg',
          'U stuurt een bericht naar het nep-nummer dat u de politie belt',
          'U belt direct uw bank EN doet aangifte bij de politie',
          'U vraagt het geld terug via WhatsApp',
        ],
        correct: 2,
        explanation:
          'Direct uw bank bellen is essentieel — soms kan een betaling nog worden gestopt of teruggedraaid. Aangifte bij de politie is ook belangrijk voor statistieken en opsporing.',
      },
      {
        question:
          'Iemand zegt: "Ik ben uw kleinzoon, vertel het niet aan mijn ouders want die maken zich zorgen." Wat is het eerste alarmsignaal?',
        options: [
          'Het bericht is in slecht Nederlands geschreven',
          'Het verzoek om geheimhouding — dit is een klassieke manipulatietactiek',
          'Uw kleinzoon zou nooit bellen',
          'De naam klopt niet',
        ],
        correct: 1,
        explanation:
          'Verzoeken om geheimhouding zijn een groot alarmsignaal. Oplichters willen voorkomen dat u het verhaal kunt controleren bij anderen.',
      },
      {
        question:
          'U belt uw kleinkind terug op het oude nummer maar krijgt geen gehoor. Wat doet u?',
        options: [
          'U stuurt toch het geld — het moet dringend zijn',
          'U wacht een uur en probeert het daarna opnieuw',
          'U belt een ander familielid om te controleren of alles goed is',
          'U vraagt het nieuwe nummer om een foto te sturen',
        ],
        correct: 2,
        explanation:
          'Altijd via een ander kanaal controleren. Bel een ander familielid, of wacht tot u persoonlijk contact heeft. Stuur nooit geld zonder bevestiging.',
      },
      {
        question: 'Welk bedrag is "veilig" om te sturen als u twijfelt maar wil helpen?',
        options: [
          '€50 — dat is te weinig om echt gevaarlijk te zijn',
          '€100 — een klein bedrag om goodwill te tonen',
          'Geen enkel bedrag — u stuurt nooit geld op basis van een tekstbericht',
          '€200 — als het echt uw kleinkind is, heeft het waarschijnlijk meer nodig',
        ],
        correct: 2,
        explanation:
          'Er bestaat geen "veilig" bedrag. Als het fraude is, moedigt u de oplichter aan door te betalen. Controleer altijd eerst de identiteit.',
      },
      {
        question:
          'Hoe kunnen oplichters uw naam en familierelaties kennen zonder dat u ze dat heeft verteld?',
        options: [
          'Dat kunnen ze niet — ze raden het gewoon',
          'Via sociale media en openbare informatie die u of uw familie deelt',
          'Via uw bank',
          'Via de overheid',
        ],
        correct: 1,
        explanation:
          "Oplichters zoeken op sociale media naar informatie. Foto's van familiefeesten, namen van kinderen en kleinkinderen zijn vaak openbaar zichtbaar.",
      },
      {
        question:
          'U heeft al twee keer geld gestuurd aan iemand die u denkt dat uw kleinkind is. Nu vragen ze om een derde betaling. Wat doet u?',
        options: [
          'U betaalt opnieuw — u heeft al zoveel geïnvesteerd',
          'U vraagt eerst om terugbetaling van de eerdere bedragen',
          'U stopt met betalen, belt uw echte kleinkind én uw bank',
          'U vraagt een foto als bewijs van identiteit',
        ],
        correct: 2,
        explanation:
          'Het feit dat u al heeft betaald maakt het lastiger te stoppen, maar het is de juiste keuze. Bel uw bank direct — soms is geld nog terug te halen.',
      },
      {
        question:
          'Een bericht zegt: "Mama dit is echt ik, geloof me alsjeblieft." Wat betekent dit patroon?',
        options: [
          'Uw kind is echt in nood en voelt zich niet serieus genomen',
          'Het is waarschijnlijk fraude — echte familieleden hoeven zelden zo te smeken',
          'Uw kind is van streek over iets',
          'Het bericht is van een vriend van uw kind',
        ],
        correct: 1,
        explanation:
          'Overdreven emotioneel smeken is een manipulatietactiek. Echte familieleden begrijpen dat u voorzichtig bent en zullen het accepteren als u belt voor verificatie.',
      },
    ],
  },
  {
    id: 'bezorg',
    title: 'Bezorg-fraude',
    description: 'Nep-berichten van PostNL, DHL en andere bezorgdiensten herkennen.',
    icon: 'package',
    color: '#D97B2A',
    difficulty: 'basis',
    badge: 'Pakket-waakhond',
    lessons: [
      {
        title: 'Hoe ziet bezorg-fraude eruit?',
        content: `Bezorg-fraude is de meest voorkomende vorm van phishing in Nederland. Miljoenen nep-berichten worden wekelijks verstuurd.

Het bericht

U krijgt een sms of e-mail van "PostNL", "DHL", "DPD" of een andere bezorgdienst:

"Uw pakket kon niet worden afgeleverd. Betaal €1,99 voor herbezorging via: [link]"

Of: "Uw pakket wacht op u. Bevestig uw adres om bezorging te voltooien."

Waarom werkt het?

We bestellen tegenwoordig veel online. De kans is groot dat u iets verwacht. Oplichters sturen berichten naar duizenden mensen tegelijk, wetende dat velen inderdaad een pakket verwachten.

Het gevraagde bedrag is opzettelijk klein (€1,99 of €2,50). Dat voelt niet als veel geld, dus mensen klikken sneller.`,
      },
      {
        title: 'Wat er daarna gebeurt',
        content: `Klikt u op de link, dan komt u terecht op een nepwebsite die er precies uitziet als de echte website van PostNL of DHL.

Scenario 1 — Betaalgegevens stelen
U vult uw creditcard- of betaalpas-gegevens in voor die €1,99. De oplichters slagen die op en maken later grotere bedragen af.

Scenario 2 — Inloggegevens stelen
U wordt gevraagd in te loggen. Uw gebruikersnaam en wachtwoord worden opgeslagen. Als u dat wachtwoord ook elders gebruikt, kunnen ze in meer accounts inbreken.

Scenario 3 — Abonnement activeren
In de kleine lettertjes staat dat u een abonnement afsluit van €29,95 per maand. Dat is moeilijk te annuleren.

Scenario 4 — Malware installeren
U wordt gevraagd een "tracking app" te downloaden. Deze app geeft oplichters toegang tot uw telefoon.`,
      },
      {
        title: 'Echte vs. nep bezorgberichten',
        content: `Leer het verschil herkennen:

Echte bezorgberichten:
• Komen van een officieel e-mailadres (@postnl.nl, @dhl.com)
• Bevatten een Track & Trace code die u zelf kunt controleren
• Vragen nooit om betaling voor herbezorging (dat is gratis in Nederland)
• Linken naar de officiële website (postnl.nl, dhl.com)

Nep bezorgberichten:
• Komen van vreemde e-mailadressen of telefoonnummers
• Linken naar nep-domeinen: post-nl-bezorging.com, dhl-levering.nl
• Vragen om betaling voor "douanekosten", "herbezorging" of "opslag"
• Creëren urgentie: "Uw pakket wordt teruggestuurd als u niet betaalt"

Gouden regel: postnl.nl heeft geen koppelteken. post-nl.nl is nep.`,
      },
      {
        title: 'Wat doet u bij twijfel?',
        content: `Wanneer u een bezorgbericht ontvangt dat u niet vertrouwt:

Stap 1 — Klik NIET op de link in het bericht

Stap 2 — Open een nieuw tabblad en ga zelf naar de officiële website
Type zelf: postnl.nl of dhl.com — nooit via een link

Stap 3 — Voer uw Track & Trace code in
Heeft u een pakket besteld? Dan heeft u een Track & Trace code ontvangen van de webshop. Voer die in op de officiële website.

Stap 4 — Geen pakket besteld?
Dan kunt u het bericht veilig negeren of verwijderen.

Heeft u al geklikt en gegevens ingevuld?

• Wijzig direct uw wachtwoord als u hebt ingelogd
• Neem contact op met uw bank als u betaalgegevens heeft ingevoerd
• Scan uw telefoon op malware als u een app heeft gedownload
• Meld het bij de Fraudehelpdesk: fraudehelpdesk.nl`,
      },
    ],
    quiz: [
      {
        question:
          'U krijgt een sms: "PostNL: Uw pakket kan niet worden afgeleverd. Betaal €2,50 via post-nl-bezorging.com". Wat doet u?',
        options: [
          'U klikt op de link — het is maar €2,50',
          'U gaat zelf naar postnl.nl en voert uw Track & Trace code in',
          'U belt het nummer dat in het sms-bericht staat',
          'U antwoordt "STOP" op het bericht',
        ],
        correct: 1,
        explanation:
          'Altijd zelf naar de officiële website gaan — nooit via een link in een bericht. "post-nl-bezorging.com" is geen officieel PostNL-domein.',
      },
      {
        question: 'Welk e-mailadres is waarschijnlijk van de echte PostNL?',
        options: [
          'bezorging@post-nl-service.com',
          'noreply@postnl-pakket.nl',
          'tracking@postnl.nl',
          'delivery@postnl-verzending.eu',
        ],
        correct: 2,
        explanation:
          'Alleen e-mails van @postnl.nl zijn van het echte PostNL. Alles met extra woorden of koppeltekens is verdacht.',
      },
      {
        question: 'Een bezorgbericht vraagt om €1,99 voor herbezorging. Wat is hierover waar?',
        options: [
          'Dat is normaal — PostNL rekent kosten voor een tweede poging',
          'Herbezorging door PostNL is gratis in Nederland',
          'Alleen pakketjes uit het buitenland kosten extra',
          'Het bedrag is te laag om verdacht te zijn',
        ],
        correct: 1,
        explanation:
          'Herbezorging door PostNL is gratis in Nederland. Als er om betaling wordt gevraagd voor herbezorging, is het altijd fraude.',
      },
    ],
  },
  {
    id: 'bank',
    title: 'Bank-imitatie',
    description: 'Berichten herkennen die van uw bank lijken te komen maar dat niet zijn.',
    icon: 'bank',
    color: '#3AAC6E',
    difficulty: 'basis',
    badge: 'Bank-beschermer',
    lessons: [
      {
        title: 'Hoe werkt bank-imitatie?',
        content: `Bank-imitatie is bijzonder gevaarlijk omdat bankberichten er officieel uitzien en mensen snel in paniek raken bij berichten over hun geld.

Veelgebruikte scenario's:

Scenario 1 — Geblokkeerde rekening
"Uw rekening wordt geblokkeerd vanwege verdachte activiteit. Klik hier om te bevestigen dat u het bent."

Scenario 2 — Verlopen bankpas
"Uw ING bankpas verloopt binnenkort. Vraag een nieuwe aan via deze link."

Scenario 3 — Verdachte betaling
"Er is een betaling van €850 gedaan. Was u dit? Klik hier om te bevestigen of te annuleren."

Scenario 4 — Veilige rekening
U wordt gebeld door iemand die zegt van de fraudeafdeling van uw bank te zijn: "Uw rekening is gehackt. U moet uw geld overmaken naar een veilige rekening."

Al deze scenario's zijn nep. Uw echte bank doet dit nooit.`,
      },
      {
        title: 'Wat uw bank NOOIT doet',
        content: `Dit zijn absolute regels die voor alle Nederlandse banken gelden:

Uw bank vraagt u NOOIT om:
• Via een link in een sms of e-mail in te loggen
• Uw pincode, TAN-code of volledige wachtwoord door te geven
• Geld over te maken naar een "veilige rekening"
• Uw bankapp te verwijderen en opnieuw te installeren via een link
• Een medewerker via uw computer of telefoon mee te laten kijken

Uw bank stuurt u NOOIT:
• Een link om in te loggen via sms
• Een e-mail met een verzoek om uw gegevens te bevestigen
• Een bericht dat uw rekening wordt geblokkeerd als u niets doet

Als iemand u dit vraagt, is het ALTIJD oplichting — ook als de persoon vriendelijk is, professioneel klinkt en precies weet wie u bent.`,
      },
      {
        title: 'De babbeltruc via de telefoon',
        content: `Een gevaarlijke variant is de "babbeltruc": u wordt gebeld door iemand die zegt van de bank te zijn.

Hoe het gaat:

Iemand belt en zegt: "U spreekt met de fraudeafdeling van de Rabobank. We hebben verdachte activiteit op uw rekening gezien."

Ze noemen uw naam, weten soms zelfs uw adres of gedeeltelijk uw rekeningnummer. Dit geeft vertrouwen.

Dan volgt het verzoek: "Om uw geld te beschermen moet u het overmaken naar een tijdelijke beveiligde rekening. Onze medewerker komt later langs om het terug te storten."

Of: "We moeten uw bankapp opnieuw instellen. Kunt u de code doorgeven die u nu ontvangt?"

Wat u moet doen: Leg direct op. Bel zelf uw bank via het nummer op uw bankpas. Geef nooit codes door en maak nooit geld over op verzoek van een "bankmedewerker".`,
      },
      {
        title: 'Hoe beschermt u zichzelf?',
        content: `Concrete stappen:

Bij een verdacht bericht of telefoontje:

1. Verbreken of weggooien — Leg op of verwijder het bericht.

2. Bel uw bank zelf — Het nummer staat op uw bankpas of op de officiële website (die u zelf intypt).

3. Log in via de officiële app — Open de banking-app die u al heeft. Als er echt iets aan de hand is, ziet u dat daar.

4. Vertel het aan iemand — Oplichters hopen dat u niets zegt. Vertel een familielid of vriend wat er is gebeurd.

Als u slachtoffer bent geworden:

• Bel direct uw bank — het nummer staat op de achterkant van uw bankpas
• Vraag om de betaling te blokkeren of terug te draaien
• Doe aangifte bij de politie (kan ook online via politie.nl)
• Meld het bij de Fraudehelpdesk: 088 786 87 78

Vergeet niet: dit overkomt ook slimme mensen. Schaam u niet.`,
      },
    ],
    quiz: [
      {
        question:
          'U krijgt een e-mail van "ING Bank": "Uw rekening wordt geblokkeerd. Bevestig uw gegevens via: www.ing-bevestiging.nl". Wat doet u?',
        options: [
          'U klikt op de link — het lijkt officieel',
          'U opent zelf de ING-app of typt ing.nl in uw browser',
          'U belt het telefoonnummer in de e-mail',
          'U wacht af — als de rekening echt geblokkeerd wordt merkt u dat vanzelf',
        ],
        correct: 1,
        explanation:
          'Altijd zelf naar de officiële app of website gaan. "ing-bevestiging.nl" is geen officieel ING-domein — het echte adres is ing.nl.',
      },
      {
        question:
          'Iemand belt u en zegt: "Ik ben van de fraudeafdeling van uw bank. U moet uw geld overmaken naar een veilige rekening." Wat doet u?',
        options: [
          'U doet wat ze vragen — uw geld moet beschermd worden',
          'U vraagt eerst om een bewijs van identiteit',
          'U legt op en belt uw bank via het nummer op uw bankpas',
          'U vraagt om het rekeningnummer van de veilige rekening',
        ],
        correct: 2,
        explanation:
          'Banken vragen nooit om geld over te maken naar een veilige rekening. Leg altijd op en bel uw bank zelf via het nummer op uw bankpas.',
      },
      {
        question:
          'Uw bank stuurt u een sms met een code en vraagt u die door te geven aan een medewerker. Wat doet u?',
        options: [
          'U geeft de code door — de medewerker heeft die nodig',
          'U geeft de code nooit door, aan niemand, ook niet aan uw bank',
          'U geeft de code alleen als ze uw klantnummer weten',
          'U vraagt of ze de code ook per e-mail kunnen sturen',
        ],
        correct: 1,
        explanation:
          'Codes die u per sms ontvangt zijn bedoeld om ín te loggen of een betaling goed te keuren. Ze aan iemand doorgeven geeft die persoon toegang tot uw rekening. Nooit doen.',
      },
    ],
  },
  {
    id: 'romantiek',
    title: 'Romantiek-scams',
    description:
      'Online vriendschappen en romances herkennen die bedoeld zijn om u geld afhandig te maken.',
    icon: 'heart',
    color: '#C94A7E',
    difficulty: 'gemiddeld',
    badge: 'Hart-bewaker',
    lessons: [
      {
        title: 'Wat is een romantiek-scam?',
        content: `Een romantiek-scam begint met een vriendschapsverzoek of berichtje op Facebook, Instagram, WhatsApp of een datingsite. De oplichter bouwt maanden lang een vertrouwensband op vóórdat ze om geld vragen.

Wie zijn de slachtoffers?

Iedereen kan slachtoffer worden. Maar oplichters richten zich vaak op mensen die:
• Alleen wonen (weduwe, weduwnaar, gescheiden)
• Op zoek zijn naar contact of vriendschap
• Actief zijn op sociale media

Het profiel van de oplichter

De "persoon" heeft altijd een aantrekkelijk profiel: succesvol, hartelijk, avontuurlijk. Vaak staan ze voor als:
• Militair in het buitenland
• Chirurg bij een internationale organisatie
• Ingenieur op een boorplatform
• Weduwnaar/weduwe met kinderen

De foto's zijn gestolen van echte mensen online.`,
      },
      {
        title: 'Hoe het zich ontwikkelt',
        content: `Romantiek-scams volgen een vast patroon over weken of maanden:

Fase 1 — Contact leggen (week 1-2)
Een vriendschapsverzoek of berichtje. Ze zijn charmant, attent en geïnteresseerd in ú. Ze reageren snel en schrijven lange, persoonlijke berichten.

Fase 2 — Vertrouwen opbouwen (week 2-8)
Dagelijks contact. Ze delen persoonlijke verhalen, vragen naar uw leven. Ze zeggen dat u speciaal bent en dat ze nog nooit iemand zoals u hebben ontmoet.

Fase 3 — Een crisis (na 1-3 maanden)
Er is een "noodgeval": een medische rekening, problemen met een project, reiskosten. Ze vragen om hulp. Het bedrag is klein om te beginnen.

Fase 4 — Escalatie
Het eerste verzoek wordt gevolgd door meer. Het totaal kan oplopen tot tienduizenden euro's.

Fase 5 — Verdwijning
Zodra u stopt met betalen, of ze hebben genoeg gekregen, verdwijnen ze abrupt.`,
      },
      {
        title: 'Waarschuwingssignalen',
        content: `Deze signalen wijzen op een romantiek-scam:

Ze kunnen nooit videobellen — altijd een excuus: camera stuk, verbinding slecht, gestuurd naar afgelegen gebied.

Ze wonen ver weg — altijd in het buitenland, op een boorplatform, in een oorlogsgebied. Ze kunnen u nooit ontmoeten.

Ze worden verliefd heel snel — na een week zeggen ze al dat ze van u houden.

Ze vragen nooit kleine dingen — nooit "stuur me een kaartje" of "bel me op". Alleen geld.

Ze kunnen niets bewijzen — ze kunnen geen documenten, werkgeversbevestiging of identiteitsbewijs laten zien.

Hun verhalen kloppen niet — details veranderen, tijdzones kloppen niet, hun "werk" is vaag.

Ze vragen u om stil te zijn — "Vertel je familie maar niet van ons, ik wil dit eerst voor onszelf houden."`,
      },
      {
        title: 'Wat doet u?',
        content: `Als u vermoedt dat het een scam is:

Stap 1 — Stop met geld sturen
Hoe moeilijk het ook voelt — stop direct. Hoe meer u betaalt, hoe meer ze blijven vragen.

Stap 2 — Verbreek het contact
U hoeft niets uit te leggen. Blokkeer de persoon op alle platforms.

Stap 3 — Controleer de foto's
Download de profielfoto en zoek ernaar via Google "Afbeeldingen zoeken". Gestolen foto's zijn een bewijs van een scam.

Stap 4 — Praat met iemand die u vertrouwt
Oplichters isoleren hun slachtoffers. Vertel het aan een familielid of vriend.

Stap 5 — Meld het
• Bij de Fraudehelpdesk: 088 786 87 78
• Bij de politie (aangifte)
• Bij het platform waar u contact had

Het is geen schande om slachtoffer te zijn. Deze oplichters zijn getrainde professionals die maandenlang geduldig zijn.`,
      },
    ],
    quiz: [
      {
        question:
          'U heeft al 2 maanden dagelijks contact met iemand online. Ze zijn aardig maar hebben nog nooit kunnen videobellen. Nu hebben ze een medische noodsituatie en vragen om €800. Wat doet u?',
        options: [
          'U stuurt het geld — u kent ze goed genoeg',
          'U stuurt een kleiner bedrag om te helpen',
          'U stopt, zoekt de foto op via Google en praat met een vertrouwde persoon',
          'U vraagt om een foto als bewijs van de situatie',
        ],
        correct: 2,
        explanation:
          'Nooit videobellen + verzoek om geld na maanden contact zijn klassieke kenmerken van een romantiek-scam. Foto controleren via Google Afbeeldingen is een goede eerste stap.',
      },
      {
        question:
          'U zoekt de profielfoto op via Google en vindt hem op de Instagram van iemand anders. Wat betekent dit?',
        options: [
          "Dat is normaal — mensen delen elkaars foto's",
          'De foto is gestolen — de persoon die u spreekt is niet wie ze zeggen te zijn',
          'Het kan toeval zijn',
          'U moet de persoon om uitleg vragen',
        ],
        correct: 1,
        explanation:
          'Als een profielfoto ook op accounts van andere mensen staat, is de foto gestolen. Dit is een duidelijk teken van een scam.',
      },
    ],
  },
  {
    id: 'phishing',
    title: 'Phishing-links herkennen',
    description: 'Verdachte links en e-mails herkennen en veilig omgaan met digitale berichten.',
    icon: 'link',
    color: '#5B7BE8',
    difficulty: 'gemiddeld',
    badge: 'Link-detective',
    lessons: [
      {
        title: 'Wat is phishing?',
        content: `Phishing is een poging om via nep-berichten persoonlijke gegevens, wachtwoorden of bankgegevens te stelen.

Het woord komt van "fishing" (vissen) — oplichters gooien een hengel uit en wachten tot iemand bijt.

Hoe ziet het eruit?

E-mail: "Uw DigiD verliest binnenkort zijn geldigheid. Klik hier om te verlengen."
SMS: "Uw pakket staat klaar. Bevestig uw adres: [link]"
WhatsApp: "U heeft een voicemail. Luister hier: [link]"

Wat willen ze?

• Uw inloggegevens (gebruikersnaam + wachtwoord)
• Uw bankpasgegevens (kaartnummer, PIN, beveiligingscode)
• Uw BSN of DigiD-gegevens
• Toegang tot uw telefoon of computer`,
      },
      {
        title: 'Een link beoordelen',
        content: `U hoeft geen technische kennis te hebben. Let op deze dingen:

Het domein (de kern van de link)

Een link ziet er zo uit: https://www.ing-betalen.nl/inloggen

Het domein is het gedeelte vóór de eerste "/" na de "//": ing-betalen.nl

Vragen die u stelt:
• Klopt dit met de echte naam? ING.nl — niet ing-betalen.nl
• Zijn er extra woorden? postnl-herbezorging.com is niet postnl.nl
• Zijn er koppeltekens? ing-veilig.net is niet ing.nl

Let op dit patroon:
Echte site: postnl.nl
Nep-site: postnl-bezorging.com of post-nl.nl

Het meest veilige: ga altijd zelf naar de website door het adres te typen in uw browser.`,
      },
      {
        title: 'E-mails beoordelen',
        content: `E-mails zijn makkelijk te vervalsen. Let op deze signalen:

Het afzendadres
Kijk niet alleen naar de naam, maar naar het e-mailadres:
• "PostNL Bezorging" <info@postnl-pakket.com> is nep
• "PostNL" <noreply@postnl.nl> is echt

Taalgebruik
Nep-e-mails bevatten vaak:
• Vreemde zinnen of spelfouten
• Te formeel of te informeel taalgebruik
• "Geachte klant" in plaats van uw naam

Urgentie
"Reageer binnen 24 uur" of "Uw account wordt geblokkeerd" zijn rode vlaggen.

Bijlagen
Open nooit bijlagen van onbekende afzenders. Een bijlage kan malware bevatten.

Twijfelt u?
Bel het bedrijf via het officiële nummer op hun website om te controleren of de e-mail echt is.`,
      },
    ],
    quiz: [
      {
        question:
          'U ontvangt een e-mail van "DigiD" met als afzender: verificatie@digid-veilig.nl. De e-mail vraagt u in te loggen. Wat doet u?',
        options: [
          'U klikt op de link — DigiD stuurt zulke e-mails',
          'U gaat zelf naar digid.nl door het adres te typen',
          'U belt DigiD via het nummer in de e-mail',
          'U logt in maar geeft alleen uw gebruikersnaam, niet uw wachtwoord',
        ],
        correct: 1,
        explanation:
          'digid-veilig.nl is niet het officiële DigiD-domein. Altijd zelf digid.nl intypen. DigiD stuurt nooit e-mails met links om in te loggen.',
      },
      {
        question: 'Welk van deze links lijkt het meest op een nep-website?',
        options: [
          'https://www.rabobank.nl/particulieren',
          'https://www.rabobank-veilig-inloggen.com',
          'https://bankieren.rabobank.nl',
          'https://mijn.rabobank.nl',
        ],
        correct: 1,
        explanation:
          'rabobank-veilig-inloggen.com is een nep-domein. Het echte Rabobank gebruikt altijd rabobank.nl als basis-domein.',
      },
    ],
  },
  {
    id: 'telefoon',
    title: 'Telefonische fraude',
    description:
      'Fraudeurs die bellen namens banken, overheid of techbedrijven herkennen en afweren.',
    icon: 'phone',
    color: '#8B5CF6',
    difficulty: 'gevorderd',
    badge: 'Telefoon-expert',
    lessons: [
      {
        title: 'Soorten telefonische fraude',
        content: `Telefonische fraude komt in verschillende vormen voor. Dit zijn de meest voorkomende:

Bankfraude via telefoon
Iemand belt namens uw bank en zegt dat er verdachte activiteit is op uw rekening. Ze vragen u codes door te geven of geld over te maken.

Microsoft/computerhulp fraude
Iemand belt en zegt dat uw computer een virus heeft. Ze willen meekijken via uw computer om het op te lossen. Ze installeren malware of stelen gegevens.

Overheids-imitatie
Iemand belt namens de Belastingdienst, politie of gemeente. U zou belasting terugkrijgen maar moet eerst een kleine vergoeding betalen.

Loterij-fraude
U heeft "gewonnen" maar moet eerst administratiekosten betalen om uw prijs te ontvangen.`,
      },
      {
        title: 'Hoe ze vertrouwen opbouwen',
        content: `Telefonische oplichters weten meer over u dan u denkt:

Uw naam en adres
Die zijn vaak te vinden in telefoongidsen of zijn eerder gestolen bij datalekken.

Uw rekeningnummer (gedeeltelijk)
Ze noemen de eerste of laatste 4 cijfers. Dit geeft vertrouwen maar bewijst niets.

Uw BSN-nummer
Als u ooit slachtoffer bent geweest van een datalek, kan dit bekend zijn bij fraudeurs.

Nummer-spoofing
Oplichters kunnen het telefoonnummer van uw bank op uw scherm laten verschijnen. Ook als uw telefoon "Rabobank" toont, kan het een oplichter zijn.

Daarom: het feit dat iemand gegevens van u kent of een officieel nummer toont, bewijst NIET dat ze zijn wie ze zeggen te zijn.`,
      },
      {
        title: 'Wat u altijd kunt doen',
        content: `Ongeacht hoe overtuigend het gesprek is:

Regel 1 — U mag altijd ophangen
Het is niet onbeleefd. Echte instanties begrijpen dat u voorzichtig bent.

Regel 2 — Bel zelf terug
Leg op, wacht 10 minuten (zodat de verbinding echt verbroken is), en bel zelf het officiële nummer. Dat staat op uw bankpas, de website van de overheid, of op uw rekening.

Regel 3 — Codes zijn nooit bedoeld voor anderen
Een code die u per sms ontvangt is altijd voor úzelf bedoeld. Nooit doorgeven.

Regel 4 — Laat nooit iemand meekijken op uw computer
Programma's als TeamViewer of AnyDesk geven volledige toegang tot uw computer. Installeer ze nooit op verzoek van iemand die u belt.

Regel 5 — Maak nooit geld over op verzoek van iemand die belt
Geen enkel legitiem bedrijf of instantie vraagt dit telefonisch.`,
      },
    ],
    quiz: [
      {
        question:
          'U wordt gebeld. De beller zegt van Microsoft te zijn: "Uw computer heeft een gevaarlijk virus. We moeten meekijken om het op te lossen." Wat doet u?',
        options: [
          'U laat ze meekijken — Microsoft weet het beter',
          'U vraagt om een officieel bewijs per e-mail',
          'U legt op — Microsoft belt nooit proactief naar klanten',
          'U geeft toegang maar let goed op wat ze doen',
        ],
        correct: 2,
        explanation:
          'Microsoft, Apple en Google bellen nooit proactief naar klanten over virussen. Dit is altijd fraude. Ophangen is de juiste reactie.',
      },
      {
        question:
          'Uw scherm toont "Rabobank" als iemand belt. Ze weten uw naam en adres. Wat betekent dit?',
        options: [
          'Het is echt de Rabobank — ze kennen uw gegevens',
          'Het bewijst niets — nummers kunnen worden vervalst en gegevens zijn soms bekend bij oplichters',
          'Het is verdacht — banken bellen nooit',
          'U kunt het controleren door uw rekeningnummer te bevestigen',
        ],
        correct: 1,
        explanation:
          'Nummer-spoofing maakt het mogelijk elk nummer te tonen. Uw naam en adres kunnen uit eerder gelekte databases komen. Dit bewijst niet dat het uw bank is.',
      },
      {
        question:
          'U ontvangt een sms-code terwijl u aan de telefoon bent met iemand die zegt van uw bank te zijn. Ze vragen u de code voor te lezen. Wat doet u?',
        options: [
          'U leest de code voor — de bank heeft hem nodig',
          'U geeft de code alleen als ze uw naam kunnen noemen',
          'U geeft de code nooit door — deze codes zijn altijd alleen voor uzelf',
          'U vraagt of ze de code zelf kunnen opvragen',
        ],
        correct: 2,
        explanation:
          'Sms-codes (zoals inlogcodes of bevestigingscodes) zijn altijd alleen voor uzelf bedoeld. Een echte bank vraagt hier nooit om. Door de code door te geven geeft u de oplichter toegang tot uw rekening.',
      },
      {
        question:
          'Iemand belt namens de Belastingdienst. U zou €800 terugkrijgen maar moet eerst €25 administratiekosten betalen. Wat is dit?',
        options: [
          'Een echte teruggave — de Belastingdienst werkt soms zo',
          'Loterij-fraude vermomd als belastingteruggave',
          'Legitiem — €25 kosten voor €800 terug is een goede deal',
          'Fraude — de Belastingdienst vraagt nooit vooraf te betalen voor een teruggave',
        ],
        correct: 3,
        explanation:
          'De Belastingdienst vraagt nooit vooraf geld te betalen voor een teruggave. Dit is een klassiek voorbeeld van advance-fee fraude: u betaalt, maar de "teruggave" bestaat niet.',
      },
      {
        question:
          'U wordt gebeld: "Uw computer stuurt verdachte signalen. Installeer dit programma zodat we kunnen helpen." Wat doet u?',
        options: [
          'U installeert het — anders loopt u risico',
          'U installeert het alleen als ze een officieel e-mailadres hebben',
          'U hangt op en installeert niets — dit is computerhulp-fraude',
          'U vraagt wat het programma kost',
        ],
        correct: 2,
        explanation:
          "Programma's zoals TeamViewer of AnyDesk geven de beller volledige toegang tot uw computer. Geen legitiem bedrijf vraagt u dit te installeren na een onverwacht telefoontje.",
      },
      {
        question: 'Wat is "nummer-spoofing"?',
        options: [
          'Een techniek waarbij oplichters uw telefoonnummer stelen',
          'Een manier om elk telefoonnummer op uw scherm te laten verschijnen, ook dat van uw bank',
          'Een app die valse nummers blokkeert',
          'Het doorsturen van gesprekken naar een ander nummer',
        ],
        correct: 1,
        explanation:
          'Nummer-spoofing stelt oplichters in staat elk willekeurig nummer op het scherm van het slachtoffer te tonen. Zelfs het officiële nummer van uw bank kan worden nagebootst.',
      },
      {
        question:
          'U hangt op na een verdacht gesprek maar wilt controleren of het echt uw bank was. Wat is het veiligste om te doen?',
        options: [
          'Terugbellen naar het nummer dat belde',
          'Wacht 10 minuten en bel dan zelf het officiële nummer op uw bankpas of de website',
          'Stuur een e-mail naar de bank',
          'Bel de politie',
        ],
        correct: 1,
        explanation:
          'Na ophangen kan de lijn soms nog actief zijn aan de kant van de oplichter. Wacht enkele minuten en bel dan zelf via het officiële nummer op uw bankpas, rekening of de officiële website.',
      },
      {
        question:
          'Een beller zegt: "Uw rekening wordt geblokkeerd als u niet direct actie onderneemt." Hoe herkent u dit als oplichting?',
        options: [
          'Echte banken blokkeren nooit rekeningen',
          'Tijdsdruk en urgentie zijn klassieke technieken van oplichters om u niet te laten nadenken',
          'De beller spreekt Nederlands met een accent',
          "Banken bellen altijd 's avonds",
        ],
        correct: 1,
        explanation:
          'Oplichters creëren bewust tijdsdruk zodat u niet de kans krijgt na te denken of iemand te raadplegen. "Direct actie ondernemen" is een alarmsignaal. Echte banken geven u altijd bedenktijd.',
      },
      {
        question:
          'Iemand belt namens de politie: "Wij hebben uw geld nodig als bewijs in een fraudeonderzoek. U krijgt het later terug." Wat doet u?',
        options: [
          'U helpt — de politie vertrouwen is belangrijk',
          'U geeft het geld alleen als ze een legitimatiebewijs tonen',
          'U hangt op — de politie vraagt nooit geld over te maken als bewijs',
          'U maakt de helft over als compromis',
        ],
        correct: 2,
        explanation:
          'De politie vraagt nooit geld over te maken als onderdeel van een onderzoek. Dit is een bekende vorm van oplichting genaamd "bankhelpdeskfraude". Hang op en bel de politie via 0900-8844.',
      },
      {
        question: 'Welke informatie is het gevaarlijkst om telefonisch door te geven?',
        options: [
          'Uw postcode',
          'Uw geboortedatum',
          'Pincode, wachtwoord of inlogcodes',
          'Uw naam',
        ],
        correct: 2,
        explanation:
          'Pincodes, wachtwoorden en eenmalige codes geven directe toegang tot uw rekeningen. Geen enkele legitieme organisatie vraagt hier telefonisch om. Uw naam of postcode is minder gevaarlijk.',
      },
    ],
  },
]
