// Edit this file to personalize the site.
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
} as const;
