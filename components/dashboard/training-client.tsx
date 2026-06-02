'use client'

import { useState } from 'react'
import { modules } from '@/lib/training/modules'
import { moduleIcons, BadgeIcon, CheckIcon, ArrowRightIcon } from '@/components/shared/icons'

type ModuleState = 'intro' | 'lesson' | 'quiz' | 'done'

const difficultyLabel = {
  basis: { label: 'Basis', color: '#3AAC6E' },
  gemiddeld: { label: 'Gemiddeld', color: '#D97B2A' },
  gevorderd: { label: 'Gevorderd', color: '#E5532A' },
}

export function TrainingClient() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [state, setState] = useState<ModuleState>('intro')
  const [lessonIndex, setLessonIndex] = useState(0)
  const [quizIndex, setQuizIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showExp, setShowExp] = useState(false)
  const [completed, setCompleted] = useState<string[]>([])

  const mod = modules.find((m) => m.id === activeId)

  const start = (id: string) => {
    setActiveId(id)
    setState('intro')
    setLessonIndex(0)
    setQuizIndex(0)
    setSelected(null)
    setShowExp(false)
  }

  const nextLesson = () => {
    if (!mod) return
    if (lessonIndex < mod.lessons.length - 1) {
      setLessonIndex(lessonIndex + 1)
    } else {
      setState('quiz')
      setQuizIndex(0)
      setSelected(null)
      setShowExp(false)
    }
  }

  const submitAnswer = () => setShowExp(true)

  const nextQuestion = () => {
    if (!mod) return
    if (quizIndex < mod.quiz.length - 1) {
      setQuizIndex(quizIndex + 1)
      setSelected(null)
      setShowExp(false)
    } else {
      setCompleted((p) => (p.includes(mod.id) ? p : [...p, mod.id]))
      setState('done')
    }
  }

  const back = () => setActiveId(null)

  if (mod) {
    const ModIcon = moduleIcons[mod.icon]

    return (
      <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', margin: '0 auto', maxWidth: 1000 }}>
        <button
          onClick={back}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'rgba(244,236,219,.45)',
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
        {state === 'intro' && (
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 56,
                height: 56,
                borderRadius: 14,
                background: `${mod.color}22`,
                color: mod.color,
                marginBottom: '1.25rem',
              }}
            >
              <ModIcon size={28} strokeWidth={1.4} />
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: '1.9rem',
                color: '#F4ECDB',
                margin: '0 0 .5rem',
                letterSpacing: '-.02em',
              }}
            >
              {mod.title}
            </h1>
            <p
              style={{
                color: 'rgba(244,236,219,.6)',
                fontFamily: 'var(--font-sans)',
                margin: '0 0 1.75rem',
                lineHeight: 1.65,
                fontSize: '.97rem',
              }}
            >
              {mod.description}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                marginBottom: '1.75rem',
              }}
            >
              {[
                { label: 'Lessen', value: mod.lessons.length.toString() },
                { label: 'Quizvragen', value: mod.quiz.length.toString() },
                { label: 'Niveau', value: difficultyLabel[mod.difficulty].label },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    background: 'rgba(244,236,219,.05)',
                    border: '1px solid rgba(244,236,219,.1)',
                    borderRadius: 12,
                    padding: '1rem',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.5rem',
                      color: '#F4ECDB',
                      fontWeight: 400,
                    }}
                  >
                    {item.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.75rem',
                      color: 'rgba(244,236,219,.45)',
                      marginTop: 3,
                      textTransform: 'uppercase',
                      letterSpacing: '.06em',
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: '1.75rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '.85rem',
                color: 'rgba(244,236,219,.55)',
              }}
            >
              <BadgeIcon size={16} strokeWidth={1.5} />
              Na afronding verdient u het badge:{' '}
              <strong style={{ color: '#F4ECDB' }}>{mod.badge}</strong>
            </div>

            <ActionButton onClick={() => setState('lesson')} color={mod.color}>
              Start module
              <ArrowRightIcon size={16} strokeWidth={2.2} />
            </ActionButton>
          </div>
        )}

        {/* Lesson */}
        {state === 'lesson' && (
          <div>
            <ProgressHeader
              current={lessonIndex}
              total={mod.lessons.length}
              label="Les"
              color={mod.color}
            />
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: '1.45rem',
                color: '#F4ECDB',
                margin: '0 0 1.25rem',
                letterSpacing: '-.01em',
                lineHeight: 1.25,
              }}
            >
              {mod.lessons[lessonIndex].title}
            </h2>
            <div
              style={{
                background: 'rgba(244,236,219,.04)',
                border: '1px solid rgba(244,236,219,.1)',
                borderRadius: 14,
                padding: '1.5rem 1.75rem',
                marginBottom: '2rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1rem',
                  color: 'rgba(244,236,219,.85)',
                  lineHeight: 1.85,
                  margin: 0,
                  whiteSpace: 'pre-line',
                }}
              >
                {mod.lessons[lessonIndex].content}
              </p>
            </div>
            <ActionButton onClick={nextLesson} color={mod.color}>
              {lessonIndex < mod.lessons.length - 1 ? 'Volgende les' : 'Naar de quiz'}
              <ArrowRightIcon size={16} strokeWidth={2.2} />
            </ActionButton>
          </div>
        )}

        {/* Quiz */}
        {state === 'quiz' && (
          <div>
            <ProgressHeader
              current={quizIndex}
              total={mod.quiz.length}
              label="Vraag"
              color={mod.color}
            />
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: '1.25rem',
                color: '#F4ECDB',
                margin: '0 0 1.5rem',
                lineHeight: 1.45,
                letterSpacing: '-.01em',
              }}
            >
              {mod.quiz[quizIndex].question}
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.65rem',
                marginBottom: '1.5rem',
              }}
            >
              {mod.quiz[quizIndex].options.map((option, i) => {
                const isCorrect = i === mod.quiz[quizIndex].correct
                const isSelected = selected === i
                let bg = 'rgba(244,236,219,.05)'
                let border = 'rgba(244,236,219,.12)'
                let color = 'rgba(244,236,219,.82)'
                if (showExp) {
                  if (isCorrect) {
                    bg = 'rgba(58,172,110,.1)'
                    border = 'rgba(58,172,110,.3)'
                    color = '#3AAC6E'
                  } else if (isSelected) {
                    bg = 'rgba(229,83,42,.08)'
                    border = 'rgba(229,83,42,.25)'
                    color = 'rgba(244,236,219,.6)'
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => !showExp && setSelected(i)}
                    style={{
                      textAlign: 'left',
                      padding: '1rem 1.25rem',
                      background: !showExp && isSelected ? 'rgba(244,236,219,.1)' : bg,
                      border: `1px solid ${!showExp && isSelected ? 'rgba(244,236,219,.3)' : border}`,
                      borderRadius: 12,
                      cursor: showExp ? 'default' : 'pointer',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.95rem',
                      color,
                      transition: 'all .15s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <span
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        flexShrink: 0,
                        border: `1.5px solid ${!showExp && isSelected ? '#F4ECDB' : 'rgba(244,236,219,.2)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '.72rem',
                        fontWeight: 700,
                        color: showExp && isCorrect ? '#3AAC6E' : 'rgba(244,236,219,.6)',
                        background: showExp && isCorrect ? 'rgba(58,172,110,.15)' : 'transparent',
                      }}
                    >
                      {showExp && isCorrect ? (
                        <CheckIcon size={12} strokeWidth={2.5} />
                      ) : (
                        String.fromCharCode(65 + i)
                      )}
                    </span>
                    {option}
                  </button>
                )
              })}
            </div>

            {showExp && (
              <div
                style={{
                  background: 'rgba(58,172,110,.07)',
                  border: '1px solid rgba(58,172,110,.18)',
                  borderRadius: 12,
                  padding: '1rem 1.25rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                }}
              >
                <span style={{ color: '#3AAC6E', flexShrink: 0, marginTop: 1, display: 'flex' }}>
                  <CheckIcon size={16} strokeWidth={2.2} />
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.92rem',
                    color: 'rgba(244,236,219,.8)',
                    margin: 0,
                    lineHeight: 1.65,
                  }}
                >
                  {mod.quiz[quizIndex].explanation}
                </p>
              </div>
            )}

            {!showExp ? (
              <ActionButton onClick={submitAnswer} color={mod.color} disabled={selected === null}>
                Controleer antwoord
              </ActionButton>
            ) : (
              <ActionButton onClick={nextQuestion} color={mod.color}>
                {quizIndex < mod.quiz.length - 1 ? 'Volgende vraag' : 'Afronden'}
                <ArrowRightIcon size={16} strokeWidth={2.2} />
              </ActionButton>
            )}
          </div>
        )}

        {/* Done */}
        {state === 'done' && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'rgba(58,172,110,.15)',
                border: '2px solid rgba(58,172,110,.3)',
                color: '#3AAC6E',
                marginBottom: '1.5rem',
              }}
            >
              <BadgeIcon size={36} strokeWidth={1.4} />
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: '1.8rem',
                color: '#F4ECDB',
                margin: '0 0 .5rem',
                letterSpacing: '-.02em',
              }}
            >
              Module voltooid!
            </h2>
            <p
              style={{
                color: 'rgba(244,236,219,.6)',
                fontFamily: 'var(--font-sans)',
                margin: '0 0 1.5rem',
              }}
            >
              U heeft het badge verdiend:
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(58,172,110,.1)',
                border: '1px solid rgba(58,172,110,.25)',
                borderRadius: 9999,
                padding: '.6rem 1.5rem',
                marginBottom: '2rem',
                fontFamily: 'var(--font-sans)',
                fontSize: '.95rem',
                color: '#3AAC6E',
                fontWeight: 600,
              }}
            >
              <BadgeIcon size={16} strokeWidth={1.5} />
              {mod.badge}
            </div>
            <br />
            <ActionButton onClick={back} color={mod.color}>
              Terug naar modules
            </ActionButton>
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', margin: '0 auto', maxWidth: 1100 }}>
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
          {completed.length} van {modules.length} modules voltooid · Leer fraude herkennen en
          verdien badges.
        </p>
      </div>

      {/* Behaalde badges */}
      {completed.length > 0 && (
        <div
          style={{
            background: 'rgba(58,172,110,.06)',
            border: '1px solid rgba(58,172,110,.18)',
            borderRadius: 14,
            padding: '1rem 1.5rem',
            marginBottom: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '.5rem .75rem',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '.72rem',
              fontWeight: 700,
              color: '#3AAC6E',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              marginRight: '.25rem',
            }}
          >
            Behaald
          </span>
          {completed.map((id) => {
            const m = modules.find((m) => m.id === id)
            return m ? (
              <span
                key={id}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.82rem',
                  color: 'rgba(244,236,219,.75)',
                  background: 'rgba(244,236,219,.06)',
                  border: '1px solid rgba(244,236,219,.12)',
                  borderRadius: 9999,
                  padding: '.25rem .75rem',
                }}
              >
                <BadgeIcon size={12} strokeWidth={1.5} />
                {m.badge}
              </span>
            ) : null
          })}
        </div>
      )}

      {/* Module grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: '1rem',
        }}
      >
        {modules.map((mod) => {
          const isDone = completed.includes(mod.id)
          const ModIcon = moduleIcons[mod.icon]
          const diff = difficultyLabel[mod.difficulty]
          return (
            <div
              key={mod.id}
              style={{
                background: 'rgba(244,236,219,.04)',
                border: `1px solid ${isDone ? 'rgba(58,172,110,.25)' : 'rgba(244,236,219,.1)'}`,
                borderRadius: 16,
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '.85rem',
                transition: 'border-color .2s',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: isDone ? 'rgba(58,172,110,.15)' : `${mod.color}18`,
                    color: isDone ? '#3AAC6E' : mod.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isDone ? (
                    <CheckIcon size={22} strokeWidth={2} />
                  ) : (
                    <ModIcon size={22} strokeWidth={1.4} />
                  )}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.7rem',
                    fontWeight: 700,
                    color: diff.color,
                    letterSpacing: '.06em',
                    textTransform: 'uppercase',
                    background: `${diff.color}18`,
                    padding: '.2rem .6rem',
                    borderRadius: 9999,
                  }}
                >
                  {diff.label}
                </span>
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 500,
                    fontSize: '1.15rem',
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
                    fontSize: '.85rem',
                    color: 'rgba(244,236,219,.5)',
                    margin: 0,
                    lineHeight: 1.6,
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
                  fontSize: '.75rem',
                  color: 'rgba(244,236,219,.35)',
                }}
              >
                <span>{mod.lessons.length} lessen</span>
                <span>{mod.quiz.length} vragen</span>
              </div>

              <button
                onClick={() => start(mod.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '.75rem 1rem',
                  borderRadius: 10,
                  border: 'none',
                  background: isDone ? 'rgba(58,172,110,.12)' : `${mod.color}20`,
                  color: isDone ? '#3AAC6E' : mod.color,
                  fontFamily: 'var(--font-sans)',
                  fontSize: '.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'opacity .15s',
                  marginTop: 'auto',
                }}
              >
                {isDone ? 'Opnieuw doen' : 'Start module'}
                <ArrowRightIcon size={14} strokeWidth={2.2} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ProgressHeader({
  current,
  total,
  label,
  color,
}: {
  current: number
  total: number
  label: string
  color: string
}) {
  return (
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
          fontSize: '.75rem',
          color: 'rgba(244,236,219,.4)',
          letterSpacing: '.08em',
          textTransform: 'uppercase',
        }}
      >
        {label} {current + 1} van {total}
      </span>
      <div style={{ display: 'flex', gap: 4 }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 28,
              height: 4,
              borderRadius: 2,
              background: i <= current ? color : 'rgba(244,236,219,.1)',
              transition: 'background .3s',
            }}
          />
        ))}
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
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '1rem 1.75rem',
        borderRadius: 12,
        border: 'none',
        background: disabled ? 'rgba(244,236,219,.07)' : color,
        color: disabled ? 'rgba(244,236,219,.3)' : '#07190F',
        fontFamily: 'var(--font-sans)',
        fontSize: '1rem',
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.7 : 1,
        transition: 'opacity .15s',
      }}
    >
      {children}
    </button>
  )
}
