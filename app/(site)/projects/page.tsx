import type { Metadata } from "next";
import { getEntries } from "@/lib/content";
import { EntryList, PageTitle } from "@/lib/components";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsIndex() {
  return (
    <>
      <PageTitle sub="Things I've built.">Projects</PageTitle>
      <EntryList kind="projects" entries={await getEntries("projects")} />
    </>
  );
}
