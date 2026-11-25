// Edit this file to personalize the site.

type Education = {
  school: string;
  degree: string; // e.g. "B.S. in Computer Science"
  period: string; // e.g. "Sep 2022 – Present"
  href?: string;
};

type SkillGroup = { label: string; items: string[] };

export const site = {
  name: "Paddy Lee",
  tagline: "Work hard, Play hard.",
  description: "Personal site of Paddy Lee — blog, projects, and more.",
  nav: [
    { href: "/blog/", label: "Blog" },
    { href: "/projects/", label: "Projects" },
    { href: "/about/", label: "About" },
  ],
  // Rendered as icons on every page. `icon` picks the SVG in lib/social.tsx.
  socials: [
    { icon: "github", label: "GitHub", href: "https://github.com/pqweraddy" },
    { icon: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/paddylee" },
    { icon: "email", label: "Email", href: "mailto:b12902072@csie.ntu.edu.tw" },
  ],

  // ---- Home page sections (below the hero) ----
  // Short intro for the "About" section; the full text lives in content/about.mdx.
  intro: "Hi there! I'm Paddy (Yu-Syuan) Lee and I'm a senior at National Taiwan University!",
  // Sections with no entries are hidden.
  // e.g. { school: "National Taiwan University", degree: "B.S. in CSIE", period: "Sep 2022 – Present" }
  education: [] as Education[],
  // e.g. { label: "Languages", items: ["C", "C++", "Python"] }
  skills: [] as SkillGroup[],
} as const;
