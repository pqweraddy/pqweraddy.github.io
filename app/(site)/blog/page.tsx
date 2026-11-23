import type { Metadata } from "next";
import { getEntries } from "@/lib/content";
import { EntryList, PageTitle } from "@/lib/components";

export const metadata: Metadata = { title: "Blog" };

export default async function BlogIndex() {
  return (
    <>
      <PageTitle sub="Writing on math, code, and whatever else.">Blog</PageTitle>
      <EntryList kind="blog" entries={await getEntries("blog")} />
    </>
  );
}
