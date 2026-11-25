import Link from "next/link";
import { site } from "@/site.config";
import { getEntries } from "@/lib/content";
import { EntryList } from "@/lib/components";
import { SiteFooter, SiteHeader } from "@/lib/chrome";
import { HeroMorph } from "@/lib/hero-morph";

const RECENT_POSTS = 5;

export default async function Home() {
  const posts = (await getEntries("blog")).slice(0, RECENT_POSTS);

  return (
    <>
      {/* Transparent over the hero; lib/hero-morph.tsx fades its background in
          and flies the hero name into its logo slot as you scroll. */}
      <SiteHeader id="home-header" className="home-header fixed inset-x-0 top-0" logoClassName="opacity-0" />
      <HeroMorph />

      <section id="hero" className="relative flex h-dvh w-full shrink-0 flex-col items-center justify-center px-4">
        {/* Glow lives in its own clipped layer so the name can leave the hero box. */}
        <div className="hero-glow absolute inset-0 -z-10 overflow-hidden" aria-hidden />

        {/* Outer h1 is transformed by HeroMorph; inner span keeps the entrance animation. */}
        <h1 id="hero-name" className="hero-name pointer-events-none relative z-30 origin-top-left will-change-transform">
          <span className="rise inline-block">{site.name}</span>
        </h1>
        <div className="hero-fade">
          <p
            className="rise mt-6 text-center text-[clamp(1rem,1.8vw,1.75rem)] hero-tagline font-light tracking-wide"
            style={{ animationDelay: "250ms" }}
          >
            {site.tagline}
          </p>
        </div>

        <a
          href="#about"
          aria-label="Scroll to content"
          className="hero-fade absolute bottom-8 text-xs uppercase tracking-[0.3em] text-muted transition-colors hover:text-accent"
        >
          <span className="rise flex flex-col items-center gap-2" style={{ animationDelay: "500ms" }}>
            Scroll
            <svg viewBox="0 0 24 24" width="22" height="22" className="scroll-cue" aria-hidden>
              <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </section>

      <main className="mx-auto w-full max-w-3xl flex-1 space-y-24 px-4 py-24">
        <Section id="about" title="About" more={{ href: "/about/", label: "More about me" }}>
          <p className="text-lg leading-relaxed">{site.intro}</p>
        </Section>

        {posts.length > 0 && (
          <Section id="posts" title="Posts" more={{ href: "/blog/", label: "More posts" }}>
            <EntryList kind="blog" entries={posts} />
          </Section>
        )}

        {site.education.length > 0 && (
          <Section id="education" title="Education">
            <ul className="space-y-4">
              {site.education.map((e) => {
                const body = (
                  <>
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                      <h3 className="text-lg font-semibold tracking-tight">{e.school}</h3>
                      <span className="font-mono text-xs text-muted">{e.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{e.degree}</p>
                  </>
                );
                const card = "block rounded-xl border border-line bg-background/60 p-5";
                return (
                  <li key={e.school + e.period}>
                    {e.href ? (
                      <a href={e.href} target="_blank" rel="noreferrer" className={`${card} transition-colors hover:border-accent`}>
                        {body}
                      </a>
                    ) : (
                      <div className={card}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Section>
        )}

        {site.skills.length > 0 && (
          <Section id="skills" title="Skills">
            <div className="space-y-6">
              {site.skills.map((group) => (
                <div key={group.label}>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted">{group.label}</h3>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="rounded-full border border-line px-3 py-1 font-mono text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}
      </main>

      <SiteFooter />
    </>
  );
}

function Section({
  id,
  title,
  more,
  children,
}: {
  id: string;
  title: string;
  more?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    // scroll-mt clears the fixed header when jumping here via #anchor.
    <section id={id} className="scroll-mt-24">
      <h2 className="mb-8 text-4xl font-bold tracking-tighter text-white">{title}</h2>
      {children}
      {more && (
        <Link href={more.href} className="mt-6 inline-block text-sm text-accent hover:underline">
          {more.label} →
        </Link>
      )}
    </section>
  );
}
