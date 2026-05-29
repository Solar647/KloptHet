import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('hero')

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight">{t('heading')}</h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-600">{t('subheading')}</p>
    </main>
  )
}
