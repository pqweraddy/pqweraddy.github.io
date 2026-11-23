import Link from "next/link";
import { site } from "@/site.config";
import { SocialLinks } from "@/lib/social";

export default function Home() {
  return (
    <main className="hero-glow relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden px-4">
      <SocialLinks className="rise absolute right-6 top-6 sm:right-10 sm:top-8" size={22} />
      <h1 className="hero-name rise">{site.name}</h1>
      <p
        className="rise mt-6 text-center text-[clamp(1rem,1.8vw,1.75rem)] hero-tagline font-light tracking-wide"
        style={{ animationDelay: "250ms" }}
      >
        {site.tagline}
      </p>

      <nav
        className="rise absolute bottom-10 flex gap-8 text-sm uppercase tracking-[0.25em] text-muted"
        style={{ animationDelay: "500ms" }}
      >
        {site.nav.map((item) => (
          <Link key={item.href} href={item.href} className="transition-colors hover:text-accent">
            {item.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
