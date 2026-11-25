"use client";

import { useEffect } from "react";

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Scroll-linked morph on the home page: the big hero name (#hero-name) shrinks
// and travels into the header logo slot (.site-logo inside #home-header) while
// #hero scrolls away. Progress p (0 → 1) is also exposed to CSS as --p on the
// header and hero (header background, tagline/cue fade).
export function HeroMorph() {
  useEffect(() => {
    const hero = document.getElementById("hero");
    const name = document.getElementById("hero-name");
    const header = document.getElementById("home-header");
    const logo = header?.querySelector<HTMLElement>(".site-logo");
    if (!hero || !name || !header || !logo) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Layout boxes ignore transforms, so these stay valid while morphing.
    let m = { x: 0, cy: 0, w: 1, h: 1, logoX: 0, logoCY: 0, logoW: 1, end: 1 };

    const measure = () => {
      const l = logo.getBoundingClientRect(); // header is fixed: viewport coords
      m = {
        x: name.offsetLeft,
        cy: hero.offsetTop + name.offsetTop + name.offsetHeight / 2, // document coords
        w: name.offsetWidth,
        h: name.offsetHeight,
        logoX: l.left,
        logoCY: l.top + l.height / 2,
        logoW: l.width,
        end: Math.max(1, hero.offsetHeight - header.offsetHeight),
      };
    };

    const update = () => {
      const y = window.scrollY;
      const p = clamp(y / m.end);
      header.style.setProperty("--p", String(p));
      hero.style.setProperty("--p", String(p));

      if (reduced.matches) {
        name.style.transform = "";
        name.style.visibility = "";
        logo.style.opacity = "1";
        return;
      }
      const k = lerp(1, m.logoW / m.w, p);
      const left = lerp(m.x, m.logoX, p);
      const cy = lerp(m.cy, m.logoCY, p); // vertical centre, viewport coords
      const naturalTop = m.cy - m.h / 2 - y; // where the name sits without transform
      const tx = left - m.x;
      const ty = cy - (k * m.h) / 2 - naturalTop;
      name.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${k})`;
      // Hand off to the real (clickable) logo once the name has landed.
      const landed = p >= 1;
      name.style.visibility = landed ? "hidden" : "";
      logo.style.opacity = landed ? "1" : "0";
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };

    onResize();
    // Fonts can change the name's width after first paint.
    document.fonts?.ready.then(onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    reduced.addEventListener("change", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      reduced.removeEventListener("change", onResize);
    };
  }, []);

  return null;
}
