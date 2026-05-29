'use client'

import { useState } from 'react'

const modules = [
  {
    id: 'kleinkind',
    title: 'De kleinkind-truc',
    description: 'Hoe herken u berichten van mensen die zich voordoen als uw kind of kleinkind?',
    emoji: '👨‍👩‍👧',
    color: '#E5532A',
    lessons: [
      {
        title: 'Wat is de kleinkind-truc?',
        content: `Bij de kleinkind-truc stuurt een oplichter een bericht alsof hij uw kind of kleinkind is. Ze zeggen dat ze een nieuw nummer hebben en vragen daarna om geld.

Het bericht ziet er gewoon uit: "Hoi mama, dit is mijn nieuwe nummer. Sla het op!" Een paar uur later volgt: "Kun je me snel €450 overmaken? Het is dringend."

Echte familieleden doen dit bijna nooit. Ze bellen u op het bekende nummer of bezoeken u gewoon.`,
      },
      {
        title: 'Waarschuwingssignalen',
        content: `Let op deze signalen:

• Een nieuw/onbekend nummer dat zich voordoet als bekende
• Vraag om geld — vaak tussen €200 en €2.000
• Tijdsdruk: "dringend", "vandaag nog", "kan niet wachten"
• Reden waarom ze u niet kunnen bellen (telefoon stuk, in vergadering)
• Vraag om het nieuwe nummer op te slaan en het oude te vergeten

Hoe meer van deze signalen, hoe verdachter.`,
      },
      {
        title: 'Wat doet u?',
        content: `Als u zo'n bericht ontvangt:

1. Stuur GEEN geld, ook niet een klein bedrag "om te testen"
2. Bel uw kind of kleinkind op het OUDE, bekende nummer
3. Vertel het aan iemand die u vertrouwt
4. Heeft u al betaald? Bel direct uw bank en doe aangifte bij de politie

Het is niet erg om even te twijfelen — dat is slim. Oplichters rekenen erop dat u snel handelt zonder na te denken.`,
      },
    ],
    quiz: [
      {
        question:
          'U krijgt een WhatsApp van een onbekend nummer: "Hoi mama, ik heb een nieuw nummer. Kun je me €300 sturen?" Wat doet u?',
        options: [
          'U stuurt het geld — het is vast uw kind',
          'U belt uw kind op zijn/haar bekende nummer om te controleren',
          'U stuurt een klein bedrag om te testen of het klopt',
          'U antwoordt: "Wie ben jij?"',
        ],
        correct: 1,
        explanation:
          'Altijd het bekende nummer bellen om te controleren. Stuur nooit geld op basis van een berichtje alleen.',
      },
      {
        question: 'Welk signaal is het meest verdacht bij de kleinkind-truc?',
        options: [
          'Uw kind stuurt u een foto',
          'Een nieuw nummer vraagt om geld en zegt dat het dringend is',
          'Uw kind vraagt wanneer u tijd heeft',
          'U krijgt een berichtje in de avond',
        ],
        correct: 1,
        explanation:
          'Combinatie van nieuw nummer + geldverzoek + urgentie is het klassieke patroon van de kleinkind-truc.',
      },
    ],
    badge: '🛡 Kleinkind-detective',
  },
  {
    id: 'bezorg',
    title: 'Bezorg-fraude',
    description: 'Nep-berichten van PostNL, DHL en andere bezorgdiensten herkennen.',
    emoji: '📦',
    color: '#D97B2A',
    lessons: [
      {
        title: 'Hoe ziet bezorg-fraude eruit?',
        content: `U krijgt een sms of e-mail: "Uw pakket kan niet worden afgeleverd. Betaal €1,99 herbezorgkosten via deze link."

Of: "Uw pakket wacht op u in het depot. Klik hier om een bezorgtijd in te plannen."

De berichten zien er officieel uit — met logo's van PostNL, DHL, DPD of andere bekende diensten. Maar de link gaat naar een nep-website.`,
      },
      {
        title: 'Hoe onderscheidt u echt van nep?',
        content: `Controleer altijd de link:

• Echte PostNL-berichten gebruiken: postnl.nl
• Nep-websites gebruiken: post-nl-bezorging.com, postnl-betalen.nl, etc.

Andere signalen:
• U verwacht helemaal geen pakket
• Er wordt om betaling gevraagd (echte herbezorging is gratis in Nederland)
• De link bevat veel koppeltekens of rare woorden
• Het bericht bevat taalfouten`,
      },
      {
        title: 'Wat doet u?',
        content: `• Klik NIET op de link in het bericht
• Ga zelf naar de officiële website van de bezorgdienst
• Voer daar uw Track & Trace code in
• Heeft u al betaalgegevens ingevuld? Bel direct uw bank

Tip: bewaar de Track & Trace code van bestellingen. Dan kunt u altijd zelf controleren waar uw pakket is, zonder op links te klikken.`,
      },
    ],
    quiz: [
      {
        question:
          'U krijgt een sms: "Uw PostNL pakket kan niet worden bezorgd. Betaal €2,50 via: post-nl-bezorging.net". Wat doet u?',
        options: [
          'U klikt op de link en betaalt — het is maar €2,50',
          'U klikt NIET op de link en gaat naar postnl.nl om te controleren',
          'U belt PostNL via het nummer in het sms-bericht',
          'U wacht af of het pakket vanzelf komt',
        ],
        correct: 1,
        explanation:
          'Nooit op links in berichten klikken. Altijd zelf naar de officiële website gaan.',
      },
    ],
    badge: '📦 Pakket-waakhond',
  },
  {
    id: 'bank',
    title: 'Bank-imitatie',
    description: 'Berichten herkennen die van uw bank lijken te komen maar het niet zijn.',
    emoji: '🏦',
    color: '#3AAC6E',
    lessons: [
      {
        title: 'Hoe werkt bank-imitatie?',
        content: `Oplichters sturen berichten die precies op berichten van uw bank lijken. Ze gebruiken het logo, de kleuren en zelfs een officieel klinkend e-mailadres.

Veelgebruikte teksten:
• "Uw rekening wordt geblokkeerd — bevestig uw gegevens direct"
• "Verdachte activiteit op uw rekening — klik hier"
• "Uw bankpas verloopt — vraag een nieuwe aan via deze link"

Het doel: u op een nep-inlogpagina laten inloggen en zo uw gegevens stelen.`,
      },
      {
        title: 'Wat uw bank NOOIT doet',
        content: `Uw bank zal u nooit vragen om:
• Via een link in een sms of e-mail in te loggen
• Uw volledige wachtwoord of pincode te geven
• Uw bank-app te verwijderen en opnieuw te installeren via een link
• Een medewerker via uw computer mee te laten kijken
• Geld over te maken naar een "veilige rekening"

Als u dat gevraagd wordt — het is altijd oplichting, ook als het er officieel uitziet.`,
      },
      {
        title: 'Wat doet u?',
        content: `• Klik NIET op de link
• Log in via de officiële app of website van uw bank (typ het adres zelf in)
• Twijfelt u? Bel de officiële klantenservice van uw bank
• Het telefoonnummer van uw bank staat op de achterkant van uw bankpas

Heeft u al ingelogd op een nep-site?
1. Bel direct uw bank — zij kunnen uw rekening beveiligen
2. Verander uw wachtwoord via de officiële app
3. Doe aangifte bij de politie`,
      },
    ],
    quiz: [
      {
        question:
          'U krijgt een e-mail van "ING Bank": "Uw rekening wordt geblokkeerd. Klik hier om te bevestigen." Wat doet u?',
        options: [
          'U klikt op de link — het lijkt officieel',
          'U opent de ING-app of gaat naar ing.nl en logt daar in',
          'U belt het nummer dat in de e-mail staat',
          'U wacht of uw rekening echt geblokkeerd wordt',
        ],
        correct: 1,
        explanation:
          'Altijd zelf naar de officiële app of website gaan. Nooit via een link in een e-mail of sms.',
      },
      {
        question: 'Welke van deze dingen vraagt uw bank NOOIT?',
        options: [
          'Uw naam en adres',
          'Uw rekeningnummer',
          'Uw volledige pincode via de telefoon',
          'Uw geboortedatum',
        ],
        correct: 2,
        explanation:
          'Uw bank vraagt nooit uw pincode via telefoon, sms of e-mail. Dat is altijd oplichting.',
      },
    ],
    badge: '🏦 Bank-beschermer',
  },
]

type ModuleState = 'locked' | 'intro' | 'lesson' | 'quiz' | 'done'

export function TrainingClient() {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [moduleState, setModuleState] = useState<ModuleState>('intro')
  const [lessonIndex, setLessonIndex] = useState(0)
  const [quizIndex, setQuizIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [completedModules, setCompletedModules] = useState<string[]>([])

  const currentModule = modules.find((m) => m.id === activeModule)

  const startModule = (id: string) => {
    setActiveModule(id)
    setModuleState('intro')
    setLessonIndex(0)
    setQuizIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
  }

  const nextLesson = () => {
    if (!currentModule) return
    if (lessonIndex < currentModule.lessons.length - 1) {
      setLessonIndex(lessonIndex + 1)
    } else {
      setModuleState('quiz')
      setQuizIndex(0)
      setSelectedAnswer(null)
      setShowExplanation(false)
    }
  }

  const submitAnswer = () => {
    if (selectedAnswer === null || !currentModule) return
    setShowExplanation(true)
  }

  const nextQuestion = () => {
    if (!currentModule) return
    if (quizIndex < currentModule.quiz.length - 1) {
      setQuizIndex(quizIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setCompletedModules((prev) => [...prev, currentModule.id])
      setModuleState('done')
    }
  }

  const backToModules = () => {
    setActiveModule(null)
    setModuleState('intro')
  }

  if (activeModule && currentModule) {
    return (
      <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 720 }}>
        <button
          onClick={backToModules}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(244,236,219,.5)',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            fontSize: '.88rem',
            padding: '0 0 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          ← Terug naar modules
        </button>

        {/* Intro */}
        {moduleState === 'intro' && (
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{currentModule.emoji}</div>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: '2rem',
                color: '#F4ECDB',
                margin: '0 0 .5rem',
                letterSpacing: '-.02em',
              }}
            >
              {currentModule.title}
            </h1>
            <p
              style={{
                color: 'rgba(244,236,219,.65)',
                fontFamily: 'var(--font-sans)',
                margin: '0 0 2rem',
                lineHeight: 1.65,
              }}
            >
              {currentModule.description}
            </p>
            <div
              style={{
                background: 'rgba(244,236,219,.05)',
                border: '1px solid rgba(244,236,219,.12)',
                borderRadius: 14,
                padding: '1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.82rem',
                  color: 'rgba(244,236,219,.5)',
                  marginBottom: '.5rem',
                }}
              >
                In deze module
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.88rem',
                  color: 'rgba(244,236,219,.75)',
                }}
              >
                <span>📖 {currentModule.lessons.length} lessen</span>
                <span>❓ {currentModule.quiz.length} vragen</span>
                <span>🏆 {currentModule.badge}</span>
              </div>
            </div>
            <ActionButton onClick={() => setModuleState('lesson')} color={currentModule.color}>
              Start module →
            </ActionButton>
          </div>
        )}

        {/* Lesson */}
        {moduleState === 'lesson' && (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.78rem',
                  color: 'rgba(244,236,219,.4)',
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                }}
              >
                Les {lessonIndex + 1} van {currentModule.lessons.length}
              </span>
              <ProgressBar
                value={lessonIndex}
                max={currentModule.lessons.length}
                color={currentModule.color}
              />
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: '1.5rem',
                color: '#F4ECDB',
                margin: '0 0 1.25rem',
                letterSpacing: '-.02em',
              }}
            >
              {currentModule.lessons[lessonIndex].title}
            </h2>

            <div
              style={{
                background: 'rgba(244,236,219,.04)',
                border: '1px solid rgba(244,236,219,.1)',
                borderRadius: 14,
                padding: '1.5rem',
                marginBottom: '2rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: 'rgba(244,236,219,.85)',
                  lineHeight: 1.8,
                  margin: 0,
                  whiteSpace: 'pre-line',
                }}
              >
                {currentModule.lessons[lessonIndex].content}
              </p>
            </div>

            <ActionButton onClick={nextLesson} color={currentModule.color}>
              {lessonIndex < currentModule.lessons.length - 1 ? 'Volgende les →' : 'Naar de quiz →'}
            </ActionButton>
          </div>
        )}

        {/* Quiz */}
        {moduleState === 'quiz' && (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.78rem',
                  color: 'rgba(244,236,219,.4)',
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                }}
              >
                Vraag {quizIndex + 1} van {currentModule.quiz.length}
              </span>
              <ProgressBar
                value={quizIndex}
                max={currentModule.quiz.length}
                color={currentModule.color}
              />
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: '1.3rem',
                color: '#F4ECDB',
                margin: '0 0 1.5rem',
                lineHeight: 1.4,
                letterSpacing: '-.01em',
              }}
            >
              {currentModule.quiz[quizIndex].question}
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.65rem',
                marginBottom: '1.5rem',
              }}
            >
              {currentModule.quiz[quizIndex].options.map((option, i) => {
                const isCorrect = i === currentModule.quiz[quizIndex].correct
                const isSelected = selectedAnswer === i
                let bg = 'rgba(244,236,219,.05)'
                let border = 'rgba(244,236,219,.14)'
                let color = 'rgba(244,236,219,.82)'
                if (showExplanation) {
                  if (isCorrect) {
                    bg = 'rgba(58,172,110,.12)'
                    border = 'rgba(58,172,110,.35)'
                    color = '#3AAC6E'
                  } else if (isSelected) {
                    bg = 'rgba(229,83,42,.1)'
                    border = 'rgba(229,83,42,.3)'
                    color = '#E5532A'
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => !showExplanation && setSelectedAnswer(i)}
                    style={{
                      textAlign: 'left',
                      padding: '1rem 1.25rem',
                      background: isSelected && !showExplanation ? 'rgba(244,236,219,.1)' : bg,
                      border: `1px solid ${isSelected && !showExplanation ? 'rgba(244,236,219,.3)' : border}`,
                      borderRadius: 12,
                      cursor: showExplanation ? 'default' : 'pointer',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.95rem',
                      color,
                      transition: 'all .15s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        border: `2px solid ${isSelected && !showExplanation ? '#F4ECDB' : 'rgba(244,236,219,.25)'}`,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '.72rem',
                        fontWeight: 700,
                      }}
                    >
                      {showExplanation && isCorrect
                        ? '✓'
                        : showExplanation && isSelected
                          ? '✗'
                          : String.fromCharCode(65 + i)}
                    </span>
                    {option}
                  </button>
                )
              })}
            </div>

            {showExplanation && (
              <div
                style={{
                  background: 'rgba(58,172,110,.08)',
                  border: '1px solid rgba(58,172,110,.2)',
                  borderRadius: 12,
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.92rem',
                    color: 'rgba(244,236,219,.8)',
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  💡 {currentModule.quiz[quizIndex].explanation}
                </p>
              </div>
            )}

            {!showExplanation ? (
              <ActionButton
                onClick={submitAnswer}
                color={currentModule.color}
                disabled={selectedAnswer === null}
              >
                Controleer antwoord
              </ActionButton>
            ) : (
              <ActionButton onClick={nextQuestion} color={currentModule.color}>
                {quizIndex < currentModule.quiz.length - 1 ? 'Volgende vraag →' : 'Afronden →'}
              </ActionButton>
            )}
          </div>
        )}

        {/* Done */}
        {moduleState === 'done' && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: '2rem',
                color: '#F4ECDB',
                margin: '0 0 .5rem',
                letterSpacing: '-.02em',
              }}
            >
              Module voltooid!
            </h2>
            <p
              style={{
                color: 'rgba(244,236,219,.65)',
                fontFamily: 'var(--font-sans)',
                margin: '0 0 1.5rem',
              }}
            >
              U heeft de badge {currentModule.badge} verdiend.
            </p>
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(58,172,110,.1)',
                border: '1px solid rgba(58,172,110,.25)',
                borderRadius: 9999,
                padding: '.6rem 1.5rem',
                marginBottom: '2rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '1rem',
                color: '#3AAC6E',
                fontWeight: 600,
              }}
            >
              {currentModule.badge}
            </div>
            <br />
            <ActionButton onClick={backToModules} color={currentModule.color}>
              Terug naar modules
            </ActionButton>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', maxWidth: 900 }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 500,
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            color: '#F4ECDB',
            margin: '0 0 .35rem',
            letterSpacing: '-.02em',
          }}
        >
          Training
        </h1>
        <p style={{ color: 'rgba(244,236,219,.55)', fontFamily: 'var(--font-sans)', margin: 0 }}>
          Leer de meest voorkomende oplichtingstrucs herkennen. Per module: lessen + quiz + badge.
        </p>
      </div>

      {/* Badges behaald */}
      {completedModules.length > 0 && (
        <div
          style={{
            background: 'rgba(58,172,110,.08)',
            border: '1px solid rgba(58,172,110,.2)',
            borderRadius: 14,
            padding: '1rem 1.5rem',
            marginBottom: '1.5rem',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.78rem',
              fontWeight: 700,
              color: '#3AAC6E',
              letterSpacing: '.08em',
              textTransform: 'uppercase',
            }}
          >
            Behaalde badges
          </span>
          {completedModules.map((id) => {
            const m = modules.find((m) => m.id === id)
            return m ? (
              <span
                key={id}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.88rem',
                  color: 'rgba(244,236,219,.8)',
                }}
              >
                {m.badge}
              </span>
            ) : null
          })}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1rem',
        }}
      >
        {modules.map((mod) => {
          const isDone = completedModules.includes(mod.id)
          return (
            <div
              key={mod.id}
              style={{
                background: 'rgba(244,236,219,.05)',
                border: `1px solid ${isDone ? 'rgba(58,172,110,.3)' : 'rgba(244,236,219,.12)'}`,
                borderRadius: 16,
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '.75rem',
              }}
            >
              <div style={{ fontSize: '2.2rem' }}>{mod.emoji}</div>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 500,
                    fontSize: '1.2rem',
                    color: '#F4ECDB',
                    margin: '0 0 .35rem',
                    letterSpacing: '-.01em',
                  }}
                >
                  {mod.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.88rem',
                    color: 'rgba(244,236,219,.55)',
                    margin: 0,
                    lineHeight: 1.55,
                  }}
                >
                  {mod.description}
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.78rem',
                  color: 'rgba(244,236,219,.4)',
                }}
              >
                <span>{mod.lessons.length} lessen</span>
                <span>{mod.quiz.length} vragen</span>
              </div>
              <button
                onClick={() => startModule(mod.id)}
                style={{
                  padding: '.75rem 1rem',
                  borderRadius: 10,
                  border: 'none',
                  background: isDone ? 'rgba(58,172,110,.15)' : `${mod.color}22`,
                  color: isDone ? '#3AAC6E' : mod.color,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'opacity .15s',
                }}
              >
                {isDone ? `✓ Opnieuw doen` : 'Start module →'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ActionButton({
  onClick,
  color,
  disabled,
  children,
}: {
  onClick: () => void
  color: string
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '1rem 1.75rem',
        borderRadius: 12,
        border: 'none',
        background: disabled ? 'rgba(244,236,219,.08)' : color === '#3AAC6E' ? '#3AAC6E' : color,
        color: disabled ? 'rgba(244,236,219,.3)' : '#07190F',
        fontFamily: 'var(--font-sans)',
        fontSize: '1rem',
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'opacity .15s',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  )
}

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 24,
            height: 4,
            borderRadius: 2,
            background: i <= value ? color : 'rgba(244,236,219,.12)',
            transition: 'background .3s',
          }}
        />
      ))}
    </div>
  )
}
