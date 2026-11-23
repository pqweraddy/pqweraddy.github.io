import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

export type Meta = {
  title: string;
  date: string; // YYYY-MM-DD
  summary?: string;
  tags?: string[];
  // Projects only
  links?: { href: string; label: string }[];
};

export type Entry = { slug: string; meta: Meta };
export type Kind = "blog" | "projects";

type MDXModule = { default: ComponentType; metadata: Meta };

const root = path.join(process.cwd(), "content");

export function getSlugs(kind: Kind): string[] {
  return fs
    .readdirSync(path.join(root, kind))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

// Separate static import prefixes so the bundler only includes each folder.
export async function load(kind: Kind, slug: string): Promise<MDXModule> {
  return kind === "blog"
    ? import(`@/content/blog/${slug}.mdx`)
    : import(`@/content/projects/${slug}.mdx`);
}

export async function getEntries(kind: Kind): Promise<Entry[]> {
  const entries = await Promise.all(
    getSlugs(kind).map(async (slug) => ({
      slug,
      meta: (await load(kind, slug)).metadata,
    })),
  );
  return entries.sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
