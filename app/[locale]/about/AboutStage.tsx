"use client";

import {useEffect, useRef, type ReactNode} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import styles from "./about-stage.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Scroll distance per section change, as a fraction of the viewport height.
const SCROLL_PER_SECTION = 0.9;
// How far the covered section drifts up, in % of its own height, so it moves
// slower than the page sliding over it.
const COVERED_DRIFT_PERCENT = 12;

// The hero carries the oversized wordmark, so the header logo is hidden while the
// hero is the visible section.
function setHeaderLogoHidden(hidden: boolean) {
  const header = document.querySelector("header");
  if (hidden) header?.setAttribute("data-hide-logo", "true");
  else header?.removeAttribute("data-hide-logo");
}

// On desktop the sections inside the stage are pinned: scrolling slides the next
// section up from the bottom to cover the previous one, like turning a page. The page
// only wraps the first two sections, so just the first change is animated. Below the
// desktop breakpoint, or with reduced motion, the sections stay a normal vertical stack.
export default function AboutStage({children}: {children: ReactNode}) {
  const stageRef = useRef<HTMLDivElement>(null);

  // The stage fills the space below the sticky header, whose height depends on
  // the loaded fonts and the viewport.
  useEffect(() => {
    const stage = stageRef.current;
    const header = document.querySelector("header");
    if (!stage || !header) return;

    const syncHeaderHeight = () => {
      stage.style.setProperty(
        "--header-height",
        `${header.getBoundingClientRect().height}px`,
      );
      ScrollTrigger.refresh();
    };
    const headerObserver = new ResizeObserver(syncHeaderHeight);
    headerObserver.observe(header);

    return () => {
      headerObserver.disconnect();
      stage.style.removeProperty("--header-height");
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const panels = Array.from(stage.children) as HTMLElement[];
    if (panels.length < 2) return;

    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
      () => {
        stage.classList.add(styles.pinned);
        const header = document.querySelector("header");
        const steps = panels.length - 1;

        // Later sections sit above earlier ones and wait below the stage.
        panels.forEach((panel, index) => {
          gsap.set(panel, {zIndex: index});
        });
        gsap.set(panels.slice(1), {yPercent: 100});

        // Each step is one timeline unit: the next section slides up over the
        // current one while that one drifts up more slowly.
        const timeline = gsap.timeline({
          defaults: {ease: "none"},
          scrollTrigger: {
            trigger: stage,
            // Pin below the sticky header instead of underneath it.
            start: () => `top ${header?.getBoundingClientRect().height ?? 0}px`,
            end: () => `+=${steps * window.innerHeight * SCROLL_PER_SECTION}`,
            pin: true,
            scrub: 0.6,
            snap: {
              snapTo: 1 / steps,
              duration: {min: 0.3, max: 0.8},
              ease: "power2.inOut",
            },
            invalidateOnRefresh: true,
            // The next section covers the hero's wordmark about halfway through.
            onUpdate: (self) => setHeaderLogoHidden(self.progress < 0.7),
          },
        });

        panels.slice(1).forEach((panel, index) => {
          timeline
            .to(panel, {yPercent: 0, duration: 1}, index)
            .to(
              panels[index],
              {yPercent: -COVERED_DRIFT_PERCENT, duration: 1},
              index,
            );
        });

        setHeaderLogoHidden(true);

        return () => {
          stage.classList.remove(styles.pinned);
          setHeaderLogoHidden(false);
        };
      },
    );

    // Without the pinned stage the hero scrolls away like any other section.
    mm.add("(max-width: 899px), (prefers-reduced-motion: reduce)", () => {
      const observer = new IntersectionObserver(
        ([entry]) => setHeaderLogoHidden(entry.isIntersecting),
        {rootMargin: "-80px 0px 0px 0px"},
      );
      observer.observe(panels[0]);

      return () => {
        observer.disconnect();
        setHeaderLogoHidden(false);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={stageRef} className={styles.stage}>
      {children}
    </div>
  );
}
