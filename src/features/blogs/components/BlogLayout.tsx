import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { Card } from '../../../components/ui/card'
import { Profile } from '../../../components/Profile'
import { BlogList } from './BlogList'

export function BlogLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const isCreating = location.pathname === '/new'

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-purple-600 text-sm font-bold text-white shadow-md transition-transform hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l9-5-9-5-9 5 9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14v7m0-7l-9-5m9 5l9-5m-9 5v7m0-7l-9 5m9 5l9-5"
                />
              </svg>
            </div>
            <div className="flex flex-col pl-2">
              <span className="text-base font-bold tracking-tight text-slate-900 animate-in fade-in slide-in-from-left-2 duration-500">
                CA Monk Blog
              </span>
              <span className="text-xs text-slate-500">
                Stay updated with finance, accounting, and career growth.
              </span>
            </div>
          </div>
          <Profile />
        </div>
      </header>

      <main className="container py-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
          <section className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold tracking-tight text-slate-900">
                Latest Articles
              </h2>
              <Button
                size="sm"
                onClick={() => navigate(isCreating ? '/' : '/new')}
                className="transition-all hover:scale-105 hover:shadow-md"
              >
                {isCreating ? 'Back to articles' : 'New Article'}
              </Button>
            </div>
            <Card className="border-none bg-slate-50/60 shadow-sm transition-shadow hover:shadow-md">
              <div className="max-h-[600px] space-y-3 overflow-y-auto p-4">
                <BlogList />
              </div>
            </Card>
          </section>

          <section className="animate-in fade-in slide-in-from-right-4 duration-700">
            <Outlet />
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
        <div className="container py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-white">
                  CA
                </div>
                <span className="text-base font-bold text-white">CA MONK</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400">
                Empowering the next generation of financial leaders with tools,
                community, and knowledge.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Resources
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Webinars
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Case Studies
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Platform
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Job Board
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Practice Tests
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Mentorship
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                Connect
              </h3>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-slate-800 pt-6">
            <div className="flex flex-col gap-4 text-xs sm:flex-row sm:items-center sm:justify-between">
              <p className="text-slate-400">
                © 2024 CA Monk. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

