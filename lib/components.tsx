import Link from "next/link";
import { formatDate, type Entry, type Kind, type Meta } from "@/lib/content";

export function PageTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-12">
      <h1 className="text-6xl font-bold tracking-tighter text-white">{children}</h1>
      {sub && <p className="mt-3 text-muted">{sub}</p>}
    </div>
  );
}

export function EntryList({ kind, entries }: { kind: Kind; entries: Entry[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {entries.map(({ slug, meta }) => (
        <li key={slug}>
          <Link href={`/${kind}/${slug}/`} className="group flex flex-col gap-1 py-6 sm:flex-row sm:gap-8">
            <time className="w-28 shrink-0 pt-1 font-mono text-xs text-muted">{formatDate(meta.date)}</time>
            <div>
              <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">{meta.title}</h2>
              {meta.summary && <p className="mt-1 text-sm text-muted">{meta.summary}</p>}
              {meta.tags && <Tags tags={meta.tags} />}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {tags.map((t) => (
        <span key={t} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
          {t}
        </span>
      ))}
    </div>
  );
}

export function EntryHeader({ meta }: { meta: Meta }) {
  return (
    <header className="mb-10 border-b border-line pb-8">
      <time className="font-mono text-xs text-muted">{formatDate(meta.date)}</time>
      <h1 className="mt-2 text-5xl font-bold leading-tight tracking-tighter text-white">{meta.title}</h1>
      {meta.summary && <p className="mt-3 text-lg text-muted">{meta.summary}</p>}
      {meta.tags && <Tags tags={meta.tags} />}
      {meta.links && (
        <div className="mt-4 flex gap-4 text-sm">
          {meta.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-accent hover:underline">
              {l.label} ↗
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

export const proseClass = "prose prose-lg max-w-none";
