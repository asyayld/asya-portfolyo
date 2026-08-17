import { Home, User, Mail } from 'lucide-react'
import { IconGithub, IconLinkedin, IconInstagram } from './Icons'

const navItems = [
  { id: 'home', icon: Home, label: 'Ana Sayfa' },
  { id: 'about', icon: User, label: 'Hakkında' },
  { id: 'contact', icon: Mail, label: 'İletişim' },
]

const socialItems = [
  { key: 'github', icon: IconGithub, label: 'GitHub' },
  { key: 'linkedin', icon: IconLinkedin, label: 'LinkedIn' },
  { key: 'instagram', icon: IconInstagram, label: 'Instagram' },
]

const navButtonClass = (isActive) =>
  `group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${
    isActive
      ? 'bg-lime-400 text-zinc-900 shadow-lg shadow-lime-400/20'
      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
  }`

export default function Sidebar({ activeSection, onNavigate, contact }) {
  return (
    <aside className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-center border-t border-zinc-800 bg-zinc-900/95 px-4 backdrop-blur-sm safe-area-bottom lg:bottom-auto lg:right-0 lg:top-0 lg:h-screen lg:w-16 lg:flex-col lg:justify-start lg:border-t-0 lg:border-l lg:px-0 lg:py-6">
      {/* Mobil: yatay navigasyon */}
      <nav
        className="flex w-full max-w-sm items-center justify-around gap-1 lg:hidden"
        aria-label="Ana navigasyon"
      >
        {navItems.map(({ id, icon: Icon, label }) => {
          const isActive = activeSection === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              title={label}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className={navButtonClass(isActive)}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && id === 'home' && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-lime-400">
                  1
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Masaüstü: dikey navigasyon */}
      <nav
        className="hidden flex-1 flex-col items-center gap-2 lg:flex"
        aria-label="Ana navigasyon"
      >
        {navItems.map(({ id, icon: Icon, label }) => {
          const isActive = activeSection === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              title={label}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className={navButtonClass(isActive)}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && id === 'home' && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-lime-400">
                  1
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Sosyal ikonlar — sadece masaüstü */}
      <div className="hidden flex-col items-center gap-2 border-t border-zinc-800 pt-4 lg:flex">
        {socialItems.map(({ key, icon: Icon, label }) => (
          <a
            key={key}
            href={contact[key]}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-lime-400"
          >
            <Icon size={18} className="shrink-0" />
          </a>
        ))}
        <a
          href={`mailto:${contact.email}`}
          title="E-posta"
          aria-label="E-posta"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-lime-400"
        >
          <Mail size={18} />
        </a>
      </div>
    </aside>
  )
}
