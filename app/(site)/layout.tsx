import { SiteFooter, SiteHeader } from "@/lib/chrome";

// Everything except the home page lives in this route group. The home page
// renders the same header itself, revealed only after scrolling past the hero.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader className="sticky top-0" />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-14">{children}</main>
      <SiteFooter />
    </>
  );
}
