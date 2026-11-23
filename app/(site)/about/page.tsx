import type { Metadata } from "next";
import About from "@/content/about.mdx";
import { PageTitle, proseClass } from "@/lib/components";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageTitle>About</PageTitle>
      <div className={proseClass}>
        <About />
      </div>
    </>
  );
}
