import Link from 'next/link'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function NotFoundPage() {
  return (
    <>
      <Head><title>404 | Mori Wu</title></Head>
    <div className="flex min-h-0 flex-1 items-center justify-center px-8 py-16">
      <div className="flex w-full max-w-4xl flex-col items-center gap-10 md:flex-row md:items-center md:gap-16">

        {/* Left: 404 Visual */}
        <div className="flex shrink-0 items-center justify-center mr-8">
          <span
            className="select-none font-mono font-bold leading-none text-[#314158]"
            style={{ fontSize: 'clamp(96px, 18vw, 180px)', letterSpacing: '-0.05em' }}
          >
            404
          </span>
        </div>

        {/* Right: Code Panel */}
        <div className="w-full min-w-0 font-mono text-sm leading-relaxed">
          {/* Code body */}
          <div>
            <div className="flex gap-6">
              {/* Line numbers */}
              <div className="select-none text-right text-slate-600" aria-hidden>
                {Array.from({ length: 13 }, (_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Code content */}
              <div className="min-w-0 overflow-x-auto">
                <div>
                  <span className="text-sky-400">const </span>
                  <span className="text-slate-200">page </span>
                  <span className="text-slate-400">= </span>
                  <span className="text-teal-400">findPage</span>
                  <span className="text-slate-400">(</span>
                  <span className="text-amber-300">&apos;you-were-looking-for&apos;</span>
                  <span className="text-slate-400">);</span>
                </div>
                <div>&nbsp;</div>
                <div>
                  <span className="text-purple-400">if </span>
                  <span className="text-slate-400">(!</span>
                  <span className="text-slate-200">page</span>
                  <span className="text-slate-400">) {'{'}</span>
                </div>
                <div>
                  <span className="pl-4 text-teal-400">console</span>
                  <span className="text-slate-400">.</span>
                  <span className="text-sky-400">log</span>
                  <span className="text-slate-400">(</span>
                  <span className="text-amber-300">&quot;Oops! Looks like you took a wrong turn.&quot;</span>
                  <span className="text-slate-400">);</span>
                </div>
                <div>
                  <span className="pl-4 text-purple-400">throw </span>
                  <span className="text-sky-400">new </span>
                  <span className="text-teal-400">Error</span>
                  <span className="text-slate-400">(</span>
                  <span className="text-amber-300">&quot;404: PageNotFoundError &#128533;&quot;</span>
                  <span className="text-slate-400">);</span>
                </div>
                <div>
                  <span className="text-slate-400">{'}'}</span>
                </div>
                <div>&nbsp;</div>
                <div>
                  <span className="text-slate-500">{'/* Suggestions:'}</span>
                </div>
                <div>
                  <span className="text-slate-500">&nbsp;* - Check the URL for typos</span>
                </div>
                <div>
                  <span className="text-slate-500">&nbsp;* - Use the site navigation</span>
                </div>
                <div>
                  <span className="text-slate-500">&nbsp;* - Or going back to _hello &#128522;</span>
                </div>
                <div>
                  <span className="text-slate-500">&nbsp;*/</span>
                </div>
                <div>&nbsp;</div>
                <div className="flex items-center gap-3">
                  <Link
                    href="/"
                    className="rounded border border-teal-500/50 bg-teal-500/[0.08] px-4 py-1.5 text-teal-400 transition-all duration-300 hover:border-teal-400/70 hover:bg-teal-500/[0.14] hover:shadow-[0_0_16px_rgba(64,224,208,0.20)]"
                  >
                    <span className="text-teal-400">redirect</span>
                    <span className="text-slate-400">(</span>
                    <span className="text-amber-300">&apos;home&apos;</span>
                    <span className="text-slate-400">);</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})
