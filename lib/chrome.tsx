import Link from "next/link";
import { site } from "@/site.config";
import { SocialLinks } from "@/lib/social";

// Shared by the (site) layout and the home page so both stay identical.
// The home page passes `id`/`logoClassName` hooks used by lib/hero-morph.tsx.
export function SiteHeader({
  id,
  className = "",
  logoClassName = "",
}: {
  id?: string;
  className?: string;
  logoClassName?: string;
}) {
  return (
    <header id={id} className={`z-20 border-b border-line bg-background/80 backdrop-blur ${className}`}>
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link href="/" className={`site-logo text-lg ${logoClassName}`}>
          {site.name}
        </Link>
        <nav className="flex gap-6 text-sm text-muted">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-10 text-sm text-muted">
      <span>
        © {new Date().getFullYear()} {site.name}
      </span>
      <SocialLinks />
    </footer>
  );
}
