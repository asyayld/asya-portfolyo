import { useState } from 'react'
import { Mail, ExternalLink, Briefcase } from 'lucide-react'
import { IconGithub, IconLinkedin, IconInstagram } from './Icons'
import ProjectForm from './ProjectForm'

const normalizeUrl = (url) => {
  if (!url) return "#";

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `https://${url}`;
};

const getDisplayUrl = (url) => {
  if (!url) return "";

  return url.replace(/^https?:\/\/(www\.)?/, "");
};

const links = [
  {
    key: "github",
    label: "GitHub",
    icon: IconGithub,
    description: "Projelerim ve kodlarım",
    getHref: (c) => normalizeUrl(c.github),
    getDisplay: (c) => getDisplayUrl(c.github),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: IconLinkedin,
    description: "Profesyonel ağım",
    getHref: (c) => normalizeUrl(c.linkedin),
    getDisplay: (c) => getDisplayUrl(c.linkedin),
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: IconInstagram,
    description: "Sosyal medya",
    getHref: (c) => normalizeUrl(c.instagram),
    getDisplay: (c) => getDisplayUrl(c.instagram),
  },
  {
    key: "email",
    label: "E-posta",
    icon: Mail,
    description: "Doğrudan mesaj gönder",
    getHref: (c) => `mailto:${c.email}`,
    getDisplay: (c) => c.email,
  },
];

export default function Contact({ contact }) {
  const [tab, setTab] = useState('info')

  const openWorkTab = () => {
    setTab('work')
    setTimeout(() => {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <section
      id="contact"
      className="min-h-0 border-t border-zinc-800/60 px-4 py-16 sm:px-6 sm:py-24 lg:px-16"
    >
      <p className="font-mono text-sm text-zinc-500">&gt; iletişim</p>
      <h2 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
        İletişime <span className="text-lime-400">Geç</span>
      </h2>
      <p className="mt-4 max-w-lg text-zinc-400">
        Bir proje, iş birliği veya sadece merhaba demek için aşağıdaki
        kanallardan bana ulaşabilirsin.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {links.map(({ key, label, icon: Icon, description, getHref, getDisplay }) => (
          <a
            key={key}
            href={getHref(contact)}
            target={key === 'email' ? undefined : '_blank'}
            rel={key === 'email' ? undefined : 'noopener noreferrer'}
            className="group flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all hover:border-lime-400/40 hover:bg-zinc-900"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-lime-400/10 text-lime-400 transition-colors group-hover:bg-lime-400 group-hover:text-zinc-900">
              <Icon size={22} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="font-semibold text-white">{label}</span>
                <ExternalLink
                  size={14}
                  className="text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100"
                />
              </span>
              <span className="mt-0.5 block truncate text-sm text-zinc-500">
                {getDisplay(contact)}
              </span>
              <span className="mt-1 block text-xs text-zinc-600">{description}</span>
            </span>
          </a>
        ))}
      </div>

      <div className="mt-16 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/30 p-8">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
          İletişim Bilgileri
        </h3>
        <dl className="mt-4 space-y-3 text-sm">
          <div className="flex flex-wrap gap-x-2">
            <dt className="text-zinc-500">E-posta:</dt>
            <dd>
              <a href={`mailto:${contact.email}`} className="text-lime-400 hover:underline">
                {contact.email}
              </a>
            </dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt className="text-zinc-500">GitHub:</dt>
            <dd>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-400 hover:underline"
              >
                {contact.github}
              </a>
            </dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt className="text-zinc-500">LinkedIn:</dt>
            <dd>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-400 hover:underline"
              >
                {contact.linkedin}
              </a>
            </dd>
          </div>
          <div className="flex flex-wrap gap-x-2">
            <dt className="text-zinc-500">Instagram:</dt>
            <dd>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lime-400 hover:underline"
              >
                {contact.instagram}
              </a>
            </dd>
          </div>
        </dl>
      </div>

      {/* Sekmeler — iletişim bilgilerinden sonra */}
      <div className="mt-14 border-t border-zinc-800/80 pt-10">
        <div
          className="flex flex-wrap gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-1.5"
          role="tablist"
          aria-label="İletişim sekmeleri"
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'info'}
            onClick={() => setTab('info')}
            className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
              tab === 'info'
                ? 'bg-lime-400 text-zinc-900 shadow-md shadow-lime-400/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            İletişim
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'work'}
            onClick={openWorkTab}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all ${
              tab === 'work'
                ? 'bg-lime-400 text-zinc-900 shadow-md shadow-lime-400/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Briefcase size={16} />
            İş Ver
          </button>
        </div>

        <div role="tabpanel" className="mt-8">
          {tab === 'info' ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-8 text-center sm:p-12">
              <Briefcase className="mx-auto text-lime-400" size={40} strokeWidth={1.5} />
              <p className="mt-4 text-lg font-medium text-white">Bana iş vermek ister misin?</p>
              <p className="mt-2 text-sm text-zinc-500">
                Web sitesi, uygulama veya yazılım projesi için formu doldur.
              </p>
              <button
                type="button"
                onClick={openWorkTab}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-lime-400 px-8 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-lime-300"
              >
                <Briefcase size={18} />
                İş Ver
              </button>
            </div>
          ) : (
            <ProjectForm />
          )}
        </div>
      </div>
    </section>
  )
}
