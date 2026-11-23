# pqweraddy.github.io

Personal site built with Next.js, statically exported to GitHub Pages.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static output in ./out
```

## Editing

- **Name, tagline, nav, links:** `site.config.ts`
- **Blog posts:** `content/blog/<slug>.mdx`
- **Projects:** `content/projects/<slug>.mdx`
- **About:** `content/about.mdx`

Each post/project starts with a metadata export:

```js
export const metadata = {
  title: "My Post",
  date: "2026-11-23",
  summary: "One-line description.",
  tags: ["math"],
  links: [{ href: "https://…", label: "Demo" }], // projects only, optional
};
```

Math: `$inline$` and `$$display$$` (KaTeX). Code: fenced blocks with a language,
optional `title="file.ts"` and line highlights like `{2,4-6}` (Shiki via rehype-pretty-code).

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`. One-time setup: in the GitHub repo,
**Settings → Pages → Source: GitHub Actions**.
