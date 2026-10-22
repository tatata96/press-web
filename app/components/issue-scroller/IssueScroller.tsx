"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIssueLayout } from "./IssueLayoutProvider";
import type { Spread } from "./spreads";
import styles from "./issue-scroller.module.scss";

type IssueScrollerProps = {
  label: string;
  spreads: readonly (Spread & { alt: string })[];
};

gsap.registerPlugin(ScrollTrigger);

// Text comes in as props: resolving translations inside this component makes
// Next.js flag the route as reading runtime data outside <Suspense>.
export default function IssueScroller({ label, spreads }: IssueScrollerProps) {
  const { layout } = useIssueLayout();
  const scrollerRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  // In horizontal layout, vertical page scroll drives the strip sideways: the
  // section is pinned and the list is translated until the last spread is
  // reached. Without JS, or with reduced motion, the strip stays natively
  // scrollable. The vertical layout is a plain stack and needs no animation.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const list = listRef.current;
    if (!scroller || !list || layout === "vertical") return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Page scroll replaces the arrow-key scrolling of the native strip.
      scroller.classList.add(styles.pinned);
      scroller.removeAttribute("tabindex");

      // The header height depends on the loaded fonts and the viewport, so
      // re-pin whenever it changes or the start offset goes stale and the strip
      // slides under the header.
      const header = document.querySelector("header");
      const syncHeaderHeight = () => {
        const height = header?.getBoundingClientRect().height ?? 0;
        scroller.style.setProperty("--header-height", `${height}px`);
        ScrollTrigger.refresh();
      };
      const headerObserver = new ResizeObserver(syncHeaderHeight);
      if (header) headerObserver.observe(header);
      // Measured on the list, not the section: the section's scrollWidth leaves
      // out its trailing inline padding, so the last spread would stop flush
      // against the viewport edge instead of centred like the first.
      const getDistance = () => list.scrollWidth - list.clientWidth;
      gsap.to(list, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: scroller,
          // Pin below the sticky header instead of underneath it.
          start: () => `top ${header?.getBoundingClientRect().height ?? 0}px`,
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        headerObserver.disconnect();
        scroller.style.removeProperty("--header-height");
        scroller.classList.remove(styles.pinned);
        // React owns tabindex once the layout has switched away.
        if (!scroller.classList.contains(styles.vertical)) {
          scroller.setAttribute("tabindex", "0");
        }
      };
    });

    return () => mm.revert();
  }, [layout]);

  const isHorizontal = layout === "horizontal";

  return (
    <>
      {/* The horizontal strip is focusable so keyboard users can scroll it with
          the arrow keys. */}
      <section
        ref={scrollerRef}
        className={`${styles.scroller} ${isHorizontal ? "" : styles.vertical}`}
        aria-label={label}
        tabIndex={isHorizontal ? 0 : undefined}
        style={
          {
            "--spread-ratio":
              spreads[0] && spreads[0].width / spreads[0].height,
          } as CSSProperties
        }
      >
        <ol ref={listRef} className={styles.list}>
          {spreads.map(({ src, width, height, alt }, index) => (
            <li key={src} className={styles.spread}>
              <Image
                src={src}
                width={width}
                height={height}
                alt={alt}
                sizes="100vw"
                loading={index === 0 ? "eager" : "lazy"}
                className={styles.image}
              />
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
