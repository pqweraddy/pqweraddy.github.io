import Link from "next/link";
import { site } from "@/site.config";
import { SocialLinks } from "@/lib/social";

// Everything except the home page lives in this route group, so the
// header appears here and stays hidden on "/".
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-bold tracking-tight hover:text-accent">
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
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-14">{children}</main>
      <footer className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-10 text-sm text-muted">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <SocialLinks />
      </footer>
    </>
  );
}
