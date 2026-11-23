import type { Metadata } from "next";
import { getSlugs, load } from "@/lib/content";
import { EntryHeader, proseClass } from "@/lib/components";

export const dynamicParams = false;

export function generateStaticParams() {
  return getSlugs("projects").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { metadata } = await load("projects", (await params).slug);
  return { title: metadata.title, description: metadata.summary };
}

export default async function Project({ params }: PageProps<"/projects/[slug]">) {
  const { default: Content, metadata } = await load("projects", (await params).slug);
  return (
    <article>
      <EntryHeader meta={metadata} />
      <div className={proseClass}>
        <Content />
      </div>
    </article>
  );
}
