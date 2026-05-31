import { Nav } from '@/components/shared/nav'
import { Footer } from '@/components/shared/footer'
import Link from 'next/link'

export const metadata = {
  title: 'Blog — KloptHet',
  description:
    'Lees alles over WhatsApp-fraude, sms-oplichting en hoe u uzelf en uw familie kunt beschermen.',
}

const posts = [
  {
    slug: 'kleinkind-truc',
    category: 'WhatsApp-fraude',
    title: 'Wat is de kleinkind-truc en hoe herkent u hem?',
    excerpt:
      "Jaarlijks worden duizenden Nederlanders slachtoffer van de kleinkind-truc. Leer de signalen herkennen en weet wat u moet doen als u zo'n bericht ontvangt.",
    date: '28 mei 2026',
    readTime: '4 min',
    color: '#E5532A',
  },
  {
    slug: 'bezorg-fraude',
    category: 'Sms-fraude',
    title: 'Nep-PostNL en DHL berichten: zo herkent u ze',
    excerpt:
      'Bezorg-fraude is de meest voorkomende vorm van sms-oplichting in Nederland. Wij leggen uit hoe de berichten eruitzien en wat u nooit moet doen.',
    date: '22 mei 2026',
    readTime: '3 min',
    color: '#D97B2A',
  },
  {
    slug: 'bank-imitatie',
    category: 'Phishing',
    title: "ING, Rabobank of ABN AMRO stuurt nooit zo'n link",
    excerpt:
      'Bank-imitatie is gevaarlijk omdat de berichten zo echt lijken. Ontdek de gouden regel die alle banken hanteren en die oplichters nooit kunnen omzeilen.',
    date: '15 mei 2026',
    readTime: '5 min',
    color: '#5B8FE8',
  },
  {
    slug: 'romantiek-scam',
    category: 'Online oplichting',
    title: 'Romantiek-scams: wanneer liefde een valstrik is',
    excerpt:
      'Oplichters bouwen maandenlang een band op voordat ze om geld vragen. Hoe herkent u een romantiek-scam en wat kunt u doen als u slachtoffer bent geworden?',
    date: '8 mei 2026',
    readTime: '6 min',
    color: '#C94A7E',
  },
  {
    slug: 'telefonische-fraude',
    category: 'Telefonische fraude',
    title: 'Ze bellen namens uw bank — en het is nep',
    excerpt:
      'Babbeltrucjes via de telefoon worden steeds geraffineerder. Zelfs het echte nummer van uw bank kan op uw scherm verschijnen. Hoe beschermt u uzelf?',
    date: '1 mei 2026',
    readTime: '4 min',
    color: '#8B5CF6',
  },
  {
    slug: 'phishing-links',
    category: 'Phishing',
    title: 'Zo controleert u of een link veilig is',
    excerpt:
      'U hoeft geen technische kennis te hebben om een nep-link te herkennen. Wij leggen in gewone taal uit waar u op moet letten.',
    date: '24 april 2026',
    readTime: '3 min',
    color: '#3AAC6E',
  },
]

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  return (
    <>
      <Nav />
      <main id="main" style={{ flex: 1 }}>
        {/* Hero */}
        <section
          style={{
            padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 3vw, 3rem) clamp(3rem, 6vw, 5rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '60%',
              background:
                'radial-gradient(ellipse at center, rgba(58,172,110,.1) 0%, transparent 70%)',
              filter: 'blur(60px)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto' }}>
            <div
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '.72rem',
                fontWeight: 700,
                color: 'rgba(244,236,219,.5)',
                letterSpacing: '.22em',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}
            >
              Blog
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                lineHeight: 1.05,
                letterSpacing: '-.03em',
                color: '#F4ECDB',
                margin: '0 0 1.25rem',
              }}
            >
              Kennis is de beste bescherming.
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                color: 'rgba(244,236,219,.6)',
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              Lees alles over fraude-patronen, hoe u uzelf beschermt en wat u moet doen als het toch
              misgaat.
            </p>
          </div>
        </section>

        {/* Posts grid */}
        <section
          style={{
            padding: '0 clamp(1.5rem, 3vw, 3rem) clamp(4rem, 8vw, 6rem)',
            borderTop: '1px solid rgba(244,236,219,.08)',
          }}
        >
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* Uitgelicht artikel */}
            <div
              style={{
                background: 'rgba(244,236,219,.04)',
                border: '1px solid rgba(244,236,219,.1)',
                borderRadius: 20,
                padding: '2.5rem',
                marginBottom: '1.5rem',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '2rem',
                alignItems: 'start',
              }}
              className="grid-responsive-2"
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '.75rem',
                    marginBottom: '1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.68rem',
                      fontWeight: 700,
                      color: posts[0].color,
                      background: `${posts[0].color}18`,
                      border: `1px solid ${posts[0].color}30`,
                      padding: '.2rem .65rem',
                      borderRadius: 9999,
                      letterSpacing: '.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {posts[0].category}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '.75rem',
                      color: 'rgba(244,236,219,.35)',
                    }}
                  >
                    {posts[0].date} · {posts[0].readTime} lezen
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 700,
                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                    lineHeight: 1.15,
                    letterSpacing: '-.02em',
                    color: '#F4ECDB',
                    margin: '0 0 .85rem',
                  }}
                >
                  {posts[0].title}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '.95rem',
                    color: 'rgba(244,236,219,.6)',
                    lineHeight: 1.7,
                    margin: '0 0 1.5rem',
                  }}
                >
                  {posts[0].excerpt}
                </p>
                <Link
                  href={`/${locale}/blog/${posts[0].slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    fontSize: '.9rem',
                    color: '#3AAC6E',
                    textDecoration: 'none',
                  }}
                >
                  Lees verder →
                </Link>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: '5rem',
                  color: `${posts[0].color}20`,
                  lineHeight: 1,
                  flexShrink: 0,
                  userSelect: 'none',
                }}
              >
                01
              </div>
            </div>

            {/* Overige artikelen */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1rem',
              }}
            >
              {posts.slice(1).map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/${locale}/blog/${post.slug}`}
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div
                    className="card-hover"
                    style={{
                      background: 'rgba(244,236,219,.04)',
                      border: '1px solid rgba(244,236,219,.1)',
                      borderRadius: 16,
                      padding: '1.5rem',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '.75rem',
                      transition: 'all .25s',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '.65rem',
                          fontWeight: 700,
                          color: post.color,
                          background: `${post.color}18`,
                          border: `1px solid ${post.color}30`,
                          padding: '.2rem .6rem',
                          borderRadius: 9999,
                          letterSpacing: '.06em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {post.category}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '.68rem',
                          color: 'rgba(244,236,219,.3)',
                        }}
                      >
                        {post.readTime}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 600,
                        fontSize: '1.05rem',
                        lineHeight: 1.35,
                        letterSpacing: '-.01em',
                        color: '#F4ECDB',
                        margin: 0,
                        flex: 1,
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.82rem',
                        color: 'rgba(244,236,219,.55)',
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {post.excerpt.length > 100 ? post.excerpt.slice(0, 100) + '…' : post.excerpt}
                    </p>
                    <div
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '.75rem',
                        color: 'rgba(244,236,219,.3)',
                      }}
                    >
                      {post.date}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
