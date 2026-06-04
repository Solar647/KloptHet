import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/sidebar'
import { MobileBottomNav } from '@/components/dashboard/mobile-bottom-nav'
import { DashboardTour } from '@/components/dashboard/tour'

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect(`/${locale}/inloggen`)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'var(--font-sans)' }}>
      {/* Sidebar — verborgen op mobiel via CSS */}
      <div className="dashboard-sidebar" style={{ display: 'flex' }}>
        <Sidebar />
      </div>

      <main style={{ flex: 1, overflow: 'auto', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {children}
      </main>

      {/* Bottom nav — alleen zichtbaar op mobiel via CSS */}
      <div className="dashboard-bottom-nav" style={{ display: 'none' }}>
        <MobileBottomNav />
      </div>

      <DashboardTour userId={user.id} />
    </div>
  )
}
