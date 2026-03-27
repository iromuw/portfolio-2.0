import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#050816] text-slate-100">
      <div className="flex min-h-0 flex-1 flex-col px-4 py-6 md:px-6">
        <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-white/10 bg-[#0a1020]/40 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]">
          <Navbar />
          <main className="flex min-h-0 flex-1 flex-col">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
